const mongoose = require('mongoose');

const enrolamientoSchema = new mongoose.Schema({
  cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
  nombreCurso: String,
  progreso: { type: Number, default: 0 },
  calificacion: { type: Number, default: 0 },
  fechaInicio: { type: Date, default: Date.now }
});

const progresoModuloSchema = new mongoose.Schema({
  ejerciciosCompletados: [String],
  completado: { type: Boolean, default: false }
}, { _id: false });

const progresoCursoSchema = new mongoose.Schema({
  cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  ejerciciosCompletados: [{ type: mongoose.Schema.Types.ObjectId }],
  ultimoEjercicioId: { type: mongoose.Schema.Types.ObjectId, default: null },
  porcentaje: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  actualizadoEn: { type: Date, default: Date.now }
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  cursosEnrolados: [enrolamientoSchema],

  progresoModulos: {
    whatsapp: { type: progresoModuloSchema, default: () => ({}) },
    youtube: { type: progresoModuloSchema, default: () => ({}) },
    camara: { type: progresoModuloSchema, default: () => ({}) },
    navegador: { type: progresoModuloSchema, default: () => ({}) },
    ajustes: { type: progresoModuloSchema, default: () => ({}) },
    llamadas: { type: progresoModuloSchema, default: () => ({}) }
  },

  progresoCursos: { type: [progresoCursoSchema], default: [] }
});

mongoose.model('Usuario', usuarioSchema);
