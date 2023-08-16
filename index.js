env = process.env.NODE_ENV || 'DEV';//change as per environment, ref config.js
var config = require('./config')[env];
var mongoose = require("mongoose");
// const log = require('./logger/logger');

//creating Mongo DB connection
if (env === 'DEV') {
    mongoose.Promise = global.Promise;
    mongoose.connect(
        `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.dbname}?authSource=admin`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        ).then(() => console.log('mongoDB connected...'));

    //CUSTOMER mongo connection
    let Mongoose = mongoose.Mongoose;
    customerInstance = new Mongoose();
    customerInstance
        .connect(
            `mongodb://${config.customerDatabase.username}:${config.customerDatabase.password}@${config.customerDatabase.host}:${config.customerDatabase.port}/${config.customerDatabase.dbname}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true

            }
        )
        .then(() => console.log("CUSTOMER mongoDB connected..."));
} else if (env === 'UAT') {
    mongoose.Promise = global.Promise;
    mongoose.connect(
        `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port},${config.database.host1}:${config.database.port},${config.database.host2}:${config.database.port}/${config.database.dbname}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log('mongoDB connected...'));

    //CUSTOMER mongo connection
    let Mongoose = mongoose.Mongoose;
    customerInstance = new Mongoose();
    customerInstance
        .connect(
            `mongodb://${config.customerDatabase.username}:${config.customerDatabase.password}@${config.customerDatabase.host}:${config.customerDatabase.port}/${config.customerDatabase.dbname}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => console.log("CUSTOMER mongoDB connected..."));

}
else if (env === 'PROD') {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port},${config.database.host1}:${config.database.port},${config.database.host2}:${config.database.port}/${config.database.dbname}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log('mongoDB connected...'));
    //CUSTOMER mongo connection
    let Mongoose = mongoose.Mongoose;
    customerInstance = new Mongoose();
    customerInstance
        .connect(
            `mongodb://${config.customerDatabase.username}:${config.customerDatabase.password}@${config.customerDatabase.host}:${config.customerDatabase.port},${config.customerDatabase.host1}:${config.customerDatabase.port},${config.customerDatabase.host2}:${config.customerDatabase.port},${config.customerDatabase.host3}:${config.customerDatabase.port},${config.customerDatabase.host4}:${config.customerDatabase.port}/${config.customerDatabase.dbname}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => console.log("CUSTOMER mongoDB connected..."));
}

// ---KAFKA CONSUMER FUNCTION--- //
const consumerService = require('./kafka-consumer');
const consumerDynService = require('./kafka-consumer-dynamics');
const orderNotificationService = require('./kafka-order-notification');
// consumerService();
