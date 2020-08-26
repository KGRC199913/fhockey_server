const express = require('express');
const userRoute = express.Router();
const http = require('http').createServer(app);
const admin = require("firebase-admin");

const serviceAccount = require("./fairhockeyarcade-firebase-adminsdk-gpn95-f95f5f4eaa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fairhockeyarcade.firebaseio.com"
});

// Get a database reference to our blog
const db = admin.database();
const ref = db.ref("/");
const usersRef = ref.child("users");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const User = require("../models/user");

userRoute.post('/users', async (req, res) => {
  try {
    const userObject = require('./register')(req);
    const newUsersRef = usersRef.push();
    const userId = newUsersRef.key;

    await usersRef.child(userId).push(userObject);

    res.status(201).send({
      message: `A new user has been created.`
    });

  } catch (error) {
    res.status(400).send({
      error
    });
  }
});

userRoute.post('/users/login', async (req, res) => {
  try {
    const { email, password } = require('./login')(req);
    
    const user = User.findByCredential(email, password);
    console.log("User: " + user);

    res.status(201).send({
      user,
      token
    });
  }
  catch (error) {
    res.status(400).send({
      error: errorHandler(error)
    });
  }
});

module.exports = userRoute;
