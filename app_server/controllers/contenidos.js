const axios = require('axios');

const cursos = {
  whatsapp: {
    slug: 'whatsapp',
    nombre: 'WhatsApp',
    color: '#25D366',
    icono: 'bi-chat-left-text-fill',
    ejercicios: [
      {
        id: 'agregar-contacto',
        nombre: 'Agregar un contacto',
        desc: 'Aprende a añadir un contacto en WhatsApp',
        pasos: [
          {
            titulo: 'Abre WhatsApp',
            accion: 'Tocar el icono verde de WhatsApp',
            simulacion: 'Simulación: Tocar el icono verde de WhatsApp',
            tipo: 'tap',
            juego: {
              instruccion: 'Toca el botón correcto para abrir WhatsApp',
              opciones: [
                { texto: 'YouTube', correcta: false },
                { texto: 'WhatsApp', correcta: true },
                { texto: 'Ajustes', correcta: false }
              ]
            }
          },
          {
            titulo: 'Busca el botón de nuevo chat',
            accion: 'Tocar el icono de mensaje en la esquina inferior derecha',
            simulacion: 'Simulación: Tocar el icono de mensaje en la esquina inferior derecha',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Qué hace este botón?',
              texto: 'El botón de nuevo chat sirve para empezar una conversación nueva o crear un contacto. Normalmente aparece en la esquina inferior derecha para que puedas encontrarlo rápido.'
            },
            juego: {
              instruccion: 'Toca el botón que usarías para iniciar una nueva conversación',
              opciones: [
                { texto: 'Nuevo chat', correcta: true },
                { texto: 'Llamada', correcta: false },
                { texto: 'Galería', correcta: false }
              ]
            }
          },
          {
            titulo: "Selecciona 'Nuevo contacto'",
            accion: "Tocar en 'Nuevo contacto'",
            simulacion: "Simulación: Tocar en 'Nuevo contacto'",
            tipo: 'tap',
            explicacion: {
              titulo: '¿Para qué sirve “Nuevo contacto”?',
              texto: 'La opción “Nuevo contacto” te permite guardar a una persona nueva en tu celular para luego escribirle o llamarle fácilmente. Es útil cuando todavía no tienes guardado su número.'
            },
            juego: {
              instruccion: 'Toca la opción correcta para crear un contacto nuevo',
              opciones: [
                { texto: 'Nuevo grupo', correcta: false },
                { texto: 'Nuevo contacto', correcta: true },
                { texto: 'Configuración', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'enviar-mensaje',
        nombre: 'Enviar un mensaje',
        desc: 'Aprende a enviar un mensaje de texto',
        pasos: [
          {
            titulo: 'Abre un chat',
            accion: 'Tocar un contacto o conversación existente',
            simulacion: 'Simulación: Tocar un chat existente',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Qué es un chat?',
              texto: 'Un chat es la conversación que tienes con una persona o grupo. Para enviar un mensaje, primero debes abrir el chat correcto.'
            },
            juego: {
              instruccion: 'Toca el chat que abrirías para escribir un mensaje',
              opciones: [
                { texto: 'Mamá', correcta: true },
                { texto: 'Cámara', correcta: false },
                { texto: 'Configuración', correcta: false }
              ]
            }
          },
          {
            titulo: 'Escribe tu mensaje',
            accion: 'Escribir un mensaje en la caja de texto',
            simulacion: 'Simulación: Escribir “Hola”',
            tipo: 'input',
            explicacion: {
              titulo: '¿Qué ocurre aquí?',
              texto: 'En la caja de texto escribes lo que quieres decir. Después de escribir, podrás enviarlo con el botón de enviar.'
            },
            juego: {
              instruccion: 'Escribe exactamente la palabra: Hola',
              placeholder: 'Escribe aquí tu mensaje',
              respuestaCorrecta: 'Hola',
              botonTexto: 'Comprobar mensaje'
            }
          },
          {
            titulo: 'Envía el mensaje',
            accion: 'Tocar el botón de enviar',
            simulacion: 'Simulación: Tocar el ícono de enviar',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Qué hace el botón enviar?',
              texto: 'El botón enviar manda el mensaje que acabas de escribir. Normalmente aparece como un avión de papel o flecha.'
            },
            juego: {
              instruccion: 'Toca el botón correcto para enviar el mensaje',
              opciones: [
                { texto: 'Emoji', correcta: false },
                { texto: 'Adjuntar', correcta: false },
                { texto: 'Enviar', correcta: true }
              ]
            }
          }
        ]
      },
      {
        id: 'compartir-foto',
        nombre: 'Compartir una foto',
        desc: 'Aprende a enviar una foto por WhatsApp',
        pasos: [
          {
            titulo: 'Abre un chat',
            accion: 'Seleccionar el chat del contacto al que quieres enviar la foto',
            simulacion: 'Simulación: Tocar una conversación existente',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Por qué primero debes abrir un chat?',
              texto: 'La foto se envía dentro de una conversación. Primero eliges a la persona o grupo, y luego compartes la imagen en ese chat.'
            },
            juego: {
              instruccion: 'Toca el chat correcto para compartir una foto',
              opciones: [
                { texto: 'Abuela', correcta: true },
                { texto: 'Calculadora', correcta: false },
                { texto: 'Bluetooth', correcta: false }
              ]
            }
          },
          {
            titulo: 'Abre el menú de adjuntar',
            accion: 'Tocar el ícono de clip o adjuntar',
            simulacion: 'Simulación: Tocar el ícono de clip',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Qué hace el botón de adjuntar?',
              texto: 'El botón de adjuntar permite enviar archivos como fotos, documentos, ubicación o contactos. En WhatsApp suele verse como un clip.'
            },
            juego: {
              instruccion: 'Toca el botón que usarías para adjuntar una foto',
              opciones: [
                { texto: 'Clip', correcta: true },
                { texto: 'Llamada', correcta: false },
                { texto: 'Emoji', correcta: false }
              ]
            }
          },
          {
            titulo: 'Selecciona y envía la foto',
            accion: 'Elegir una imagen de la galería y tocar enviar',
            simulacion: 'Simulación: Elegir una foto y tocar enviar',
            tipo: 'tap',
            explicacion: {
              titulo: '¿Qué ocurre en este paso?',
              texto: 'Después de abrir la galería, eliges la imagen que quieres compartir. Luego confirmas el envío para que la otra persona la reciba.'
            },
            juego: {
              instruccion: 'Toca la opción que representa la foto que quieres enviar',
              opciones: [
                { texto: 'Foto de cumpleaños', correcta: true },
                { texto: 'Configuración', correcta: false },
                { texto: 'Lista de contactos', correcta: false }
              ]
            }
          }
        ]
      }
    ]
  }
};

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

const buildUserQuery = (nombre, userid) =>
  `nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userid || '')}`;

const getUserContext = (req) => {
  const nombre = req.query.nombre || 'Usuario';
  const userid = req.query.userid || '';
  return {
    nombre,
    userid,
    userQuery: buildUserQuery(nombre, userid)
  };
};

const getCourseData = (courseSlug) => cursos[courseSlug] || null;

const getExerciseData = (courseSlug, exerciseId) => {
  const course = getCourseData(courseSlug);
  if (!course) return null;
  return course.ejercicios.find((e) => e.id === exerciseId) || null;
};

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

function whatsapp(req, res) {
  const { nombre, userid, userQuery } = getUserContext(req);
  const course = getCourseData('whatsapp');

  const completedExerciseId = req.query.done || '';
  const completedCount = completedExerciseId ? 1 : 0;

  const ejercicios = course.ejercicios.map((ejercicio, index) => {
    const isCompleted = completedExerciseId === ejercicio.id;
    const previousCompleted = index === 0 || completedExerciseId === course.ejercicios[index - 1].id || isCompleted;

    return {
      key: ejercicio.id,
      orden: index + 1,
      nombre: ejercicio.nombre,
      desc: ejercicio.desc,
      href: previousCompleted
        ? `/${course.slug}/${ejercicio.id}?${userQuery}`
        : '#',
      completed: isCompleted,
      locked: !previousCompleted
    };
  });

  res.render('whatsapp', {
    title: course.nombre,
    completedCount,
    totalCount: course.ejercicios.length,
    nombre,
    userid,
    volverHref: `/principal?${userQuery}`,
    ejercicios
  });
}

function whatsappExercise(req, res) {
  const { userQuery } = getUserContext(req);
  const exerciseId = req.params.exerciseId;
  const course = getCourseData('whatsapp');
  const exercise = getExerciseData('whatsapp', exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/whatsapp?${userQuery}`);
  }

  res.render('whatsapp_agregar_contacto', {
    title: exercise.nombre,
    modulo: course.nombre,
    totalPasos: exercise.pasos.length,
    volverHref: `/whatsapp?${userQuery}`,
    comenzarHref: `/${course.slug}/${exercise.id}/paso/1?${userQuery}`
  });
}

function whatsappExercisePaso(req, res) {
  const { userQuery } = getUserContext(req);
  const exerciseId = req.params.exerciseId;
  const paso = Number(req.params.n);

  const course = getCourseData('whatsapp');
  const exercise = getExerciseData('whatsapp', exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/whatsapp?${userQuery}`);
  }

  const totalPasos = exercise.pasos.length;
  const currentStep = exercise.pasos[paso - 1];

  if (!currentStep) {
    return res.redirect(`/${course.slug}/${exercise.id}?${userQuery}`);
  }

  const nextHref = paso < totalPasos
    ? `/${course.slug}/${exercise.id}/paso/${paso + 1}?${userQuery}`
    : `/${course.slug}/${exercise.id}/completado?${userQuery}`;

  res.render('whatsapp_agregar_contacto_paso', {
    title: exercise.nombre,
    modulo: course.nombre,
    paso,
    totalPasos,
    progressText: `${paso}/${totalPasos}`,
    volverHref: `/${course.slug}/${exercise.id}?${userQuery}`,
    titulo: currentStep.titulo,
    instruccion: 'Ahora vas a: ',
    accion: currentStep.accion,
    simulacion: currentStep.simulacion,
    tipo: currentStep.tipo || 'info',
    juego: currentStep.juego || null,
    explicacion: currentStep.explicacion || null,
    nextHref
  });
}

function whatsappExerciseCompletado(req, res) {
  const { userQuery } = getUserContext(req);
  const exerciseId = req.params.exerciseId;
  const course = getCourseData('whatsapp');
  const exercise = getExerciseData('whatsapp', exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/whatsapp?${userQuery}`);
  }

  res.render('whatsapp_agregar_contacto_completado', {
    title: exercise.nombre,
    modulo: course.nombre,
    volverHref: `/whatsapp?${userQuery}`,
    continuarHref: `/whatsapp?${userQuery}&done=${exercise.id}`
  });
}

module.exports = {
  principal,
  whatsapp,
  whatsappExercise,
  whatsappExercisePaso,
  whatsappExerciseCompletado,
  addCursoPersonalizado,
  deleteCursoPersonalizado,
  crearResenaCurso
};