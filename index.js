/* eslint-disable */

const functions = require("firebase-functions");
const { DataSnapshot } = require("firebase-functions/v1/database");
const { snapshotConstructor } = require("firebase-functions/v1/firestore");
var admin = require("firebase-admin");
const { convertArrayToCSV } = require('convert-array-to-csv')
var nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');

$env: GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\Jay\Downloads\canteen-management-systems-firebase-adminsdk-6457x-d58bc242c2.json"

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://canteen-management-systems-20a8c.asia-southeast1.firebasedatabase.app/"
});

// const app1 = admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: "https://canteen-management-systems.firebaseio.com/"
//   }, "app1");

//   const een-managemcantent-systems-20a8c = admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: "https://canteen-management-systems-20a8c.asia-southeast1.firebasedatabase.app/"
//   }, "canteen-management-systems-20a8c");

const db = admin.database();



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.onNodeUpdated = functions.region("asia-southeast1").database.instance("canteen-management-systems-20a8c").ref("Status/{transactionId}").
    onUpdate((snapshot, context) => {
        console.log("Snapshot is" + snapshot.after.toJSON());
        var key1 = snapshot.before.key;
        const billRef = db.ref("Bill");
        var query = billRef.orderByKey().limitToLast(100);

        console.log("Value of Key 1 : " + key1);

        query.once("value")
            .then(function (snapshot1) {
                billData = snapshot1.toJSON();
                for (var key2 in billData) {
                    console.log("Value of Key 2 :" + key2);
                    if (key1.localeCompare(key2) == 0) {
                        var data = billData[key2];
                        var phoneNo = data["phone"]
                        console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                console.log("Token is " + token);
                                const payload = {
                                    notification: {
                                        title: "Order Prepared",
                                        body: "Your order is Ready! Please come and collect it.",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res => {
                                    console.log("Update Notification sent to : " + token)
                                }).catch(err => {
                                    console.log("Update Notification not sent" + err)
                                })

                            })
                        break;
                    }

                }
            })
    });

exports.onNodeCreated = functions.region("asia-southeast1").database.instance("canteen-management-systems-20a8c").ref("Status/{transactionId}").
    onCreate((snapshot, context) => {

        var key1 = snapshot.key;
        const billRef = db.ref("Bill");
        var query = billRef.orderByKey().limitToLast(100);

        // console.log("Value of Key 1 : " + key1);

        query.once("value")
            .then(function (snapshot1) {
                billData = snapshot1.toJSON();
                for (var key2 in billData) {
                    // console.log("Value of Key 2 :" + key2);
                    if (key1.localeCompare(key2) == 0) {
                        var data = billData[key2];
                        var phoneNo = data["phone"]
                        // console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                // console.log("Token is " + token);
                                const payload = {
                                    notification: {
                                        title: "Order Placed",
                                        body: "Your order has been placed successfully.",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res => {
                                    console.log("Create Notification sent to : " + token)
                                }).catch(err => {
                                    console.log("Create Notification not sent" + err)
                                })

                            })
                        break;
                    }

                }
            })

    });

exports.onNodeDeleted = functions.region("asia-southeast1").database.instance("canteen-management-systems-20a8c").ref("Status/{transactionId}").
    onDelete((snapshot, context) => {

        var key1 = snapshot.key;
        const billRef = db.ref("Bill");
        var query = billRef.orderByKey().limitToLast(100);

        // console.log("Value of Key 1 : " + key1);

        query.once("value")
            .then(function (snapshot1) {
                billData = snapshot1.toJSON();
                for (var key2 in billData) {
                    // console.log("Value of Key 2 :" + key2);
                    if (key1.localeCompare(key2) == 0) {
                        var data = billData[key2];
                        var phoneNo = data["phone"]
                        // console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                // console.log("Token is " + token);
                                const payload = {
                                    notification: {
                                        title: "Order Collected",
                                        body: "The order has been collected by you. Contact if otherwise",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res => {
                                    console.log("Order Taken Notification sent to : " + token)
                                }).catch(err => {
                                    console.log("Order Taken Notification not sent" + err)
                                })

                            })
                        break;
                    }

                }
            })

    });
``

exports.scheduledFunctionCrontab = functions.pubsub.schedule("5 6 * * *")
    .timeZone("Asia/Kolkata") // Users can choose timezone - default is America/Los_Angeles
    .onRun((context) => {
        console.log("Working!");

        var date = new Date();
        var day = parseInt(date.getDate() - 1);
        var year = parseInt(date.getFullYear());
        var month = parseInt(date.getMonth()) + 1;

        console.log('Day :', day)
        console.log('Month : ', month)
        console.log('Year : ', year)

        db.ref().once("value").then(function (datasnapshot) {
            var data = datasnapshot.toJSON();
            menuData = data["Menu"]
            billData = data["Bill"]
            

            var totalAmount = 0;
            var map = {}

            for (var key in menuData) {
                var data3 = menuData[key]
                var innerMap = {
                    "name": data3['name'],
                    "price": data3['price'],
                    "qty": 0,
                    "res": 0
                }

                map[key] = innerMap
            }

            console.log("Map after initialisation : ", map)

            for (var key in billData) {
                var data2 = billData[key];
                var billDate = data2["time"];
                var billDay = parseInt(billDate.slice(8, 10));
                var billMonth = parseInt(billDate.slice(5, 7));
                var billYear = parseInt(billDate.slice(0, 4));
                
                console.log("Key Value is ", key)
                console.log('Bill Day :', billDay)
                console.log('Bill Month : ', billMonth)
                console.log('Bill Year : ', billYear)

                if (day == billDay && month == billMonth && year == billYear) {
                    console.log("Value found");
                    console.log("Ordered Items are", data['OrderedItems'])
                    var orderedItems = data['OrderedItems'][key]
                    for (var key2 in orderedItems) {
                        var orderedItem = orderedItems[key2]
                        map[key2]['qty'] += parseInt(orderedItem['qty'])
                        map[key2]['res'] += parseInt(orderedItem['result'])
                        totalAmount += parseInt(orderedItem['result'])
                        console.log("Total Amount is ", totalAmount)
                        console.log("Updated Map Value : ", map)
                    }
                }

            }

            console.log("Final Map Value ", map)



            // Store data in Arrays which will be converted to csv and sent via email.
            var itemsArray = []
            for (var key in map) {
                console.log(map[key])
                dataPiece = map[key]

                var extraString = key.toString()
                itemsArray
                    .push({
                        name: dataPiece['name'],
                        price: dataPiece['price'],
                        qty: dataPiece['qty'],
                        res: dataPiece['res']
                    })
            }

            const csv = convertArrayToCSV(itemsArray)

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jayjoshi112711@gmail.com',
                    pass: 'xcwkllgeqguuivdc'
                }
            })

            var mailOptions = {
                from: 'jayjoshi112711@gmail.com',
                to: 'jjoshitest@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!',
                attachments: [
                    {
                        filename: "daily_report.csv",
                        content: csv,
                    },
                ]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        })

    });



