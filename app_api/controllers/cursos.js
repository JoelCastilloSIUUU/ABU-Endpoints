const cursosListar = (req, res) => {
    const textoBuscado = req.query.q; // Captura lo que pones en ?q=...

    if (textoBuscado) {
        res.status(200).json({
            "mensaje": "Resultados de búsqueda para: " + textoBuscado,
            "resultados": [
                { "nombre": textoBuscado, "color": "#FF8C00", "icono": "bi-search" }
            ]
        });
    } else {
        res.status(200).json([
            { "nombre": "WhatsApp", "color": "#25D366", "icono": "bi-chat" },
            { "nombre": "YouTube", "color": "#FF0000", "icono": "bi-play" }
        ]);
    }
};

const cursosCrear = (req, res) => {
    res.status(201).json({ 
        "mensaje": "Curso personalizado creado con éxito",
        "datos_guardados": req.body 
    });
};

const cursosLeerUno = (req, res) => {
    res.status(200).json({ "mensaje": "Detalles del curso ID: " + req.params.cursoid });
};

const cursosActualizar = (req, res) => {
    res.status(200).json({
        "mensaje": "Curso ID: " + req.params.cursoid + " actualizado",
        "nuevos_datos": req.body
    });
};

const cursosBorrar = (req, res) => {
    res.status(204).json(null); // 204 significa "Todo OK, elemento borrado"
};

module.exports = {
    cursosListar,
    cursosCrear,
    cursosLeerUno,
    cursosActualizar,
    cursosBorrar
};