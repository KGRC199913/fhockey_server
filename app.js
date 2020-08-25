const express = require('express');
const app = express();

const index = require('./routes/index')
const user = require('./routes/users');

app.use(index.indexRouter);
app.use(user.userRouter);

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
