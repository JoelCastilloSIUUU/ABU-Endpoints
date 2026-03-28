const axios = require('axios');

const COURSE_META = {
  WhatsApp: { color: '#25D366', icono: 'bi-chat-fill' },
  YouTube: { color: '#FF0000', icono: 'bi-youtube' },
  Cámara: { color: '#8E44AD', icono: 'bi-camera-fill' },
  Navegador: { color: '#0D6EFD', icono: 'bi-globe' },
  Ajustes: { color: '#6C757D', icono: 'bi-gear-fill' },
  Llamadas: { color: '#00BFA5', icono: 'bi-telephone-fill' }
};

const getApiBase = (req) => `${req.protocol}://${req.get('host')}/api`;

const learningModules = [
  { nombre: 'WhatsApp', desc: 'Envía mensajes, fotos y audios a tus seres queridos', icono: 'bi-chat-left-text-fill', color: '#25D366' },
  { nombre: 'YouTube', desc: 'Mira videos, busca contenido y guarda tus favoritos', icono: 'bi-play-btn-fill', color: '#FF0000' },
  { nombre: 'Cámara', desc: 'Toma fotos, guárdalas y compártelas fácilmente', icono: 'bi-camera-fill', color: '#833AB4' },
  { nombre: 'Navegador', desc: 'Busca información en internet de forma segura', icono: 'bi-globe', color: '#0D6EFD' },
  { nombre: 'Ajustes', desc: 'Personaliza tu celular y maneja la configuración', icono: 'bi-gear-fill', color: '#6C757D' },
  { nombre: 'Llamadas', desc: 'Realiza y recibe llamadas, gestiona tus contactos', icono: 'bi-telephone-fill', color: '#00BFA5' }
];

async function fetchUserAndReviews(req, userId) {
  if (!userId) {
    return { cursosActivos: [], reviewsByCourse: {} };
  }

  const userResponse = await axios.get(`${getApiBase(req)}/users/${userId}`);
  const usuario = userResponse.data;
  const cursosActivos = usuario.cursosEnrolados || [];
  const reviewsByCourse = {};

  await Promise.all(
    cursosActivos.map(async (curso) => {
      try {
        const reviewResponse = await axios.get(`${getApiBase(req)}/cursos/${curso.cursoId}/resenas`);
        reviewsByCourse[String(curso.cursoId)] = reviewResponse.data.reviews || [];
      } catch (_err) {
        reviewsByCourse[String(curso.cursoId)] = [];
      }
    })
  );

  return { usuario, cursosActivos, reviewsByCourse };
}

const principal = async (req, res) => {
  const nombre = req.query.nombre || 'Usuario';
  const userid = req.query.userid || '';
  const userNombre = nombre;
  const success = req.query.success || '';
  const error = req.query.error || '';

  let cursosActivos = [];
  let reviewsByCourse = {};

  if (userid) {
    try {
      const userData = await fetchUserAndReviews(req, userid);
      cursosActivos = userData.cursosActivos.map((curso) => ({
        ...curso,
        meta: COURSE_META[curso.nombreCurso] || { color: '#FF8C00', icono: 'bi-bookmark-fill' }
      }));
      reviewsByCourse = userData.reviewsByCourse;
    } catch (err) {
      return res.render('principal', {
        title: `¡Hola, ${nombre}!`,
        subtitle: 'Sigamos aprendiendo juntos',
        progeso: '0/6',
        seccionTitulo: 'Tu camino de aprendizaje',
        seccionDesc: 'Elige un tema para comenzar. Cada módulo tiene 3 ejercicios prácticos. Aprenderás haciendo, sin prisa y con ejemplos claros.',
        modulos: learningModules,
        userid,
        userNombre,
        cursosActivos: [],
        reviewsByCourse: {},
        error: err.response?.data?.mensaje || 'No se pudo cargar la información del usuario'
      });
    }
  }

  res.render('principal', {
    title: `¡Hola, ${nombre}!`,
    subtitle: 'Sigamos aprendiendo juntos',
    progeso: '0/6',
    seccionTitulo: 'Tu camino de aprendizaje',
    seccionDesc: 'Elige un tema para comenzar. Cada módulo tiene 3 ejercicios prácticos. Aprenderás haciendo, sin prisa y con ejemplos claros.',
    modulos: learningModules,
    userid,
    userNombre,
    success,
    error,
    cursosActivos,
    reviewsByCourse
  });
};

const addCursoPersonalizado = async (req, res) => {
  const { userId, nombre, nombreCurso } = req.body;

  if (!userId || !nombreCurso) {
    return res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&error=${encodeURIComponent('Selecciona un curso válido')}`);
  }

  try {
    await axios.post(`${getApiBase(req)}/users/${userId}/cursos`, { nombreCurso });
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId)}&success=${encodeURIComponent('Curso añadido a tu lista personalizada')}`);
  } catch (err) {
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId)}&error=${encodeURIComponent(err.response?.data?.mensaje || 'No se pudo añadir el curso')}`);
  }
};

const deleteCursoPersonalizado = async (req, res) => {
  const { userId, nombre } = req.body;
  const { cursoid } = req.params;

  if (!userId || !cursoid) {
    return res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&error=${encodeURIComponent('Faltan datos para eliminar el curso')}`);
  }

  try {
    await axios.delete(`${getApiBase(req)}/users/${userId}/cursos/${cursoid}`);
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId)}&success=${encodeURIComponent('Curso eliminado correctamente')}`);
  } catch (err) {
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId)}&error=${encodeURIComponent(err.response?.data?.mensaje || 'No se pudo eliminar el curso')}`);
  }
};

const crearResenaCurso = async (req, res) => {
  const { userId, nombre, rating, comment } = req.body;
  const { cursoid } = req.params;

  if (!cursoid || !rating || !comment) {
    return res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&error=${encodeURIComponent('Completa calificación y comentario para crear la reseña')}`);
  }

  try {
    await axios.post(`${getApiBase(req)}/cursos/${cursoid}/resenas`, {
      userId,
      userName: nombre || 'Anónimo',
      rating,
      comment
    });

    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&success=${encodeURIComponent('Reseña creada con éxito')}`);
  } catch (err) {
    const msg = err.response?.data?.error || err.response?.data?.mensaje || 'No se pudo crear la reseña';
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&error=${encodeURIComponent(msg)}`);
  }
};

module.exports = {
  principal,
  whatsapp,
  whatsappAgregarContacto,
  whatsappAgregarContactoPaso,
  whatsappAgregarContactoCompletado,
  addCursoPersonalizado,
  deleteCursoPersonalizado,
  crearResenaCurso
};

function whatsapp(req, res) {
  const done = req.query.done === 'agregar-contacto';
  const completedCount = done ? 1 : 0;
  res.render('whatsapp', {
    title: 'WhatsApp',
    completedCount,
    totalCount: 3,
    ejercicios: [
      {
        key: 'agregar-contacto',
        orden: 1,
        nombre: 'Agregar un contacto',
        desc: 'Aprende a añadir un contacto en WhatsApp',
        href: '/whatsapp/agregar-contacto',
        completed: done
      },
      {
        key: 'enviar-mensaje',
        orden: 2,
        nombre: 'Enviar un mensaje',
        desc: 'Aprende a enviar un mensaje de texto',
        href: '#',
        locked: !done
      },
      {
        key: 'compartir-foto',
        orden: 3,
        nombre: 'Compartir una foto',
        desc: 'Aprende a enviar una foto por WhatsApp',
        href: '#',
        locked: !done
      }
    ]
  });
}

function whatsappAgregarContacto(req, res) {
  res.render('whatsapp_agregar_contacto', {
    title: 'Agregar un contacto',
    modulo: 'WhatsApp',
    totalPasos: 3
  });
}

function whatsappAgregarContactoPaso(req, res) {
  const paso = Number(req.params.n);
  const totalPasos = 3;
  const steps = {
    1: {
      titulo: 'Abre WhatsApp',
      instruccion: 'Ahora vas a: ',
      accion: 'Tocar el icono verde de WhatsApp',
      simulacion: 'Simulación: Tocar el icono verde de WhatsApp'
    },
    2: {
      titulo: 'Busca el botón de nuevo chat',
      instruccion: 'Ahora vas a: ',
      accion: 'Tocar el icono de mensaje en la esquina inferior derecha',
      simulacion: 'Simulación: Tocar el icono de mensaje en la esquina inferior derecha'
    },
    3: {
      titulo: "Selecciona 'Nuevo contacto'",
      instruccion: 'Ahora vas a: ',
      accion: "Tocar en 'Nuevo contacto'",
      simulacion: "Simulación: Tocar en 'Nuevo contacto'"
    }
  };

  const data = steps[paso] || steps[1];

  const nextHref = paso < totalPasos
    ? `/whatsapp/agregar-contacto/paso/${paso + 1}`
    : '/whatsapp/agregar-contacto/completado';

  res.render('whatsapp_agregar_contacto_paso', {
    title: 'Agregar un contacto',
    modulo: 'WhatsApp',
    paso,
    totalPasos,
    progressText: `${paso}/${totalPasos}`,
    ...data,
    nextHref
  });
}

function whatsappAgregarContactoCompletado(req, res) {
  res.render('whatsapp_agregar_contacto_completado', {
    title: 'Agregar un contacto',
    modulo: 'WhatsApp',
    continuarHref: '/whatsapp?done=agregar-contacto'
  });
}
