const mongoose = require('mongoose');

const enrolamientoSchema = new mongoose.Schema({
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
    nombreCurso: String,
    progreso: { type: Number, default: 0 },
    calificacion: { type: Number, default: 0 },
    fechaInicio: { type: Date, default: Date.now }
});

// 🔥 NUEVO: progreso por módulos y ejercicios
const progresoModuloSchema = new mongoose.Schema({
    ejerciciosCompletados: [String], // ids de ejercicios
    completado: { type: Boolean, default: false }
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    cursosEnrolados: [enrolamientoSchema],

    // 🔥 CLAVE DEL PROYECTO
    progresoModulos: {
        whatsapp: { type: progresoModuloSchema, default: () => ({}) },
        youtube: { type: progresoModuloSchema, default: () => ({}) },
        camara: { type: progresoModuloSchema, default: () => ({}) },
        navegador: { type: progresoModuloSchema, default: () => ({}) },
        ajustes: { type: progresoModuloSchema, default: () => ({}) },
        llamadas: { type: progresoModuloSchema, default: () => ({}) }
    }
});

mongoose.model('Usuario', usuarioSchema);