const mongoose = require('mongoose');

//Dirección para la conexión, incluyendo puerto y DB
const connectionString = 'mongodb://localhost:27017/api';

// Conexión a MongoDB
mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.log(error);
  });

function shutDown() {
  mongoose.connection.close(function () {
    console.log('Desconectado de MongoDB');
    process.exit(0);
  });
}
