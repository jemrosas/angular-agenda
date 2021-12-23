const { model, Schema } = require('mongoose');
// Establecemos el esquema que seguirán todos los usuarios de la colección
const userSchema = new Schema({
  name: String,
  surname: String,
  age: Number,
  idCard: String,
  birthdate: Date,
  favouriteColor: String,
  gender: String,
});

// Modificamos el esquema de la info enviada desde la BD, para no tocar el JSON en la app que llame a la BD
userSchema.set('toJSON', {
  // Cambia las propiedad '_id' por 'id'
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    // Elimina las propiedades '_v' y '_id' del objeto retornado
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Crea una colección Users usando el esquema anteriormente definido
const User = model('User', userSchema);

module.exports = User;
