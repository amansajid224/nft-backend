env = process.env.NODE_ENV || "DEV"; //change as per environment, ref config.js
let config = require("./config")[env];
const { Kafka } = require("kafkajs");
let topic = config.ordersKafka.topicName;
const orderEvents = require("./middlewares/orderEvents");
const eventNotification = require("./middlewares/eventNotifications");
const axios = require("axios");
let orderEventsModel = require("./models/orderEvents.model");
let accessToken = config.accessToken;
let refreshToken = config.refreshToken;

const kafka = new Kafka({
  clientId: "cxp",
  brokers: config.ordersKafka.host,
});
const consumer = kafka.consumer({
  groupId: config.ordersKafka.groupId,
});

/**
 * Order consumer for disconnect events
 */
async function orderNotificationService() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let messageInfo = {};
        messageInfo["messageInfo"] = {
          topic: topic,
          partition: partition,
          offset: message.offset,
        };
        messageInfo["messageDetails"] = {
          key: message?.key.toString(),
          value: JSON.parse(message?.value?.toString()),
          headers: message?.headers,
        };

        let payload = message?.value?.toString();
        console.log("order notification message: " + payload);
        let parsedData;
        let deactivateResponse;
        try {
          parsedData = JSON.parse(payload);
          if (parsedData.orderStatus === "permanentDisconnect") {
            // Write to orderEvents collection
            orderEventsModel.addOrderEvents({ payload: messageInfo });
            let addressId = parsedData.addressId;
            // Get device info from serviceability
            let deviceGraphQuery = {
              query: `query {
                getActivationCPEDevicePhysicalLink(payload: {
                  address_id:"${addressId}",
                  depth:1
                }) {
                  address_id
                  physicalLinkDevices {
                      activation_device_id
                      device_type
                      make
                      model
                      serial_number
                      mac_id
                      uplink_device_id
                      uplink_port
                      port_id
                      location_id
                      address_id
                      depth    
                  }
                }
              }`,
            };
            console.log("deviceGraphQuery addressId parameter: " + addressId);
            let options = {
              method: "post",
              url: config.cxpBaseUrl + "/serviceability",
              headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: deviceGraphQuery,
              rejectUnauthorized: false,
            };
            let devicesResult = await fetchWithAuthentication(options);
            if (devicesResult?.data?.data) {
              console.log(
                devicesResult?.data?.data?.getActivationCPEDevicePhysicalLink
              );
              if (
                devicesResult?.data?.data?.getActivationCPEDevicePhysicalLink
                  ?.physicalLinkDevices !== null
              ) {
                // Call activation service to disconnect
                let devices =
                  devicesResult?.data?.data?.getActivationCPEDevicePhysicalLink
                    .physicalLinkDevices;
                for (let device of devices) {
                  deactivateResponse = await orderEvents.deactivateCustomer(
                    device.activation_device_id,
                    device.port_id
                  );
                }
                if (deactivateResponse?.status === 200) {
                  // Create notification(s)
                  let notifications = [];
                  // Phone/Email notification
                  let generalNotification = {
                    topic: config.ordersKafka.generalNotificationTopic,
                    messages: [
                      {
                        value: {
                          eventType: config.ordersKafka.eventType,
                          phone: parsedData.primaryContactNumber,
                          email: parsedData.email,
                          orderNumber: parsedData.orderNumber,
                          firstName: parsedData.firstName,
                          lastName: parsedData.lastName,
                          phoneType: parsedData.phoneType,
                          usi: parsedData.usi,
                          uuid: parsedData.uuid,
                        },
                      },
                    ],
                  };
                  notifications.push(generalNotification);
                  // Send notification for phone and email
                  await eventNotification.sendEventNotifications(notifications);
                } else {
                  console.log(
                    "Error occurred deactivating account: " +
                      deactivateResponse.statusText
                  );
                }
              }
            }
          }
        } catch (error) {
          return; //reject message if payload is not in json format
        }
      },
    });
  } catch (error) {
    console.log("orderNotificationService trycatch error:", error);
  }
}
/**
 * Make request with authentication
 *
 * @param {*} options
 * @returns
 */
const fetchWithAuthentication = async (options) => {
  let response;
  try {
    response = await axios({
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });
  } catch (e) {
    //ignore
  }

  // If the accessToken has expired
  if (
    response?.status === 401 ||
    response?.status === 403 ||
    response == undefined
  ) {
    // Use the refresh token to get a new access token
    const tokenResponse = await fetch(config.cxpBaseUrl + "/api/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    let tokenData = await tokenResponse.json();
    // If refreshToken has expired
    if (tokenData?.content?.response?.error) {
      const tokenResp = await fetch(config.cxpBaseUrl + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginID: config.loginId,
          password: config.loginPassword,
        }),
      });
      tokenData = await tokenResp.json();
      accessToken = tokenData.content.response.token;
      refreshToken = tokenData.content.response.refreshToken;
    } else {
      accessToken = tokenData.content.response.accessToken;
      refreshToken = tokenData.content.response.refreshToken;
    }

    // Retry the original request with new/refreshed access token
    return fetchWithAuthentication(options);
  }

  return response;
};

orderNotificationService();
module.exports = orderNotificationService();
