const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "db.json");

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    const data = JSON.parse(raw || "{}");
    data.reviews = data.reviews || {};
    return data;
  } catch (e) {
    return { reviews: {} };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

function listReviews(courseId) {
  const db = readDB();
  return db.reviews[courseId] || [];
}

function statsFor(courseId) {
  const reviews = listReviews(courseId);
  const count = reviews.length;
  const avg = count === 0 ? 0 : reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / count;
  return { count, average: Math.round(avg * 10) / 10 };
}

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}

function findExistingIndex(arr, payload) {
  const userId = payload.userId ? String(payload.userId) : null;
  const userNameNorm = normalizeName(payload.userName || "Anónimo");

  return arr.findIndex((r) => {
    if (userId && r.userId) return String(r.userId) === userId;
    return normalizeName(r.userName) === userNameNorm;
  });
}

function addReview(courseId, payload) {
  const db = readDB();
  db.reviews[courseId] = db.reviews[courseId] || [];

  const rating = Number(payload.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { error: "La calificación (rating) debe ser un número entre 1 y 5.", status: 400 };
  }

  const idx = findExistingIndex(db.reviews[courseId], payload);
  if (idx !== -1) {
    return {
      error: "Ya existe una reseña de este usuario para este curso. Puedes editarla en lugar de crear otra.",
      status: 409,
      existing: db.reviews[courseId][idx],
    };
  }

  const review = {
    id: crypto.randomUUID(),
    userId: payload.userId ? String(payload.userId) : null,
    userName: String(payload.userName || "Anónimo").trim() || "Anónimo",
    rating,
    comment: String(payload.comment || "").trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.reviews[courseId].push(review);
  writeDB(db);
  return { review };
}

function updateReview(courseId, reviewId, payload) {
  const db = readDB();
  const arr = db.reviews[courseId] || [];
  const idx = arr.findIndex((r) => r.id === reviewId);
  if (idx === -1) return { error: "Reseña no encontrada.", status: 404 };

  if (payload.rating !== undefined) {
    const rating = Number(payload.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return { error: "La calificación (rating) debe ser un número entre 1 y 5.", status: 400 };
    }
    arr[idx].rating = rating;
  }

  if (payload.comment !== undefined) arr[idx].comment = String(payload.comment || "").trim();
  if (payload.userName !== undefined) arr[idx].userName = String(payload.userName || "Anónimo").trim() || "Anónimo";

  arr[idx].updatedAt = new Date().toISOString();
  db.reviews[courseId] = arr;
  writeDB(db);
  return { review: arr[idx] };
}

function deleteReview(courseId, reviewId) {
  const db = readDB();
  const arr = db.reviews[courseId] || [];
  const next = arr.filter((r) => r.id !== reviewId);
  if (next.length === arr.length) return { error: "Reseña no encontrada.", status: 404 };
  db.reviews[courseId] = next;
  writeDB(db);
  return { ok: true };
}

module.exports = {
  listReviews,
  statsFor,
  addReview,
  updateReview,
  deleteReview,
};
