const mongoose = customerInstance;
const Schema = mongoose.Schema;

let CustomerEventsSchema = new Schema({
    payload: JSON
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}, {
    strict: String
});

const CustomerEvents = mongoose.model('CustomerEvents', CustomerEventsSchema, 'CustomerEvents');

const addCustomerEvents = async (data) =>
    new Promise((resolve, reject) => {
        let record = new CustomerEvents(data);
        record.save()
            .then((client) => resolve(client))
            .catch((err) => reject(err));
    });

module.exports = {
    addCustomerEvents
};