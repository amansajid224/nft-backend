const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderEventsSchema = new Schema({
    payload: Object
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}, {
    strict: String
});

const OrderEvents = mongoose.model('OrderEvents', OrderEventsSchema, 'OrderEvents');

/**
 * Add event to mongodb collection
 * 
 * @param {*} data 
 * @returns 
 */
const addOrderEvents = async (data) =>
    new Promise((resolve, reject) => {
        let record = new OrderEvents(data);
        record.save()
            .then((client) => resolve(client))
            .catch((err) => reject(err));
    });

module.exports = {
    addOrderEvents
};