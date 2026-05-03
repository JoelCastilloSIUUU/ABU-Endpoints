const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/UsuariosABU';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('✅ Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('❌ Error de conexión a MongoDB:', err);
});

require('./usuarios');
require('./cursos');