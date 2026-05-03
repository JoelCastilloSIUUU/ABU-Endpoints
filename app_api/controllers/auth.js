const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Curso = mongoose.model('Curso');

const COURSE_META = {
  WhatsApp: { color: '#25D366', icono: 'bi-chat-fill', descripcion: 'Envía mensajes, fotos y audios a tus seres queridos' },
  YouTube: { color: '#FF0000', icono: 'bi-youtube', descripcion: 'Mira videos, busca contenido y guarda tus favoritos' },
  Cámara: { color: '#8E44AD', icono: 'bi-camera-fill', descripcion: 'Toma fotos, guárdalas y compártelas fácilmente' },
  Navegador: { color: '#0D6EFD', icono: 'bi-globe', descripcion: 'Busca información en internet de forma segura' },
  Ajustes: { color: '#6C757D', icono: 'bi-gear-fill', descripcion: 'Personaliza tu celular y maneja la configuración' },
  Llamadas: { color: '#00BFA5', icono: 'bi-telephone-fill', descripcion: 'Realiza y recibe llamadas, gestiona tus contactos' }
};

const MODULE_TOTAL_EXERCISES = {
  whatsapp: 3,
  youtube: 3,
  camara: 3,
  navegador: 3,
  ajustes: 3,
  llamadas: 3
};

const VALID_MODULES = Object.keys(MODULE_TOTAL_EXERCISES);

const getCourseDefaults = (nombre) => ({
  descripcion: COURSE_META[nombre]?.descripcion || 'Curso personalizado creado por el usuario',
  icono: COURSE_META[nombre]?.icono || 'bi-bookmark-fill',
  color_hex: COURSE_META[nombre]?.color || '#FF8C00'
});

const ensureModuleProgress = (usuario, modulo) => {
  if (!usuario.progresoModulos) {
    usuario.progresoModulos = {};
  }

  if (!usuario.progresoModulos[modulo]) {
    usuario.progresoModulos[modulo] = {
      ejerciciosCompletados: [],
      completado: false
    };
  }

  if (!Array.isArray(usuario.progresoModulos[modulo].ejerciciosCompletados)) {
    usuario.progresoModulos[modulo].ejerciciosCompletados = [];
  }

  if (typeof usuario.progresoModulos[modulo].completado !== 'boolean') {
    usuario.progresoModulos[modulo].completado = false;
  }

  return usuario.progresoModulos[modulo];
};

const countCompletedModules = (progresoModulos = {}) => {
  return VALID_MODULES.filter((modulo) => progresoModulos?.[modulo]?.completado).length;
};

const ensureCourseProgress = (usuario, cursoId, totalEjercicios = 0) => {
  if (!Array.isArray(usuario.progresoCursos)) {
    usuario.progresoCursos = [];
  }

  let item = usuario.progresoCursos.find(
    (p) => String(p.cursoId) === String(cursoId)
  );

  if (!item) {
    item = {
      cursoId,
      ejerciciosCompletados: [],
      ultimoEjercicioId: null,
      porcentaje: 0,
      completado: false,
      actualizadoEn: new Date()
    };
    usuario.progresoCursos.push(item);
    item = usuario.progresoCursos[usuario.progresoCursos.length - 1];
  }

  if (!Array.isArray(item.ejerciciosCompletados)) {
    item.ejerciciosCompletados = [];
  }

  item.porcentaje = totalEjercicios
    ? Math.round((item.ejerciciosCompletados.length / totalEjercicios) * 100)
    : 0;

  item.completado = totalEjercicios > 0 && item.ejerciciosCompletados.length >= totalEjercicios;
  item.actualizadoEn = new Date();

  return item;
};


const registro = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({
      mensaje: 'Faltan datos obligatorios (nombre, email o password)'
    });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo' });
    }

    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
  }
};

const usuarioLeerUno = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userid).lean();

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: err.message });
  }
};

const usuarioActualizar = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = req.body.nombre ?? usuario.nombre;
    usuario.email = req.body.email ?? usuario.email;
    usuario.password = req.body.password ?? usuario.password;
    await usuario.save();

    res.status(200).json({
      mensaje: 'Datos del perfil actualizados',
      usuario
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: err.message });
  }
};

const usuarioBorrar = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cuenta de usuario eliminada correctamente', usuarioId: req.params.userid });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: err.message });
  }
};

const usuarioInscribirCurso = async (req, res) => {
  const { nombreCurso, cursoId } = req.body;

  if (!nombreCurso && !cursoId) {
    return res.status(400).json({ mensaje: 'Debes seleccionar un curso para añadir' });
  }

  try {
    const usuario = await Usuario.findById(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    let curso = null;

    if (cursoId) {
      if (!mongoose.Types.ObjectId.isValid(cursoId)) {
        return res.status(400).json({ mensaje: 'ID de curso no válido' });
      }

      curso = await Curso.findById(cursoId);
    } else {
      curso = await Curso.findOne({ nombre: nombreCurso });

      if (!curso) {
        curso = await Curso.create({
          nombre: nombreCurso,
          ...getCourseDefaults(nombreCurso),
          origen: 'static',
          creador: null
        });
      }
    }

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    const yaExiste = usuario.cursosEnrolados.some(
      (c) => String(c.cursoId) === String(curso._id)
    );

    if (yaExiste) {
      return res.status(409).json({ mensaje: 'Ese curso ya está en tu lista personalizada' });
    }

    usuario.cursosEnrolados.push({
      cursoId: curso._id,
      nombreCurso: curso.nombre,
      progreso: 0,
      calificacion: 0
    });

    await usuario.save();

    res.status(201).json({
      mensaje: 'Curso agregado a tu lista personalizada',
      usuarioId: req.params.userid,
      cursoAnadido: {
        cursoId: curso._id,
        nombreCurso: curso.nombre,
        progreso: 0,
        calificacion: 0
      }
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al agregar curso', error: err.message });
  }
};

const usuarioActualizarProgreso = async (req, res) => {
  const { progreso } = req.body;

  if (progreso === undefined) {
    return res.status(400).json({ mensaje: 'El progreso es obligatorio' });
  }

  try {
    const usuario = await Usuario.findById(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const curso = usuario.cursosEnrolados.find((c) => String(c.cursoId) === String(req.params.cursoid));
    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado en la lista del usuario' });
    }

    curso.progreso = Number(progreso);
    await usuario.save();

    res.status(200).json({
      mensaje: 'Avance guardado con éxito',
      usuarioId: req.params.userid,
      cursoId: req.params.cursoid,
      nuevoProgreso: `${curso.progreso}%`
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar progreso', error: err.message });
  }
};

const usuarioEliminarCurso = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const cursoOriginal = usuario.cursosEnrolados.length;
    usuario.cursosEnrolados = usuario.cursosEnrolados.filter(
      (c) => String(c.cursoId) !== String(req.params.cursoid) && String(c._id) !== String(req.params.cursoid)
    );

    if (usuario.cursosEnrolados.length === cursoOriginal) {
      return res.status(404).json({ mensaje: 'Curso no encontrado en la lista del usuario' });
    }

    await usuario.save();
    res.status(200).json({
      mensaje: 'Curso eliminado correctamente de la lista del usuario',
      usuarioId: req.params.userid,
      cursoId: req.params.cursoid
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar curso', error: err.message });
  }
};

const usuarioLeerProgresoModulo = async (req, res) => {
  const { userid, modulo } = req.params;

  if (!VALID_MODULES.includes(modulo)) {
    return res.status(400).json({ mensaje: 'Módulo inválido' });
  }

  try {
    const usuario = await Usuario.findById(userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const progresoModulo = ensureModuleProgress(usuario, modulo);

    res.status(200).json({
      modulo,
      progreso: progresoModulo,
      progresoGeneral: `${countCompletedModules(usuario.progresoModulos)}/6`
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al leer progreso del módulo', error: err.message });
  }
};

const usuarioCompletarEjercicioModulo = async (req, res) => {
  const { userid, modulo, ejercicioid } = req.params;

  if (!VALID_MODULES.includes(modulo)) {
    return res.status(400).json({ mensaje: 'Módulo inválido' });
  }

  try {
    const usuario = await Usuario.findById(userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const progresoModulo = ensureModuleProgress(usuario, modulo);

    if (!progresoModulo.ejerciciosCompletados.includes(ejercicioid)) {
      progresoModulo.ejerciciosCompletados.push(ejercicioid);
    }

    const totalEjercicios = MODULE_TOTAL_EXERCISES[modulo] || 0;
    progresoModulo.completado = progresoModulo.ejerciciosCompletados.length >= totalEjercicios;

    await usuario.save();

    res.status(200).json({
      mensaje: 'Ejercicio completado guardado con éxito',
      modulo,
      ejercicioid,
      progreso: progresoModulo,
      progresoGeneral: `${countCompletedModules(usuario.progresoModulos)}/6`
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al guardar progreso del ejercicio', error: err.message });
  }
};


const usuarioLeerProgresoCurso = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userid);
    const curso = await Curso.findById(req.params.cursoid).lean();

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    const progreso = ensureCourseProgress(usuario, curso._id, curso.ejercicios.length);

    res.status(200).json({
      cursoId: curso._id,
      progreso
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al leer progreso del curso', error: err.message });
  }
};

const usuarioCompletarEjercicioCurso = async (req, res) => {
  try {
    const { userid, cursoid, ejercicioid } = req.params;

    const usuario = await Usuario.findById(userid);
    const curso = await Curso.findById(cursoid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    const ejercicioExiste = curso.ejercicios.some(
      (e) => String(e._id) === String(ejercicioid)
    );

    if (!ejercicioExiste) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }

    const progreso = ensureCourseProgress(usuario, curso._id, curso.ejercicios.length);
    const yaCompletado = progreso.ejerciciosCompletados.some(
      (id) => String(id) === String(ejercicioid)
    );

    if (!yaCompletado) {
      progreso.ejerciciosCompletados.push(ejercicioid);
    }

    progreso.ultimoEjercicioId = ejercicioid;
    progreso.porcentaje = Math.round((progreso.ejerciciosCompletados.length / curso.ejercicios.length) * 100);
    progreso.completado = progreso.ejerciciosCompletados.length >= curso.ejercicios.length;
    progreso.actualizadoEn = new Date();

    const enrolado = usuario.cursosEnrolados.find(
      (c) => String(c.cursoId) === String(curso._id)
    );

    if (enrolado) {
      enrolado.progreso = progreso.porcentaje;
    }

    await usuario.save();

    res.status(200).json({
      mensaje: 'Progreso del curso actualizado',
      progreso
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al guardar progreso del curso', error: err.message });
  }
};

module.exports = {
  registro,
  login,
  usuarioLeerUno,
  usuarioActualizar,
  usuarioBorrar,
  usuarioInscribirCurso,
  usuarioActualizarProgreso,
  usuarioEliminarCurso,
  usuarioLeerProgresoModulo,
  usuarioCompletarEjercicioModulo,
  usuarioLeerProgresoCurso,
  usuarioCompletarEjercicioCurso
};