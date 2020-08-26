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
// const db = admin.database();
// const usersRef = db.ref("users");

// // Write Data
// usersRef.set({
//   alanisawesome: {
//     email: "asd@gmail.com",
//     password: "123"
//   },
//   gracehop: {
//     email: "abc@gmail.com",
//     password: "1234"
//   }
// });

// usersRef.orderByKey().on("child_added", function(snapshot) {
//   console.log("Snapshot Value: ");
//   console.log(snapshot.val());
//   console.log("Snapshot key: ");
//   console.log(snapshot.key);
  
// });

const index = require('./routes/index');
const user = require('./routes/users');

app.use(express.json());
app.use(index.indexRoute);
app.use(user.userRoute);

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
