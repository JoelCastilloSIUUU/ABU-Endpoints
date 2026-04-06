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

const getCourseDefaults = (nombre) => ({
  descripcion: COURSE_META[nombre]?.descripcion || 'Curso personalizado creado por el usuario',
  icono: COURSE_META[nombre]?.icono || 'bi-bookmark-fill',
  color_hex: COURSE_META[nombre]?.color || '#FF8C00'
});

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
  const { nombreCurso } = req.body;

  if (!nombreCurso) {
    return res.status(400).json({ mensaje: 'Debes seleccionar un curso para añadir' });
  }

  try {
    const usuario = await Usuario.findById(req.params.userid);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    let curso = await Curso.findOne({ nombre: nombreCurso });
    if (!curso) {
      curso = await Curso.create({ nombre: nombreCurso, ...getCourseDefaults(nombreCurso) });
    }

    const yaExiste = usuario.cursosEnrolados.some((c) => String(c.cursoId) === String(curso._id));
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

module.exports = {
  registro,
  login,
  usuarioLeerUno,
  usuarioActualizar,
  usuarioBorrar,
  usuarioInscribirCurso,
  usuarioActualizarProgreso,
  usuarioEliminarCurso
};