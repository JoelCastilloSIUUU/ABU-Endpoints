const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

const ctrlAuth = require('../controllers/auth');
const ctrlContenidos = require('../controllers/contenidos');

router.get('/', ctrlAuth.login);
router.get('/registro', ctrlAuth.registro);
router.get('/principal', ctrlContenidos.principal);

router.post('/login', ctrlAuth.doLogin);
router.post('/register', ctrlAuth.doRegister);
router.post('/principal/cursos', ctrlContenidos.addCursoPersonalizado);
router.post('/principal/cursos/:cursoid/delete', ctrlContenidos.deleteCursoPersonalizado);
router.post('/principal/cursos/:cursoid/resenas', ctrlContenidos.crearResenaCurso);

router.get('/whatsapp', ctrlContenidos.whatsapp);
router.get('/whatsapp/:exerciseId', ctrlContenidos.whatsappExercise);
router.get('/whatsapp/:exerciseId/paso/:n', ctrlContenidos.whatsappExercisePaso);
router.get('/whatsapp/:exerciseId/completado', ctrlContenidos.whatsappExerciseCompletado);

module.exports = router;