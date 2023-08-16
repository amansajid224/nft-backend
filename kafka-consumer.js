env = process.env.NODE_ENV || 'DEV';//change as per environment, ref config.js
var config = require('./config')[env];
const { Kafka } = require('kafkajs')
var topic = config.kafka.topicName;
var customer = require('./models/customer.model');
var customerEvents = require('./models/customerEvents.model');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: config.kafka.host,
});
const consumer = kafka.consumer({
    groupId: config.kafka.groupId
});

async function consumerService() {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('partition and offset:', { topic: topic, partition: partition, offset: message.offset });
                let payload = message?.value?.toString();
                let parsedData, payloadText;
                try {
                    parsedData = JSON.parse(payload);
                    payloadText = JSON.parse(parsedData.payloadText);
                } catch (error) {
                    return;//reject message if payload is not in json format
                }
                customerEvents.addCustomerEvents({ payload: payloadText }); //dump events into a CustomerEvents mongo collection
                let data = payloadText?.DynamicsAccountDetailsResponseElement?.DynamicsAccountidHierarchyUpdatedEvent?.body ?
                    payloadText.DynamicsAccountDetailsResponseElement.DynamicsAccountidHierarchyUpdatedEvent.body : payloadText;
                await customer.addCustomer(data, topic);
            }
        });
        // consumer.seek({ topic: topic, partition: 0, offset: 22 });
    } catch (error) {
        console.log('Consumer try catch error: ', error);
    }
}
consumerService();
module.exports = consumerService();