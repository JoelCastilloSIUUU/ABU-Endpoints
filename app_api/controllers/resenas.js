const store = require("../data/store");

const resenasListar = (req, res) => {
  const cursoid = req.params.cursoid;
  const reviews = store.listReviews(cursoid);
  const stats = store.statsFor(cursoid);

  res.status(200).json({
    cursoid,
    stats,
    reviews,
  });
};

const resenasCrear = (req, res) => {
  const cursoid = req.params.cursoid;
  const result = store.addReview(cursoid, req.body);

  if (result.error) {
    return res.status(result.status || 400).json({
      error: result.error,
      existing: result.existing || null,
    });
  }

  const stats = store.statsFor(cursoid);
  res.status(201).json({
    mensaje: "Reseña creada con éxito",
    cursoid,
    stats,
    review: result.review,
  });
};

const resenasActualizar = (req, res) => {
  const { cursoid, resenaid } = req.params;
  const result = store.updateReview(cursoid, resenaid, req.body);

  if (result.error) {
    return res.status(result.status || 404).json({ error: result.error });
  }

  const stats = store.statsFor(cursoid);
  res.status(200).json({
    mensaje: "Reseña actualizada",
    cursoid,
    stats,
    review: result.review,
  });
};

const resenasBorrar = (req, res) => {
  const { cursoid, resenaid } = req.params;
  const result = store.deleteReview(cursoid, resenaid);

  if (result.error) {
    return res.status(result.status || 404).json({ error: result.error });
  }

  res.status(204).json(null);
};

const calificacionCurso = (req, res) => {
  const cursoid = req.params.cursoid;
  const stats = store.statsFor(cursoid);
  res.status(200).json({ cursoid, stats });
};

module.exports = {
  resenasListar,
  resenasCrear,
  resenasActualizar,
  resenasBorrar,
  calificacionCurso,
};
