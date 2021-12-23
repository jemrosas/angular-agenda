//Importamos la conexión con la BD
require('../mongoDB');
// const mongoose = require('mongoose');
const User = require('../models/User');

// Incluimos la constante "validationResult" para poder utilizar los módulos de validación:
const { validationResult } = require('express-validator');

// Mostramos todos los usuarios almacenados en la base de datos:
module.exports.users_list = function (request, response) {
  User.find({})
    .then((users) => response.json(users).end())
    .catch((error) => next(error));
};

// Creamos un nuevo usuario y lo almacenamos en la base de datos:
module.exports.users_create = function (request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }

  const newUser = new User(request.body);

  newUser
    .save()
    .then((savedUser) => response.json({ status: 'Usuario creado' }).end())
    .catch((error) => next(error));
};

// Recuperamos un usuario de la base de datos:
module.exports.users_find_one = function (request, response, next) {
  const { id } = request.params;

  User.findById(id)
    .then((foundUser) => response.json(foundUser).end())
    .catch((error) => next(error));
};

// Actualizamos un usuario de la base de datos:
module.exports.users_update_one = function (request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }

  const { id } = request.params;
  const updatedUser = request.body;

  User.findByIdAndUpdate(id, updatedUser, { new: true })
    .then(() => response.json({ status: 'Usuario actualizado' }).end())
    .catch((error) => next(error));
};

// Borramos un usuario de la base de datos:
module.exports.users_delete_one = function (request, response, next) {
  const { id } = request.params;

  User.findByIdAndRemove(id)
    .then(() => response.json({ status: 'Usuario eliminado' }).end())
    .catch((error) => next(error));
};
