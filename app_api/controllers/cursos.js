const mongoose = require('mongoose');
const Curso = mongoose.model('Curso');
const Usuario = mongoose.model('Usuario');

const slugify = (text = '') =>
  text.toString().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizar = (txt = '') =>
  txt.toString().trim().toLowerCase();

const cursosListar = async (req, res) => {
  try {
    const filtro = {};

    if (req.query.creador) filtro.creador = req.query.creador;
    if (req.query.origen) filtro.origen = req.query.origen;

    const cursos = await Curso.find(filtro)
      .select('nombre descripcion icono color_hex slug creador origen ejercicios')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(cursos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al listar cursos', error: err.message });
  }
};

const cursosCrear = async (req, res) => {
  try {
    const { userId, nombre, descripcion, icono, color_hex, ejercicios } = req.body;

    if (!userId || !nombre || !Array.isArray(ejercicios) || !ejercicios.length) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios del curso' });
    }

    const curso = await Curso.create({
      nombre,
      descripcion,
      icono: icono || 'bi-bookmark-fill',
      color_hex: color_hex || '#FF8C00',
      slug: slugify(nombre),
      origen: 'dynamic',
      creador: userId,
      ejercicios: ejercicios.map((e, i) => ({
        titulo: e.titulo || `Ejercicio ${i + 1}`,
        descripcion: e.descripcion || '',
        pregunta: e.pregunta,
        tipo: e.tipo,
        opciones: e.tipo === 'multiple'
          ? (e.opciones || []).map(texto => ({ texto }))
          : [],
        respuestaCorrecta: e.respuestaCorrecta,
        orden: i + 1
      }))
    });

    await Usuario.findByIdAndUpdate(userId, {
      $push: {
        cursosEnrolados: {
          cursoId: curso._id,
          nombreCurso: curso.nombre,
          progreso: 0,
          calificacion: 0
        }
      }
    });

    res.status(201).json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear curso', error: err.message });
  }
};

const cursosLeerUno = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.cursoid).lean();

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    res.status(200).json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al leer curso', error: err.message });
  }
};

const cursosActualizar = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.cursoid);

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    curso.nombre = req.body.nombre ?? curso.nombre;
    curso.descripcion = req.body.descripcion ?? curso.descripcion;
    curso.icono = req.body.icono ?? curso.icono;
    curso.color_hex = req.body.color_hex ?? curso.color_hex;
    curso.publicado = req.body.publicado ?? curso.publicado;

    if (Array.isArray(req.body.ejercicios)) {
      curso.ejercicios = req.body.ejercicios.map((e, i) => ({
        titulo: e.titulo || `Ejercicio ${i + 1}`,
        descripcion: e.descripcion || '',
        pregunta: e.pregunta,
        tipo: e.tipo,
        opciones: e.tipo === 'multiple'
          ? (e.opciones || []).map(texto => ({ texto }))
          : [],
        respuestaCorrecta: e.respuestaCorrecta,
        orden: i + 1
      }));
    }

    await curso.save();

    res.status(200).json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar curso', error: err.message });
  }
};

const cursosBorrar = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.cursoid);

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar curso', error: err.message });
  }
};

const validarRespuesta = async (req, res) => {
  try {
    const { respuesta } = req.body;
    const curso = await Curso.findById(req.params.cursoid).lean();

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    const ejercicio = curso.ejercicios.find(
      (e) => String(e._id) === String(req.params.ejercicioid)
    );

    if (!ejercicio) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }

    const correcta = normalizar(respuesta) === normalizar(ejercicio.respuestaCorrecta);

    res.status(200).json({ correcta });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al validar respuesta', error: err.message });
  }
};

module.exports = {
  cursosListar,
  cursosCrear,
  cursosLeerUno,
  cursosActualizar,
  cursosBorrar,
  validarRespuesta
};
