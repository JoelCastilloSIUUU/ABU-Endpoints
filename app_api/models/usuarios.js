const mongoose = require('mongoose');

const enrolamientoSchema = new mongoose.Schema({
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
    nombreCurso: String,
    progreso: { type: Number, default: 0 },       // Avance del alumno (0-100%)
    calificacion: { type: Number, default: 0 },   // Nota obtenida
    fechaInicio: { type: Date, default: Date.now }
});

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cursosEnrolados: [enrolamientoSchema]
});

mongoose.model('Usuario', usuarioSchema);