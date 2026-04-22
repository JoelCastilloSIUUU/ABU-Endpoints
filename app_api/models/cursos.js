const mongoose = require('mongoose');
const { Schema } = mongoose;

const reseñaSchema = new Schema({
  autor: { type: String, required: true },
  puntuacion: { type: Number, required: true, min: 0, max: 5 },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

const opcionSchema = new Schema({
  texto: { type: String, required: true, trim: true }
}, { _id: false });

const ejercicioSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '' },
  pregunta: { type: String, required: true, trim: true },
  tipo: { type: String, enum: ['multiple', 'text'], required: true },
  opciones: {
    type: [opcionSchema],
    default: [],
    validate: {
      validator: function (value) {
        if (this.tipo !== 'multiple') return true;
        return Array.isArray(value) && value.length >= 2;
      },
      message: 'Un ejercicio de selección múltiple debe tener al menos 2 opciones'
    }
  },
  respuestaCorrecta: { type: String, required: true, trim: true },
  orden: { type: Number, required: true }
}, { _id: true });

const cursoSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '' },
  icono: { type: String, default: 'bi-bookmark-fill' },
  color_hex: { type: String, default: '#FF8C00' },
  slug: { type: String, trim: true, index: true },

  origen: { type: String, enum: ['static', 'dynamic'], default: 'dynamic' },
  creador: { type: Schema.Types.ObjectId, ref: 'Usuario', default: null, index: true },
  publicado: { type: Boolean, default: true },

  ejercicios: { type: [ejercicioSchema], default: [] },
  reseñas: [reseñaSchema]
}, { timestamps: true });

cursoSchema.path('creador').validate(function (value) {
  if (this.origen === 'static') return true;
  return !!value;
}, 'Los cursos dinámicos deben tener creador');

mongoose.model('Curso', cursoSchema);
