const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/UsuariosABU';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('✅ Conectado a MongoDB local: UsuariosABU');
});

mongoose.connection.on('error', (err) => {
    console.log('❌ Error de conexión a MongoDB local:', err);
});

require('./usuarios');
require('./cursos');