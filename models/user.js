const http = require('http').createServer(app);
const admin = require("firebase-admin");

const serviceAccount = require("./fairhockeyarcade-firebase-adminsdk-gpn95-f95f5f4eaa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fairhockeyarcade.firebaseio.com"
});

// Get a database reference to our blog
const db = admin.database();
const usersRef = db.ref("users");

module.exports = function findByCredential(email, password) {
    usersRef.orderByKey().on("child_added", function(snapshot) {
        if (snapshot.val().email === email && snapshot.val().password === password) {
            console.log("Snapshot: ");
            console.log(snapshot);
            return snapshot;
        }
    });
}