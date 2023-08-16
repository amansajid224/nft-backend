const mongoose = customerInstance;
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    NDS: Boolean,
    SERVICEUSI: String,
    MEMBERUSI: String,
    SUBSCRIBERACTIONSTATUS: String,
    CONNECTDATE: String,
    DISCONNECTDATE: String,
    EXCHANGE: String,
    LINENUMBER: String,
    BTN: String,
    SAMCONTROLNUMBER: String,
    ENV: String,
    ADDRESSID: String,
    ADDRESSLINE: String,
    CITY: String,
    STATE: String,
    ZIP: String,
    TYPE: String,
    LASTNAME: String,
    FIRSTNAME: String,
    EMAIL: String,
    SEQUENCENUMBER: String,
    ACCOUNTNUMBER: String,
    UUID: String,
    LEGACYUUID: String,
    CBR: String,
    DATA_SERVICE: String,
    DATA_MEDIA: String,
    VIDEO_SERVICE: String,
    VIDEO_MEDIA: String,
    VOICE_SERVICE: String,
    VOICE_MEDIA: String,
    ORDERID: String,
    STATUS: String,
    GTVBILLINGACCOUNTNUMBER: String,
    CONTACTPROFILEID: String,
    CREATEDBY: [JSON],
    UPDATEDBY: [JSON]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}, {
    strict: String
});

CustomerSchema.index({
    SAMCONTROLNUMBER: 1,
    ENV: 1
});
CustomerSchema.index({
    UUID: 1,
    CBR: 1
});
CustomerSchema.index({
    FIRSTNAME: 1,
    LASTNAME: 1
});
CustomerSchema.index({
    BTN: 1
});
CustomerSchema.index({
    FIRSTNAME: 1
});
CustomerSchema.index({
    LASTNAME: 1
});
CustomerSchema.index({
    STATE: 1,
    CITY: 1,
    ZIP: 1,
});
CustomerSchema.index({
    ADDRESSLINE: 1
});

const Customer = mongoose.model('Customer', CustomerSchema, 'Customer');

/**
 *addCustomer method using data from kafka queue to add/update into Customer collection
 *
 * @param {*} data
 * @param {*} topic
 */
const addCustomer = async (data, topic) =>
    new Promise(async (resolve, reject) => {
        console.log(data);
        if (data) {
            let legacyuuid = "";
            if (data?.globalAccountNumber != "") {
                legacyuuid = data?.globalAccountNumber?.replaceAll("-", "");
            }
            // First, check the current status of the customer
            Customer.findOne({
                $and: [
                    { $or: [{ UUID: data?.billingGlobalId }, { UUID: legacyuuid }] },
                    { SERVICEUSI: data?.universalServiceId }
                ]
            }).then(existingCustomer => {
                const currentStatus = existingCustomer ? existingCustomer.STATUS.toUpperCase() : null;
                const requestedStatus = data?.status?.includes(".") ? data?.status?.split(".")?.[1]?.toUpperCase() : data?.status?.toUpperCase();

                if (requestedStatus === 'PROSPECT' && currentStatus === 'ACTIVE') {
                    // If the customer is transitioning from ACTIVE to PROSPECT, prevent the update
                    console.log('Cannot transition from ACTIVE to PROSPECT.');
                    resolve();
                    return;
                }
                // Perform the update operation
                Customer.updateOne({ $and: [{ $or: [{ UUID: data?.billingGlobalId }, { UUID: legacyuuid }] }, { SERVICEUSI: data?.universalServiceId }] },
                    {
                        $set: {
                            NDS: data?.environment == 'Dynamics' ? true : false,
                            UUID: data?.billingGlobalId,
                            LEGACYUUID: legacyuuid,
                            SERVICEUSI: data?.universalServiceId,
                            MEMBERUSI: data?.universalServiceId,
                            EXCHANGE: data?.exchange,
                            // LINENUMBER: data?.btn?.slice(-4),
                            BTN: data?.accountNumber?.slice(0, 10),
                            ACCOUNTNUMBER: data?.accountNumber,
                            ADDRESSID: data?.addressId,
                            // SAMCONTROLNUMBER: data?.SAMControlNo,
                            ENV: data?.environment?.toUpperCase(),
                            ADDRESSLINE: data?.addressLine?.toUpperCase()?.replace(/\s/g, ""),
                            CITY: data?.city?.toUpperCase(),
                            STATE: data?.state?.toUpperCase(),
                            ZIP: data?.zipCode,
                            TYPE: data?.customerTypeCode?.toUpperCase(),
                            LASTNAME: data?.lastName?.toUpperCase(),
                            FIRSTNAME: data?.firstName?.toUpperCase(),
                            CBR: data?.telephoneNumber,
                            SEQUENCENUMBER: "0",
                            // ORDERID: data?.CXPOrderId,
                            EMAIL: data?.primaryEmailId,
                            STATUS: data?.status?.includes(".") ? data?.status?.split(".")?.[1]?.toUpperCase() : data?.status?.toUpperCase(),
                            GTVBILLINGACCOUNTNUMBER: data?.GTVAccountId,
                            CONNECTDATE: data?.connectDate?.replaceAll("-", ""),
                            CONTACTPROFILEID: data?.primaryContactId
                        },
                        $push: {
                            UPDATEDBY: {
                                ACTION: data?.action?.toUpperCase(),
                                PROCESS: topic?.toUpperCase(),
                                TIMESTAMP: data?.sentTimestamp
                            }
                        }
                    }, { upsert: true }).then(client => {
                        console.log('addCustomer client :', client);
                        resolve(client);
                    }).catch(err => {
                        console.error('addCustomer ERROR : ', err);
                        reject(err);
                    });
            })

        }
    });

module.exports = {
    Customer,
    addCustomer
};