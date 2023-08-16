env = process.env.NODE_ENV || 'DEV';//change as per environment, ref config.js
var config = require('./config')[env];
const { Kafka } = require('kafkajs');
var topic = config.kafka.dynamics.topicName;
const dynamicsEvents = require('./middlewares/dynamicsEvents')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: config.kafka.dynamics.host,
});
const consumer = kafka.consumer({
    groupId: config.kafka.dynamics.groupId
});

async function consumerDynService() {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('consumerDynService partition and offset:', { topic: topic, partition: partition, offset: message.offset });
                let payload = message?.value?.toString();
                console.log("consumerDynService payload", payload);
                let parsedData;
                try {
                    parsedData = JSON.parse(payload);
                    dynamicsEvents.submitDynWFM(parsedData);
                } catch (error) {
                    return;//reject message if payload is not in json format
                }
                
            }
        });
       //consumer.seek({ topic: topic, partition: 0, offset: 22 });
    } catch (error) {
        console.log('consumerDynService try catch error: ', error);
    }
}
consumerDynService();
module.exports = consumerDynService();