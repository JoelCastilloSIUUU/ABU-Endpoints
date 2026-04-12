const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlAuth = require('../controllers/auth');
const ctrlContenidos = require('../controllers/contenidos');

// Módulos permitidos
const modulosPermitidos = ['whatsapp', 'youtube', 'camara', 'llamadas'];

// Middleware para validar el parámetro :modulo
function validarModulo(req, res, next) {
  const { modulo } = req.params;

  if (!modulosPermitidos.includes(modulo)) {
    return res.status(404).send('Módulo no válido');
  }

  next();
}

router.get('/', ctrlAuth.login);
router.get('/registro', ctrlAuth.registro);
router.get('/principal', ctrlContenidos.principal);

router.post('/login', ctrlAuth.doLogin);
router.post('/register', ctrlAuth.doRegister);
router.post('/principal/cursos', ctrlContenidos.addCursoPersonalizado);
router.post('/principal/cursos/:cursoid/delete', ctrlContenidos.deleteCursoPersonalizado);
router.post('/principal/cursos/:cursoid/resenas', ctrlContenidos.crearResenaCurso);

// Rutas de módulos
router.get('/:modulo', validarModulo, ctrlContenidos.moduleHome);
router.get('/:modulo/:exerciseId', validarModulo, ctrlContenidos.moduleExercise);
router.get('/:modulo/:exerciseId/paso/:n', validarModulo, ctrlContenidos.moduleExercisePaso);
router.get('/:modulo/:exerciseId/completado', validarModulo, ctrlContenidos.moduleExerciseCompletado);

module.exports = router;