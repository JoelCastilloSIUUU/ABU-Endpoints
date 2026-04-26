const axios = require('axios');

const TOTAL_MODULOS = 6;

const cursos = {
  whatsapp: {
    slug: 'whatsapp',
    nombre: 'WhatsApp',
    color: '#25D366',
    accent: '#1f9f4d',
    light: '#e8f7ee',
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
            imagenRuta: '/images/minijuegos/whatsapp/abrir-whatsapp.png',
            imagenAlt: 'Icono de WhatsApp en la pantalla principal',
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
            imagenRuta: '/images/minijuegos/whatsapp/nuevo-chat.png',
            imagenAlt: 'Botón de nuevo chat en WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/nuevo-contacto.png',
            imagenAlt: 'Opción nuevo contacto en WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/abrir-chat.png',
            imagenAlt: 'Lista de chats en WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/escribir-mensaje.png',
            imagenAlt: 'Caja de texto en un chat de WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/boton-enviar.png',
            imagenAlt: 'Botón de enviar en WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/chat-foto.png',
            imagenAlt: 'Chat de WhatsApp para compartir foto',
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
            imagenRuta: '/images/minijuegos/whatsapp/clip-adjuntar.png',
            imagenAlt: 'Icono de clip para adjuntar archivos en WhatsApp',
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
            imagenRuta: '/images/minijuegos/whatsapp/seleccionar-foto.png',
            imagenAlt: 'Galería abierta para escoger una foto',
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
  },

  youtube: {
    slug: 'youtube',
    nombre: 'YouTube',
    color: '#FF0000',
    accent: '#cc0000',
    light: '#fde8e8',
    icono: 'bi-play-btn-fill',
    ejercicios: [
      {
        id: 'abrir-youtube',
        nombre: 'Abrir YouTube',
        desc: 'Aprende a identificar y abrir la app de YouTube',
        pasos: [
          {
            titulo: 'Identifica el icono de YouTube',
            accion: 'Buscar el icono rojo con triángulo blanco',
            simulacion: 'Simulación: Reconocer el icono correcto de YouTube',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/icono-youtube.png',
            imagenAlt: 'Icono de YouTube en la pantalla principal',
            juego: {
              instruccion: 'Toca la app correcta para abrir YouTube',
              opciones: [
                { texto: 'WhatsApp', correcta: false },
                { texto: 'YouTube', correcta: true },
                { texto: 'Cámara', correcta: false }
              ]
            }
          },
          {
            titulo: 'Abre la aplicación',
            accion: 'Tocar una vez el icono de YouTube',
            simulacion: 'Simulación: Tocar el icono de YouTube',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/abrir-app.png',
            imagenAlt: 'Pantalla de inicio con icono de YouTube',
            explicacion: {
              titulo: '¿Qué pasa al abrirla?',
              texto: 'YouTube abre una lista de videos recomendados y te permite buscar temas, canales y música.'
            },
            juego: {
              instruccion: '¿Qué acción abre la app?',
              opciones: [
                { texto: 'Tocar una vez', correcta: true },
                { texto: 'Mantener presionado', correcta: false },
                { texto: 'Arrastrar', correcta: false }
              ]
            }
          },
          {
            titulo: 'Reconoce la pantalla principal',
            accion: 'Observar videos, menú y barra de búsqueda',
            simulacion: 'Simulación: Mirar la pantalla principal de YouTube',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/pantalla-principal.png',
            imagenAlt: 'Pantalla principal de YouTube',
            juego: {
              instruccion: 'Toca el elemento que sí aparece en la pantalla principal de YouTube',
              opciones: [
                { texto: 'Videos recomendados', correcta: true },
                { texto: 'Teclado numérico', correcta: false },
                { texto: 'Linterna', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'buscar-video',
        nombre: 'Buscar un video',
        desc: 'Aprende a usar la barra de búsqueda en YouTube',
        pasos: [
          {
            titulo: 'Ubica la lupa o barra de búsqueda',
            accion: 'Tocar el icono de búsqueda',
            simulacion: 'Simulación: Tocar la lupa en YouTube',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/lupa-busqueda.png',
            imagenAlt: 'Icono de búsqueda en YouTube',
            juego: {
              instruccion: 'Toca el botón que usarías para buscar un video',
              opciones: [
                { texto: 'Buscar', correcta: true },
                { texto: 'Suscripciones', correcta: false },
                { texto: 'Inicio', correcta: false }
              ]
            }
          },
          {
            titulo: 'Escribe lo que quieres ver',
            accion: 'Escribir el nombre del video o tema',
            simulacion: 'Simulación: Escribir “Recetas fáciles”',
            tipo: 'input',
            imagenRuta: '/images/minijuegos/youtube/escribir-busqueda.png',
            imagenAlt: 'Barra de búsqueda de YouTube con teclado',
            explicacion: {
              titulo: '¿Qué conviene escribir?',
              texto: 'Puedes escribir una canción, una receta, una noticia o cualquier tema que quieras aprender o mirar.'
            },
            juego: {
              instruccion: 'Escribe exactamente: Recetas fáciles',
              placeholder: 'Escribe aquí tu búsqueda',
              respuestaCorrecta: 'Recetas fáciles',
              botonTexto: 'Comprobar búsqueda'
            }
          },
          {
            titulo: 'Selecciona un resultado',
            accion: 'Tocar el video que quieres reproducir',
            simulacion: 'Simulación: Elegir un video de la lista',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/resultados-busqueda.png',
            imagenAlt: 'Resultados de búsqueda en YouTube',
            juego: {
              instruccion: 'Toca el elemento que representa un video para verlo',
              opciones: [
                { texto: 'Miniatura del video', correcta: true },
                { texto: 'Botón de apagar', correcta: false },
                { texto: 'Wi-Fi', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'reproducir-video',
        nombre: 'Reproducir un video',
        desc: 'Aprende a pausar, continuar y usar pantalla completa',
        pasos: [
          {
            titulo: 'Reproduce el video',
            accion: 'Tocar el video elegido para abrirlo',
            simulacion: 'Simulación: Abrir un video en YouTube',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/abrir-video.png',
            imagenAlt: 'Video abierto en YouTube',
            juego: {
              instruccion: 'Toca la acción que sirve para empezar a ver el video',
              opciones: [
                { texto: 'Abrir el video', correcta: true },
                { texto: 'Cerrar la app', correcta: false },
                { texto: 'Borrar historial', correcta: false }
              ]
            }
          },
          {
            titulo: 'Pausa o continúa',
            accion: 'Tocar una vez la pantalla para ver los controles',
            simulacion: 'Simulación: Pausar y seguir reproduciendo',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/pausar-video.png',
            imagenAlt: 'Controles de reproducción en YouTube',
            juego: {
              instruccion: 'Toca el control que detiene el video momentáneamente',
              opciones: [
                { texto: 'Pausa', correcta: true },
                { texto: 'Buscar', correcta: false },
                { texto: 'Compartir', correcta: false }
              ]
            }
          },
          {
            titulo: 'Usa pantalla completa',
            accion: 'Tocar el icono para ampliar el video',
            simulacion: 'Simulación: Activar pantalla completa',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/youtube/pantalla-completa.png',
            imagenAlt: 'Icono de pantalla completa en YouTube',
            juego: {
              instruccion: 'Toca la opción que hace el video más grande',
              opciones: [
                { texto: 'Pantalla completa', correcta: true },
                { texto: 'Inicio', correcta: false },
                { texto: 'Notificaciones', correcta: false }
              ]
            }
          }
        ]
      }
    ]
  },

  camara: {
    slug: 'camara',
    nombre: 'Cámara',
    color: '#8E44AD',
    accent: '#6f2d91',
    light: '#f4e8fb',
    icono: 'bi-camera-fill',
    ejercicios: [
      {
        id: 'abrir-camara',
        nombre: 'Abrir la cámara',
        desc: 'Aprende a identificar y abrir la app de cámara',
        pasos: [
          {
            titulo: 'Identifica el icono de cámara',
            accion: 'Buscar el icono de una cámara en la pantalla',
            simulacion: 'Simulación: Reconocer el icono correcto de cámara',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/icono-camara.png',
            imagenAlt: 'Icono de la app Cámara',
            juego: {
              instruccion: 'Toca la app correcta para abrir la cámara',
              opciones: [
                { texto: 'Galería', correcta: false },
                { texto: 'Cámara', correcta: true },
                { texto: 'WhatsApp', correcta: false }
              ]
            }
          },
          {
            titulo: 'Abre la aplicación',
            accion: 'Tocar una vez el icono de cámara',
            simulacion: 'Simulación: Tocar el icono de cámara',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/abrir-app.png',
            imagenAlt: 'Pantalla de inicio con icono de cámara',
            juego: {
              instruccion: '¿Qué acción abre la cámara?',
              opciones: [
                { texto: 'Tocar una vez', correcta: true },
                { texto: 'Deslizar hacia abajo', correcta: false },
                { texto: 'Abrir ajustes', correcta: false }
              ]
            }
          },
          {
            titulo: 'Reconoce el botón de tomar foto',
            accion: 'Buscar el botón circular grande',
            simulacion: 'Simulación: Ubicar el botón de disparo',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/boton-disparo.png',
            imagenAlt: 'Botón circular para tomar foto',
            juego: {
              instruccion: 'Toca el botón que sirve para tomar una foto',
              opciones: [
                { texto: 'Disparador', correcta: true },
                { texto: 'Flash', correcta: false },
                { texto: 'Zoom', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'tomar-foto',
        nombre: 'Tomar una foto',
        desc: 'Aprende a encuadrar y capturar una foto',
        pasos: [
          {
            titulo: 'Apunta la cámara al objeto',
            accion: 'Dirigir el celular hacia lo que quieres fotografiar',
            simulacion: 'Simulación: Enfocar un objeto con la cámara',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/apuntar-objeto.png',
            imagenAlt: 'Pantalla de cámara apuntando a un objeto',
            explicacion: {
              titulo: '¿Qué significa encuadrar?',
              texto: 'Encuadrar es acomodar lo que quieres fotografiar dentro de la pantalla antes de tomar la foto.'
            },
            juego: {
              instruccion: 'Toca la acción correcta antes de tomar la foto',
              opciones: [
                { texto: 'Apuntar al objeto', correcta: true },
                { texto: 'Cerrar la cámara', correcta: false },
                { texto: 'Llamar a alguien', correcta: false }
              ]
            }
          },
          {
            titulo: 'Mantén el celular estable',
            accion: 'Sujetar el celular sin moverlo demasiado',
            simulacion: 'Simulación: Sujetar el teléfono con firmeza',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/sujetar-estable.png',
            imagenAlt: 'Manos sosteniendo el celular para una foto',
            juego: {
              instruccion: '¿Qué ayuda a que la foto no salga movida?',
              opciones: [
                { texto: 'Mantenerlo estable', correcta: true },
                { texto: 'Tapar la cámara', correcta: false },
                { texto: 'Apagar la pantalla', correcta: false }
              ]
            }
          },
          {
            titulo: 'Toma la foto',
            accion: 'Tocar el botón circular de disparo',
            simulacion: 'Simulación: Presionar el botón para tomar la foto',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/tomar-foto.png',
            imagenAlt: 'Botón de tomar foto presionado',
            juego: {
              instruccion: 'Toca el botón correcto para capturar la imagen',
              opciones: [
                { texto: 'Disparador', correcta: true },
                { texto: 'Atrás', correcta: false },
                { texto: 'Galería', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'ver-foto',
        nombre: 'Ver la foto tomada',
        desc: 'Aprende a revisar una foto en la galería rápida de la cámara',
        pasos: [
          {
            titulo: 'Busca la miniatura de la foto',
            accion: 'Ubicar la imagen pequeña que aparece en la esquina',
            simulacion: 'Simulación: Ver la miniatura de la última foto',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/miniatura-foto.png',
            imagenAlt: 'Miniatura de foto en la cámara',
            juego: {
              instruccion: 'Toca el elemento que te deja ver la última foto tomada',
              opciones: [
                { texto: 'Miniatura', correcta: true },
                { texto: 'Flash', correcta: false },
                { texto: 'Temporizador', correcta: false }
              ]
            }
          },
          {
            titulo: 'Abre la foto',
            accion: 'Tocar la miniatura para abrir la imagen',
            simulacion: 'Simulación: Abrir la foto recién tomada',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/abrir-foto.png',
            imagenAlt: 'Foto abierta desde la cámara',
            juego: {
              instruccion: '¿Qué acción te muestra la foto completa?',
              opciones: [
                { texto: 'Tocar la miniatura', correcta: true },
                { texto: 'Cerrar la app', correcta: false },
                { texto: 'Volver al menú', correcta: false }
              ]
            }
          },
          {
            titulo: 'Confirma si salió bien',
            accion: 'Revisar si la foto se ve clara y centrada',
            simulacion: 'Simulación: Mirar si la foto salió bien',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/camara/revisar-foto.png',
            imagenAlt: 'Persona revisando si una foto salió bien',
            juego: {
              instruccion: 'Toca la señal de que la foto quedó bien',
              opciones: [
                { texto: 'Se ve clara', correcta: true },
                { texto: 'Pantalla negra', correcta: false },
                { texto: 'No se abre', correcta: false }
              ]
            }
          }
        ]
      }
    ]
  },

  llamadas: {
    slug: 'llamadas',
    nombre: 'Llamadas',
    color: '#00BFA5',
    accent: '#009e88',
    light: '#e5fbf7',
    icono: 'bi-telephone-fill',
    ejercicios: [
      {
        id: 'abrir-telefono',
        nombre: 'Abrir la app Teléfono',
        desc: 'Aprende a identificar y abrir la app de llamadas',
        pasos: [
          {
            titulo: 'Identifica el icono de teléfono',
            accion: 'Buscar el icono con forma de auricular',
            simulacion: 'Simulación: Reconocer el icono de teléfono',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/icono-telefono.png',
            imagenAlt: 'Icono de Teléfono en la pantalla principal',
            juego: {
              instruccion: 'Toca la app correcta para hacer llamadas',
              opciones: [
                { texto: 'Teléfono', correcta: true },
                { texto: 'YouTube', correcta: false },
                { texto: 'Cámara', correcta: false }
              ]
            }
          },
          {
            titulo: 'Abre la aplicación',
            accion: 'Tocar una vez el icono de Teléfono',
            simulacion: 'Simulación: Tocar el icono de Teléfono',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/abrir-telefono.png',
            imagenAlt: 'Pantalla de inicio con la app Teléfono',
            juego: {
              instruccion: '¿Qué acción abre la app de llamadas?',
              opciones: [
                { texto: 'Tocar una vez', correcta: true },
                { texto: 'Girar el celular', correcta: false },
                { texto: 'Subir volumen', correcta: false }
              ]
            }
          },
          {
            titulo: 'Reconoce las opciones principales',
            accion: 'Observar teclado, recientes y contactos',
            simulacion: 'Simulación: Mirar la pantalla principal de Teléfono',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/pantalla-telefono.png',
            imagenAlt: 'Pantalla principal de la app Teléfono',
            juego: {
              instruccion: 'Toca una opción que sí aparece en la app Teléfono',
              opciones: [
                { texto: 'Teclado numérico', correcta: true },
                { texto: 'Filtro de fotos', correcta: false },
                { texto: 'Subtítulos', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'marcar-numero',
        nombre: 'Marcar un número',
        desc: 'Aprende a usar el teclado para hacer una llamada',
        pasos: [
          {
            titulo: 'Abre el teclado',
            accion: 'Tocar la opción de teclado o marcador',
            simulacion: 'Simulación: Abrir el teclado numérico',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/abrir-teclado.png',
            imagenAlt: 'Teclado numérico de la app Teléfono',
            juego: {
              instruccion: 'Toca la opción que sirve para escribir un número',
              opciones: [
                { texto: 'Teclado', correcta: true },
                { texto: 'Galería', correcta: false },
                { texto: 'Cámara', correcta: false }
              ]
            }
          },
          {
            titulo: 'Escribe el número',
            accion: 'Tocar los números en pantalla',
            simulacion: 'Simulación: Escribir 099',
            tipo: 'input',
            imagenRuta: '/images/minijuegos/llamadas/escribir-numero.png',
            imagenAlt: 'Teclado de llamadas para escribir un número',
            explicacion: {
              titulo: '¿Para qué sirve este paso?',
              texto: 'Aquí marcas manualmente el número de la persona a la que quieres llamar si todavía no está guardada en tus contactos.'
            },
            juego: {
              instruccion: 'Escribe exactamente: 099',
              placeholder: 'Escribe aquí el número',
              respuestaCorrecta: '099',
              botonTexto: 'Comprobar número'
            }
          },
          {
            titulo: 'Presiona llamar',
            accion: 'Tocar el botón verde con auricular',
            simulacion: 'Simulación: Iniciar la llamada',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/boton-llamar.png',
            imagenAlt: 'Botón verde para llamar',
            juego: {
              instruccion: 'Toca el botón que inicia la llamada',
              opciones: [
                { texto: 'Llamar', correcta: true },
                { texto: 'Borrar', correcta: false },
                { texto: 'Volver', correcta: false }
              ]
            }
          }
        ]
      },
      {
        id: 'llamar-contacto',
        nombre: 'Llamar a un contacto',
        desc: 'Aprende a usar tu lista de contactos para llamar más rápido',
        pasos: [
          {
            titulo: 'Abre la pestaña de contactos',
            accion: 'Tocar la sección Contactos',
            simulacion: 'Simulación: Entrar a la lista de contactos',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/pestana-contactos.png',
            imagenAlt: 'Pestaña de contactos en la app Teléfono',
            juego: {
              instruccion: 'Toca la opción donde verías tus contactos guardados',
              opciones: [
                { texto: 'Contactos', correcta: true },
                { texto: 'Ajustes', correcta: false },
                { texto: 'Bluetooth', correcta: false }
              ]
            }
          },
          {
            titulo: 'Busca a la persona',
            accion: 'Tocar el nombre del contacto',
            simulacion: 'Simulación: Elegir un contacto de la lista',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/elegir-contacto.png',
            imagenAlt: 'Lista de contactos guardados',
            juego: {
              instruccion: 'Toca el nombre de la persona a la que llamarías',
              opciones: [
                { texto: 'María', correcta: true },
                { texto: 'Linterna', correcta: false },
                { texto: 'Wi-Fi', correcta: false }
              ]
            }
          },
          {
            titulo: 'Inicia la llamada',
            accion: 'Tocar el icono de teléfono del contacto',
            simulacion: 'Simulación: Llamar a un contacto guardado',
            tipo: 'tap',
            imagenRuta: '/images/minijuegos/llamadas/llamar-contacto.png',
            imagenAlt: 'Botón para llamar desde un contacto',
            juego: {
              instruccion: 'Toca la acción correcta para llamar a ese contacto',
              opciones: [
                { texto: 'Icono de teléfono', correcta: true },
                { texto: 'Editar contacto', correcta: false },
                { texto: 'Borrar contacto', correcta: false }
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
  { slug: 'whatsapp', nombre: 'WhatsApp', desc: 'Envía mensajes, fotos y audios a tus seres queridos', icono: 'bi-chat-left-text-fill', color: '#25D366' },
  { slug: 'youtube', nombre: 'YouTube', desc: 'Mira videos, busca contenido y guarda tus favoritos', icono: 'bi-play-btn-fill', color: '#FF0000' },
  { slug: 'camara', nombre: 'Cámara', desc: 'Toma fotos, guárdalas y compártelas fácilmente', icono: 'bi-camera-fill', color: '#833AB4' },
  { slug: 'navegador', nombre: 'Navegador', desc: 'Busca información en internet de forma segura', icono: 'bi-globe', color: '#0D6EFD' },
  { slug: 'ajustes', nombre: 'Ajustes', desc: 'Personaliza tu celular y maneja la configuración', icono: 'bi-gear-fill', color: '#6C757D' },
  { slug: 'llamadas', nombre: 'Llamadas', desc: 'Realiza y recibe llamadas, gestiona tus contactos', icono: 'bi-telephone-fill', color: '#00BFA5' }
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

const resolveModulo = (req) => req.params.modulo || req.path.split('/').filter(Boolean)[0] || '';

const getCourseData = (courseSlug) => cursos[courseSlug] || null;

const getExerciseData = (courseSlug, exerciseId) => {
  const course = getCourseData(courseSlug);
  if (!course) return null;
  return course.ejercicios.find((e) => e.id === exerciseId) || null;
};

const countCompletedModules = (progresoModulos = {}) => {
  const keys = ['whatsapp', 'youtube', 'camara', 'navegador', 'ajustes', 'llamadas'];
  return keys.filter((key) => progresoModulos?.[key]?.completado).length;
};

async function fetchUserAndReviews(req, userId) {
  if (!userId) {
    return { usuario: null, cursosActivos: [], reviewsByCourse: {} };
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

async function fetchModuleProgress(req, userId, modulo) {
  if (!userId) {
    return {
      ejerciciosCompletados: [],
      completado: false
    };
  }

  try {
    const response = await axios.get(`${getApiBase(req)}/users/${userId}/progreso/${modulo}`);
    return response.data.progreso || { ejerciciosCompletados: [], completado: false };
  } catch (_err) {
    return { ejerciciosCompletados: [], completado: false };
  }
}

function normalizeSlug(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildManagedCourse(curso, userNombre, userid) {
  const cursoId = curso.cursoId || curso._id;
  const nombreCurso = curso.nombreCurso || curso.nombre || 'Curso personalizado';
  const isDynamic = !COURSE_META[nombreCurso];

  const href = isDynamic
    ? `/cursos/${cursoId}?nombre=${encodeURIComponent(userNombre || 'Usuario')}&userid=${encodeURIComponent(userid || '')}`
    : `/${normalizeSlug(nombreCurso)}?nombre=${encodeURIComponent(userNombre || 'Usuario')}&userid=${encodeURIComponent(userid || '')}`;

  return {
    ...curso,
    cursoId,
    nombreCurso,
    progreso: curso.progreso || 0,
    href,
    meta: COURSE_META[nombreCurso] || {
      color: curso.color_hex || curso.color || '#FF8C00',
      icono: curso.icono || 'bi-bookmark-fill'
    }
  };
}

function mapCreatedCourseCard(curso, userNombre, userid) {
  return {
    cursoId: curso._id || curso.cursoId,
    nombre: curso.nombre || curso.nombreCurso || 'Curso personalizado',
    desc: curso.descripcion || curso.desc || 'Curso personalizado creado por ti',
    color: curso.color_hex || curso.color || '#FF8C00',
    icono: curso.icono || 'bi-bookmark-fill',
    slug: `cursos/${curso._id || curso.cursoId}`,
    href: `/cursos/${curso._id || curso.cursoId}?nombre=${encodeURIComponent(userNombre || 'Usuario')}&userid=${encodeURIComponent(userid || '')}`
  };
}

async function fetchCreatedCourses(req, userId) {
  if (!userId) return [];

  try {
    const response = await axios.get(`${getApiBase(req)}/cursos`, {
      params: {
        creador: userId,
        origen: 'dynamic'
      }
    });

    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data?.cursos)) return response.data.cursos;
    if (Array.isArray(response.data?.data)) return response.data.data;

    return [];
  } catch (_err) {
    return [];
  }
}

const principal = async (req, res) => {
  const nombre = req.query.nombre || 'Usuario';
  const userid = req.query.userid || '';
  const userNombre = nombre;
  const success = req.query.success || '';
  const error = req.query.error || '';

  let cursosActivos = [];
  let cursosCreados = [];
  let cursosDisponibles = [];
  let reviewsByCourse = {};
  let progeso = `0/${TOTAL_MODULOS}`;

  if (userid) {
    try {
      const userData = await fetchUserAndReviews(req, userid);
      const createdCourses = await fetchCreatedCourses(req, userid);

      cursosActivos = (userData.cursosActivos || []).map((curso) =>
        buildManagedCourse(curso, userNombre, userid)
      );

      cursosCreados = (createdCourses || []).map((curso) =>
        mapCreatedCourseCard(curso, userNombre, userid)
      );

      cursosDisponibles = [
        ...learningModules.map((modulo) => ({
          tipo: 'static',
          nombreCurso: modulo.nombre,
          label: modulo.nombre
        })),
        ...cursosCreados.map((curso) => ({
          tipo: 'dynamic',
          cursoId: curso.cursoId,
          nombreCurso: curso.nombre,
          label: curso.nombre
        }))
      ];

      reviewsByCourse = userData.reviewsByCourse || {};

      const completedModules = countCompletedModules(userData.usuario?.progresoModulos || {});
      progeso = `${completedModules}/${TOTAL_MODULOS}`;
    } catch (err) {
      return res.render('principal', {
        title: `¡Hola, ${nombre}!`,
        subtitle: 'Sigamos aprendiendo juntos',
        progeso,
        seccionTitulo: 'Tu camino de aprendizaje',
        seccionDesc: 'Elige un tema para comenzar. Cada módulo tiene 3 ejercicios prácticos. Aprenderás haciendo, sin prisa y con ejemplos claros.',
        modulos: learningModules,
        userid,
        userNombre,
        cursosActivos: [],
        cursosCreados: [],
        cursosDisponibles: [],
        reviewsByCourse: {},
        error: err.response?.data?.mensaje || 'No se pudo cargar la información del usuario'
      });
    }
  }

  res.render('principal', {
    title: `¡Hola, ${nombre}!`,
    subtitle: 'Sigamos aprendiendo juntos',
    progeso,
    seccionTitulo: 'Tu camino de aprendizaje',
    seccionDesc: 'Elige un tema para comenzar. Cada módulo tiene 3 ejercicios prácticos. Aprenderás haciendo, sin prisa y con ejemplos claros.',
    modulos: learningModules,
    userid,
    userNombre,
    success,
    error,
    cursosActivos,
    cursosCreados,
    cursosDisponibles,
    reviewsByCourse
  });
};

const addCursoPersonalizado = async (req, res) => {
  const { userId, nombre, nombreCurso, cursoId } = req.body;

  if (!userId || (!nombreCurso && !cursoId)) {
    return res.redirect(`/principal?nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userId || '')}&error=${encodeURIComponent('Selecciona un curso válido')}`);
  }

  try {
    const payload = cursoId
      ? { cursoId }
      : { nombreCurso };

    await axios.post(`${getApiBase(req)}/users/${userId}/cursos`, payload);

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

async function moduleHome(req, res) {
  const { nombre, userid, userQuery } = getUserContext(req);
  const modulo = resolveModulo(req);
  const course = getCourseData(modulo);

  if (!course) {
    return res.redirect(`/principal?${userQuery}`);
  }

  const moduleProgress = await fetchModuleProgress(req, userid, modulo);
  const completedIds = moduleProgress.ejerciciosCompletados || [];
  const completedCount = completedIds.length;

  const ejercicios = course.ejercicios.map((ejercicio, index) => {
    const isCompleted = completedIds.includes(ejercicio.id);
    const isUnlocked = index <= completedCount;

    return {
      key: ejercicio.id,
      orden: index + 1,
      nombre: ejercicio.nombre,
      desc: ejercicio.desc,
      href: isUnlocked ? `/${course.slug}/${ejercicio.id}?${userQuery}` : '#',
      completed: isCompleted,
      locked: !isUnlocked
    };
  });

  res.render('whatsapp', {
    title: course.nombre,
    completedCount,
    totalCount: course.ejercicios.length,
    nombre,
    userid,
    volverHref: `/principal?${userQuery}`,
    ejercicios,
    themeColor: course.color,
    themeAccent: course.accent,
    themeLight: course.light,
    themeIcon: course.icono
  });
}

function moduleExercise(req, res) {
  const { userQuery } = getUserContext(req);
  const modulo = resolveModulo(req);
  const { exerciseId } = req.params;
  const course = getCourseData(modulo);
  const exercise = getExerciseData(modulo, exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/${modulo}?${userQuery}`);
  }

  res.render('whatsapp_agregar_contacto', {
    title: exercise.nombre,
    modulo: course.nombre,
    totalPasos: exercise.pasos.length,
    volverHref: `/${modulo}?${userQuery}`,
    comenzarHref: `/${course.slug}/${exercise.id}/paso/1?${userQuery}`,
    themeColor: course.color,
    themeAccent: course.accent,
    themeLight: course.light,
    themeIcon: course.icono
  });
}

function moduleExercisePaso(req, res) {
  const { userQuery } = getUserContext(req);
  const modulo = resolveModulo(req);
  const { exerciseId } = req.params;
  const paso = Number(req.params.n);

  const course = getCourseData(modulo);
  const exercise = getExerciseData(modulo, exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/${modulo}?${userQuery}`);
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
    imagenRuta: currentStep.imagenRuta || null,
    imagenAlt: currentStep.imagenAlt || 'Imagen de apoyo del minijuego',
    videoUrl: currentStep.videoUrl || '',
    nextHref,
    themeColor: course.color,
    themeAccent: course.accent,
    themeLight: course.light,
    themeIcon: course.icono
  });
}

async function moduleExerciseCompletado(req, res) {
  const { userid, userQuery } = getUserContext(req);
  const modulo = resolveModulo(req);
  const { exerciseId } = req.params;
  const course = getCourseData(modulo);
  const exercise = getExerciseData(modulo, exerciseId);

  if (!course || !exercise) {
    return res.redirect(`/${modulo}?${userQuery}`);
  }

  if (userid) {
    try {
      await axios.post(`${getApiBase(req)}/users/${userid}/progreso/${modulo}/${exercise.id}`);
    } catch (_err) {}
  }

  res.render('whatsapp_agregar_contacto_completado', {
    title: exercise.nombre,
    modulo: course.nombre,
    continuarHref: `/${modulo}?${userQuery}`,
    volverHref: `/${modulo}?${userQuery}`,
    themeColor: course.color,
    themeAccent: course.accent,
    themeLight: course.light,
    themeIcon: course.icono
  });
}

async function fetchDynamicCourse(req, cursoid) {
  const response = await axios.get(`${getApiBase(req)}/cursos/${cursoid}`);
  return response.data;
}

async function fetchDynamicCourseProgress(req, userid, cursoid) {
  if (!userid) {
    return {
      ejerciciosCompletados: [],
      porcentaje: 0,
      completado: false
    };
  }

  try {
    const response = await axios.get(`${getApiBase(req)}/users/${userid}/progreso/cursos/${cursoid}`);
    return response.data.progreso || {
      ejerciciosCompletados: [],
      porcentaje: 0,
      completado: false
    };
  } catch (_err) {
    return {
      ejerciciosCompletados: [],
      porcentaje: 0,
      completado: false
    };
  }
}

function mapDynamicCourseToViewModel(courseDoc) {
  return {
    _id: courseDoc._id,
    slug: `cursos/${courseDoc._id}`,
    nombre: courseDoc.nombre,
    color: courseDoc.color_hex || '#FF8C00',
    accent: '#D35400',
    light: '#FFF5E6',
    icono: courseDoc.icono || 'bi-bookmark-fill',
    ejercicios: (courseDoc.ejercicios || [])
      .sort((a, b) => a.orden - b.orden)
      .map((e) => ({
        id: String(e._id),
        nombre: e.titulo,
        desc: e.descripcion || e.pregunta,
        pasos: [
          {
            titulo: e.titulo,
            accion: e.pregunta,
            simulacion: 'Completa el ejercicio correctamente',
            tipo: e.tipo === 'multiple' ? 'tap' : 'input',
            videoUrl: e.videoUrl || '',
            imagenRuta: e.imagenUrl || '',
            imagenAlt: e.titulo || 'Imagen de apoyo',
            juego: e.tipo === 'multiple'
              ? {
                  instruccion: e.pregunta,
                  opciones: (e.opciones || []).map((op) => ({
                    texto: op.texto,
                    correcta: op.texto === e.respuestaCorrecta
                  }))
                }
              : {
                  instruccion: e.pregunta,
                  placeholder: 'Escribe tu respuesta',
                  respuestaCorrecta: e.respuestaCorrecta,
                  botonTexto: 'Comprobar'
                }
          }
        ]
      }))
  };
}

const formCrearCurso = (req, res) => {
  const nombre = req.query.nombre || 'Usuario';
  const userid = req.query.userid || '';

  if (!userid) {
    return res.redirect('/?error=Debes iniciar sesión');
  }

  res.render('crear_curso', {
    title: 'Crear curso',
    userid,
    userNombre: nombre,
    curso: null,
    modoEdicion: false
  });
};

const formEditarCurso = async (req, res) => {
  const nombre = req.query.nombre || 'Usuario';
  const userid = req.query.userid || '';
  const { cursoid } = req.params;

  if (!userid) {
    return res.redirect('/?error=Debes iniciar sesión');
  }

  try {
    const response = await axios.get(`${getApiBase(req)}/cursos/${cursoid}`);
    const curso = response.data;

    res.render('crear_curso', {
      title: 'Editar curso',
      userid,
      userNombre: nombre,
      curso,
      modoEdicion: true
    });
  } catch (_err) {
    return res.redirect(`/principal?nombre=${encodeURIComponent(nombre)}&userid=${encodeURIComponent(userid)}&error=${encodeURIComponent('No se pudo cargar el curso para editar')}`);
  }
};

const crearCursoDinamico = async (req, res) => {
  try {
    const payload = req.body;
    const response = await axios.post(`${getApiBase(req)}/cursos`, payload);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      mensaje: err.response?.data?.mensaje || 'No se pudo crear el curso'
    });
  }
};

async function dynamicCourseHome(req, res) {
  const { nombre, userid, userQuery } = getUserContext(req);
  const { cursoid } = req.params;

  try {
    const courseDoc = await fetchDynamicCourse(req, cursoid);
    const course = mapDynamicCourseToViewModel(courseDoc);
    const progress = await fetchDynamicCourseProgress(req, userid, cursoid);

    const completedIds = (progress.ejerciciosCompletados || []).map(String);
    const completedCount = completedIds.length;

    const ejercicios = course.ejercicios.map((ejercicio, index) => {
      const isCompleted = completedIds.includes(String(ejercicio.id));
      const isUnlocked = index <= completedCount;

      return {
        key: ejercicio.id,
        orden: index + 1,
        nombre: ejercicio.nombre,
        desc: ejercicio.desc,
        href: isUnlocked ? `/${course.slug}/${ejercicio.id}?${userQuery}` : '#',
        completed: isCompleted,
        locked: !isUnlocked
      };
    });

    res.render('whatsapp', {
      title: course.nombre,
      completedCount,
      totalCount: course.ejercicios.length,
      nombre,
      userid,
      volverHref: `/principal?${userQuery}`,
      ejercicios,
      themeColor: course.color,
      themeAccent: course.accent,
      themeLight: course.light,
      themeIcon: course.icono
    });
  } catch (_err) {
    res.redirect(`/principal?${userQuery}&error=${encodeURIComponent('No se pudo abrir el curso dinámico')}`);
  }
}

async function dynamicCourseExercise(req, res) {
  const { userQuery } = getUserContext(req);
  const { cursoid, exerciseId } = req.params;

  try {
    const courseDoc = await fetchDynamicCourse(req, cursoid);
    const course = mapDynamicCourseToViewModel(courseDoc);
    const exercise = course.ejercicios.find((e) => String(e.id) === String(exerciseId));

    if (!exercise) {
      return res.redirect(`/${course.slug}?${userQuery}`);
    }

    res.render('whatsapp_agregar_contacto', {
      title: exercise.nombre,
      modulo: course.nombre,
      totalPasos: exercise.pasos.length,
      volverHref: `/${course.slug}?${userQuery}`,
      comenzarHref: `/${course.slug}/${exercise.id}/paso/1?${userQuery}`,
      themeColor: course.color,
      themeAccent: course.accent,
      themeLight: course.light,
      themeIcon: course.icono
    });
  } catch (_err) {
    res.redirect(`/principal?${userQuery}`);
  }
}

async function dynamicCoursePaso(req, res) {
  const { userQuery } = getUserContext(req);
  const { cursoid, exerciseId } = req.params;
  const paso = Number(req.params.n);

  try {
    const courseDoc = await fetchDynamicCourse(req, cursoid);
    const course = mapDynamicCourseToViewModel(courseDoc);
    const exercise = course.ejercicios.find((e) => String(e.id) === String(exerciseId));

    if (!exercise) {
      return res.redirect(`/${course.slug}?${userQuery}`);
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
      imagenRuta: currentStep.imagenRuta || null,
      imagenAlt: currentStep.imagenAlt || 'Imagen de apoyo del minijuego',
      videoUrl: currentStep.videoUrl || '',
      nextHref,
      themeColor: course.color,
      themeAccent: course.accent,
      themeLight: course.light,
      themeIcon: course.icono
    });
  } catch (_err) {
    res.redirect(`/principal?${userQuery}`);
  }
}

async function dynamicCourseCompletado(req, res) {
  const { userid, userQuery } = getUserContext(req);
  const { cursoid, exerciseId } = req.params;

  try {
    const courseDoc = await fetchDynamicCourse(req, cursoid);
    const course = mapDynamicCourseToViewModel(courseDoc);
    const exercise = course.ejercicios.find((e) => String(e.id) === String(exerciseId));

    if (!exercise) {
      return res.redirect(`/${course.slug}?${userQuery}`);
    }

    if (userid) {
      try {
        await axios.post(`${getApiBase(req)}/users/${userid}/progreso/cursos/${cursoid}/${exercise.id}`);
      } catch (_err) {}
    }

    res.render('whatsapp_agregar_contacto_completado', {
      title: exercise.nombre,
      modulo: course.nombre,
      continuarHref: `/${course.slug}?${userQuery}`,
      volverHref: `/${course.slug}?${userQuery}`,
      themeColor: course.color,
      themeAccent: course.accent,
      themeLight: course.light,
      themeIcon: course.icono
    });
  } catch (_err) {
    res.redirect(`/principal?${userQuery}`);
  }
}

module.exports = {
  principal,
  whatsapp: moduleHome,
  whatsappExercise: moduleExercise,
  whatsappExercisePaso: moduleExercisePaso,
  whatsappExerciseCompletado: moduleExerciseCompletado,
  moduleHome,
  moduleExercise,
  moduleExercisePaso,
  moduleExerciseCompletado,
  addCursoPersonalizado,
  deleteCursoPersonalizado,
  crearResenaCurso,
  formCrearCurso,
  formEditarCurso,
  crearCursoDinamico,
  dynamicCourseHome,
  dynamicCourseExercise,
  dynamicCoursePaso,
  dynamicCourseCompletado
};