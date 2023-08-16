("use strict");
const config = require("../config")[env];
const axios = require("axios");

/**
 * Sends SMS and email kafka notifications
 *
 * @param {*} notifications notifications[0] = SMS message, notifications[1] = Email message
 * @returns
 */
const sendEventNotifications = async (notifications) => {
  return new Promise(async (resolve, reject) => {
    for (let notification of notifications) {
      // Send notification
      const options = {
        method: "post",
        url: `${config.cxpBaseUrl}${config.ordersKafka.producerService}`,
        json: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(notification),
        rejectUnauthorized: false,
      };
      console.log("Request options for the SMS/Email notification: ", options);
      try {
        await axios(options)
          .then(function (response) {
            console.log("SMS/Email response: " + JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log("SMS/Email request: " + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
  });
};

module.exports = {
  sendEventNotifications,
};
