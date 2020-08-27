const express = require('express');
const bcrypt = require('bcryptjs');
const admin = require("firebase-admin");

const userRoute = express.Router();

// Get a database reference to our blog
const db = admin.database();
const usersRef = db.ref("users");


/* GET users listing. */
userRoute.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const User = require('../models/user');

userRoute.post('/users', async (req, res) => {
  try {
    const userObject = require('./register')(req);
    const hashedPassword = await bcrypt.hash(userObject.password, 8);
    console.log("pass: ", userObject.password);
    console.log("hash pass: ", hashedPassword);
    userObject.password = hashedPassword;
    console.log(userObject);

    const newUsersRef = usersRef.push();
    const userId = newUsersRef.key;

    await usersRef.child(userId).set(userObject);

    res.status(201).send({
      message: `A new user has been created.`
    });

  } catch (error) {
    res.status(400).send({
      error : error.message
    });
  }
});

userRoute.post('/users/login', async (req, res) => {
  try {
    const { email, password } = require('./login')(req);
    // const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.findByCredential(email, password);
    console.log("Users: ", user);
    if (user) {
        res.status(201).send({
            user
        });
    } else {
      res.status(404).send({
        error: "User not found!"
      });
    }
  }
  catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

module.exports = {
  userRoute
};