const axios = require('axios');

const getApiBase = (req) => `${req.protocol}://${req.get('host')}/api`;

const login = (req, res) => {
  res.render('login', {
    title: 'Tu Guía Digital',
    subtitle: '¡Aprende a usar tu celular paso a paso y de una forma muy interactiva!',
    botonPrincipal: 'Iniciar sesión',
    registroTexto: '¿No tienes cuenta? Regístrate'
  });
};

const registro = (req, res) => {
  res.render('registro', {
    title: 'Tu Guía Digital',
    subtitle: 'Aprende a usar tu celular paso a paso, registrate ya para aprender!',
    botonPrincipal: 'Crear cuenta',
    loginTexto: '¿Ya tienes cuenta? Inicia sesión'
  });
};

const doLogin = async (req, res) => {
  try {
    const response = await axios.post(`${getApiBase(req)}/login`, {
      email: req.body.email,
      password: req.body.password
    });

    const { nombre, id } = response.data.usuario;
    res.redirect(`/principal?nombre=${encodeURIComponent(nombre)}&userid=${encodeURIComponent(id)}`);
  } catch (error) {
    res.render('login', {
      title: 'Tu Guía Digital',
      subtitle: '¡Aprende a usar tu celular paso a paso y de una forma muy interactiva!',
      botonPrincipal: 'Iniciar sesión',
      registroTexto: '¿No tienes cuenta? Regístrate',
      error: error.response?.data?.mensaje || 'No se pudo iniciar sesión'
    });
  }
};

const doRegister = async (req, res) => {
  try {
    await axios.post(`${getApiBase(req)}/register`, {
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password
    });

    res.redirect('/');
  } catch (error) {
    res.render('registro', {
      title: 'Tu Guía Digital',
      subtitle: 'Aprende a usar tu celular paso a paso, registrate ya para aprender!',
      botonPrincipal: 'Crear cuenta',
      loginTexto: '¿Ya tienes cuenta? Inicia sesión',
      error: error.response?.data?.mensaje || 'No se pudo registrar el usuario'
    });
  }
};

module.exports = {
  login,
  registro,
  doLogin,
  doRegister
};
