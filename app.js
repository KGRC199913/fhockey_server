var express = require('express');
var app = express();
var indexRouter = require('./routes/index')

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

const PORT = 3001

app.listen(PORT, () =>
  console.log(`listening on port ${PORT}!`),
);

module.exports = app;
