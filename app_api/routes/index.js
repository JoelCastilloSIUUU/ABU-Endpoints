const express = require('express');
const router = express.Router();

const ctrlCursos = require('../controllers/cursos');
const ctrlAuth = require('../controllers/auth');
const ctrlResenas = require('../controllers/resenas');

router.post('/register', ctrlAuth.registro);
router.post('/login', ctrlAuth.login);

router
  .route('/users/:userid')
  .get(ctrlAuth.usuarioLeerUno)
  .put(ctrlAuth.usuarioActualizar)
  .delete(ctrlAuth.usuarioBorrar);

router.post('/users/:userid/cursos', ctrlAuth.usuarioInscribirCurso);
router.put('/users/:userid/cursos/:cursoid', ctrlAuth.usuarioActualizarProgreso);
router.delete('/users/:userid/cursos/:cursoid', ctrlAuth.usuarioEliminarCurso);
router.post('/users/:userid/cursos/:cursoid/delete', ctrlAuth.usuarioEliminarCurso);

router
  .route('/cursos')
  .get(ctrlCursos.cursosListar)
  .post(ctrlCursos.cursosCrear);

router
  .route('/cursos/:cursoid')
  .get(ctrlCursos.cursosLeerUno)
  .put(ctrlCursos.cursosActualizar)
  .delete(ctrlCursos.cursosBorrar);

router
  .route('/cursos/:cursoid/resenas')
  .get(ctrlResenas.resenasListar)
  .post(ctrlResenas.resenasCrear);

router
  .route('/cursos/:cursoid/resenas/:resenaid')
  .put(ctrlResenas.resenasActualizar)
  .delete(ctrlResenas.resenasBorrar);

router.get('/cursos/:cursoid/calificacion', ctrlResenas.calificacionCurso);

module.exports = router;