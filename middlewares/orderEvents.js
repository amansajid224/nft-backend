("use strict");
const config = require("../config")[env];
const axios = require("axios");

/**
 * Deactivates provided device
 * 
 * @param {*} activation_device_id 
 * @param {*} portId 
 * @returns 
 */
const deactivateCustomer = async (activation_device_id, portId) => {
  return new Promise(async (resolve, reject) => {
    let deviceDetails = {
      activation_device_id: activation_device_id,
      //activation_device_id: "AD59382790464461",
      port: portId,
      plan: "WG", // Disconnect
    };

    console.log("Invoke deactivateDevice for ", deviceDetails);

    const options = {
      method: "post",
      url: `${config.activationProps.iaUrl}/service/activate`,
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(deviceDetails),
      rejectUnauthorized: false,
    };
    console.log("Request options for deactivateDevice: ", options);
    try {
      await axios(options)
        .then(function (response) {
          console.log("Response: " +  JSON.stringify(response.data));
          resolve(response);
        })
        .catch(function (error) {
          console.log(error);
          resolve(error.response);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = {
  deactivateCustomer,
};
