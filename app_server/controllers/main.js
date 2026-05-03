
const index = (req, res) => {
    res.render('index', { title: 'Mi Aplicación MEAN' });
};

module.exports = {
    index
};

