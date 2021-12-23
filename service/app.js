// Importamos las dependencias

// Express
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// Puerto
const PORT = 3000;

// Creamos la aplicación
const app = express();

// Definición del módulo y middleware
app
  .use(cors())
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
  });

// Definición de las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestión de errores
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // Establece las locales, solo provee error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
