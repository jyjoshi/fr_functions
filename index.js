const functions = require("firebase-functions");
const { DataSnapshot } = require("firebase-functions/v1/database");
const { snapshotConstructor } = require("firebase-functions/v1/firestore");
var admin = require('firebase-admin');

$env: GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\Jay\Downloads\canteen-management-systems-firebase-adminsdk-6457x-d58bc242c2.json"

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://canteen-management-systems.firebaseio.com/'
});

const db = admin.database();



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.onNodeUpdated = functions.database.ref("Status/{transactionId}").
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
                        var phoneNo = data['phone']
                        console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                console.log("Token is " + token);
                                const payload = {
                                    notification:{
                                        title:"Order Prepared",
                                        body: "Your order is Ready! Please come and collect it.",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res=>{
                                    console.log("Update Notification sent to : " + token)
                                }).catch(err=>{
                                    console.log("Update Notification not sent" + err)
                                })

                            })
                            break;
                    }

                }
            })
    });

exports.onNodeCreated = functions.database.ref("Status/{transactionId}").
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
                        var phoneNo = data['phone']
                        // console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                // console.log("Token is " + token);
                                const payload = {
                                    notification:{
                                        title:"Order Placed",
                                        body: "Your order has been placed successfully.",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res=>{
                                    console.log("Create Notification sent to : " + token)
                                }).catch(err=>{
                                    console.log("Create Notification not sent" + err)
                                })

                            })
                            break;
                    }

                }
            })

    });

exports.onNodeDeleted = functions.database.ref("Status/{transactionId}").
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
                        var phoneNo = data['phone']
                        // console.log("Phone Number is " + phoneNo);
                        var query2 = db.ref("MessageIds/" + phoneNo);
                        query2.once("value")
                            .then(function (snapshot2) {
                                var token = snapshot2.val()
                                // console.log("Token is " + token);
                                const payload = {
                                    notification:{
                                        title:"Order Collected",
                                        body: "The order has been collected by you. Contact if otherwise",
                                    }
                                }
                                return admin.messaging().sendToDevice(token, payload).then(res=>{
                                    console.log("Order Taken Notification sent to : " + token)
                                }).catch(err=>{
                                    console.log("Order Taken Notification not sent" + err)
                                })

                            })
                            break;
                    }

                }
            })

    });

    