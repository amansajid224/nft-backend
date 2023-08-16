var config = {
    //for dev or local
    DEV: {
        //mongodb connection settings
        database: {
            host: 'cxpeladv16.nw1.nwestnetwork.com',
            port: '27017',
            dbname: 'NWFDB',
            username: "admin",
            password: "admin123"
        },
        customerDatabase: {
            host: 'cxpeladv16.nw1.nwestnetwork.com',
            port: '27017',
            dbname: 'CUSTOMER?authSource=admin',
            username: "admin",
            password: "admin123"
        },
        kafka: {
            host: ['zcneladv01.nw1.nwestnetwork.com:9092'],
            topicName: 'events.dynamics.accountidhierarchyupdated',
            groupId: 'events-dynamics-accountidhierarchyupdated',
            dynamics: {
                host: ['zcneladv02.nw1.nwestnetwork.com:9092', 'zcneladv03.nw1.nwestnetwork.com:9092', 'zcneladv04.nw1.nwestnetwork.com:9092'],
                topicName: 'dynamics.case.events',
                groupId: 'events-dynamics-case-events',
            }
        },
        mssql: {
            user: 's_dynamics',
            password: 'Dynamics7463%9746',
            server: '172.20.4.165',//mtaewdpv02
            //domain: 'nw1.nwestnetwork.com',
            database: 'DataStore_QA',
            dynamicsTable: 'Dynamics_Test',
            port: 1433,
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        },
        ordersKafka: {
            host: ['zcneladv01.nw1.nwestnetwork.com:9092'],
            topicName: 'disconnectOrders',
            groupId: 'cxp-order-notification',
            producerService: "/zcnbackend/api/kafka/producer-service",
            generalNotificationTopic: "customer.order.disconnect.notification",
            eventType: "customerOrderDisconnect"
        },
        activationProps: {
            iaUrl: "http://provapi1-evrtwaxa.dev.as20055.net/v1",
            service: "/service/activate",
        },
        cxpBaseUrl: 'https://cxpapi-dev.nwestnetwork.com',
        loginId: "s_cxpapi",
        loginPassword: "aHZXU0djbjElOEkw",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDM5OTk3MCwiZXhwIjoxNjkwNDg2MzcwfQ.oeUOGCyjaQB_8Kti3siwtrZ-7l9g0Wv9p539_ESPVMY",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDM5OTk3MCwiZXhwIjoxNjkxMDA0NzcwfQ._cIagemt-UrSAo2AY6PNwb9Z2yYjcMrm9rCpetxuAuk",
    },
    //for UAT
    UAT: {
        //mongodb connection settings
        database: {
            host: 'zipmgoelddv01',
            host1: 'zipmgoelddv02',
            host2: 'zipmgoelddv03',
            port: '27017',
            dbname: 'NWFDB?replicaSet=uat&readPreference=secondaryPreferred',
            username: "cxp123",
            password: "Ziplyis%231"
        },
        customerDatabase: {
            host: 'cxpelapv21.nw1.nwestnetwork.com',
            host1: 'cxpelapv22.nw1.nwestnetwork.com',
            host2: 'cxpelapv23.nw1.nwestnetwork.com',
            port: '27017',
            dbname: 'CUSTOMER?authSource=admin&replicaSet=rscxpstg&readPreference=nearest&localThresholdMS=50000',
            username: "cxpstguser",
            password: "%243cr3tP4ssw0rd"
        },
        kafka: {
            host: ['zcneladv02.nw1.nwestnetwork.com:9092', 'zcneladv03.nw1.nwestnetwork.com:9092', 'zcneladv04.nw1.nwestnetwork.com:9092'],
            topicName: 'events.dynamics.accountidhierarchyupdated',
            groupId: 'events-dynamics-accountidhierarchyupdated',
            dynamics: {
                host: ['zcneladv02.nw1.nwestnetwork.com:9092', 'zcneladv03.nw1.nwestnetwork.com:9092', 'zcneladv04.nw1.nwestnetwork.com:9092'],
                topicName: 'dynamics.case.events',
                groupId: 'events-dynamics-case-events',
            }
        },
        mssql: {
            user: 's_dynamics',
            password: 'Dynamics7463%9746',
            server: '172.20.4.165',//mtaewdpv02
            //domain: 'nw1.nwestnetwork.com',
            database: 'DataStore_QA',
            dynamicsTable: 'Dynamics_Test',
            port: 1433,
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        },
        ordersKafka: {
            host: ['zcneladv02.nw1.nwestnetwork.com:9092', 'zcneladv03.nw1.nwestnetwork.com:9092', 'zcneladv04.nw1.nwestnetwork.com:9092'],
            topicName: 'disconnectOrders',
            groupId: 'cxp-order-notification',
            producerService: "/zcnbackend/api/kafka/producer-service",
            generalNotificationTopic: "customer.order.disconnect.notification",
            eventType: "customerOrderDisconnect"
        },
        activationProps: {
            iaUrl: "https://provapi.staging.as20055.net/v1",
            service: "/service/activate",
        },
        cxpBaseUrl: 'https://cxpapi-stg.nwestnetwork.com',
        loginId: "s_cxpapi",
        loginPassword: "aHZXU0djbjElOEkw",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDQwMDAyNSwiZXhwIjoxNjkwNDg2NDI1fQ.Ce6SWv_Gawv7rrMeY-y1n2x9NCuJN-B2W7ALuv24p5Q",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDQwMDAyNSwiZXhwIjoxNjkxMDA0ODI1fQ.K-ihwEy60zReRY-NynxMb0_GSag1o440eXM6glOhhIo",
    },
    //for PROD
    PROD: {
        //mongodb connection settings
        database: {
            host: 'zipmgoeldpv01.nw1.nwestnetwork.com',
            host1: 'zipmgoeldpv02.nw1.nwestnetwork.com',
            host2: 'zipmgoeldpv03.nw1.nwestnetwork.com',
            port: '27017',
            dbname: 'NWFDB?authSource=admin&replicaSet=rsziplyprd&readPreference=nearest&localThresholdMS=50000',
            username: "ziplyprdusr",
            password: "SCnGtOqmbA"
        },
        customerDatabase: {
            host: 'cxpelapv16.nw1.nwestnetwork.com',
            host1: 'cxpelapv17.nw1.nwestnetwork.com',
            host2: 'cxpelapv18.nw1.nwestnetwork.com',
            host3: 'cxpelapv19.nw1.nwestnetwork.com',
            host4: 'cxpelapv58.nw1.nwestnetwork.com',
            port: '27017',
            dbname: 'CUSTOMER?authSource=admin&replicaSet=rscxpprd&readPreference=nearest&localThresholdMS=50000',
            username: "cxpprduser",
            password: "5xOJlp16z89Gkf"
        },
        kafka: {
            host: ['zcnelapv09.nw1.nwestnetwork.com:9092', 'zcnelapv10.nw1.nwestnetwork.com:9092', 'zcnelapv11.nw1.nwestnetwork.com:9092'],
            topicName: 'events.dynamics.accountidhierarchyupdated',
            groupId: 'events-dynamics-accountidhierarchyupdated',
            dynamics: {
                host: ['zcnelapv09.nw1.nwestnetwork.com:9092', 'zcnelapv10.nw1.nwestnetwork.com:9092', 'zcnelapv11.nw1.nwestnetwork.com:9092'],
                topicName: 'dynamics.case.events',
                groupId: 'events-dynamics-case-events',
            }
        },
        mssql: {
            user: 's_dynamics',
            password: 'Dynamics7463%9746',
            server: '172.20.4.165',//mtaewdpv02
            //domain: 'nw1.nwestnetwork.com',
            database: 'DataStore_QA',
            dynamicsTable: 'Dynamics',
            port: 1433,
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        },
        ordersKafka: {
            host: ['zcnelapv09.nw1.nwestnetwork.com:9092', 'zcnelapv10.nw1.nwestnetwork.com:9092', 'zcnelapv11.nw1.nwestnetwork.com:9092'],
            topicName: 'disconnectOrders',
            groupId: 'cxp-order-notification',
            producerService: "/zcnbackend/api/kafka/producer-service",
            generalNotificationTopic: "customer.order.disconnect.notification",
            eventType: "customerOrderDisconnect"
        },
        activationProps: {
            iaUrl: "https://provapi.prod.as20055.net/v1",
            service: "/service/activate",
        },
        cxpBaseUrl: 'https://cxpapi.nwestnetwork.com',
        loginId: "s_cxpapi",
        loginPassword: "aHZXU0djbjElOEkw",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDQwMDA4NywiZXhwIjoxNjkwNDg2NDg3fQ.qV3x9clQbZLhyzZ8jPzwkbz25TT-obOW_ORmmLBJJCw",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzX2N4cGFwaSIsImZpcnN0TmFtZSI6InNfY3hwYXBpIiwicm9sZXMiOltdLCJhZ2VudF9hY2Nlc3MiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImlhdCI6MTY5MDQwMDA4NywiZXhwIjoxNjkxMDA0ODg3fQ.om-aKhGL3SFz7ZLh7xZMaASvkMArdZdCg44ZE5RN9MI",
    }
};
module.exports = config;
