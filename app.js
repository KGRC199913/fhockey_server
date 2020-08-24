const express = require('express');
const app = express();
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

// Write Data
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});

// Read Data
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

const indexRouter = require('./routes/index')

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500);
});

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3001

http.listen(PORT, () =>
  console.log(`listening on port ${PORT}!`),
);

module.exports = app;
