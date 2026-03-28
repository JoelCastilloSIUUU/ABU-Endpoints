const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
    autor: { type: String, required: true },
    puntuacion: { type: Number, required: true, min: 0, max: 5 },
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const cursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String,
    icono: String,
    color_hex: String,
    reseñas: [reseñaSchema] 
});

mongoose.model('Curso', cursoSchema);