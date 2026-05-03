import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './principal.css';

const TOTAL_MODULOS = 6;

const learningModules = [
  { slug: 'whatsapp', nombre: 'WhatsApp', desc: 'Envía mensajes, fotos y audios a tus seres queridos', icono: 'bi-chat-left-text-fill', color: '#25D366', imagen: '/images/cursos/whatsapp.svg' },
  { slug: 'youtube', nombre: 'YouTube', desc: 'Mira videos, busca contenido y guarda tus favoritos', icono: 'bi-play-btn-fill', color: '#FF0000', imagen: '/images/cursos/youtube.svg' },
  { slug: 'camara', nombre: 'Cámara', desc: 'Toma fotos, guárdalas y compártelas fácilmente', icono: 'bi-camera-fill', color: '#833AB4', imagen: '/images/cursos/camara.svg' },
  { slug: 'navegador', nombre: 'Navegador', desc: 'Busca información en internet de forma segura', icono: 'bi-globe', color: '#0D6EFD', imagen: '/images/cursos/navegador.svg' },
  { slug: 'ajustes', nombre: 'Ajustes', desc: 'Personaliza tu celular y maneja la configuración', icono: 'bi-gear-fill', color: '#6C757D', imagen: '/images/cursos/ajustes.svg' },
  { slug: 'llamadas', nombre: 'Llamadas', desc: 'Realiza y recibe llamadas, gestiona tus contactos', icono: 'bi-telephone-fill', color: '#00BFA5', imagen: '/images/cursos/llamadas.svg' }
];

const courseMeta = learningModules.reduce((acc, item) => {
  acc[item.nombre] = { color: item.color, icono: item.icono, slug: item.slug };
  return acc;
}, {});

function readInitialContext() {
  const root = document.getElementById('principal-react-root');
  const params = new URLSearchParams(window.location.search);
  return {
    userNombre: root?.dataset.nombre || params.get('nombre') || 'Usuario',
    userid: root?.dataset.userid || params.get('userid') || '',
    success: params.get('success') || '',
    error: params.get('error') || ''
  };
}

function buildUserQuery(nombre, userid) {
  return `nombre=${encodeURIComponent(nombre || 'Usuario')}&userid=${encodeURIComponent(userid || '')}`;
}

function normalizeSlug(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function countCompletedModules(progresoModulos = {}) {
  return ['whatsapp', 'youtube', 'camara', 'navegador', 'ajustes', 'llamadas']
    .filter((key) => progresoModulos?.[key]?.completado).length;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.mensaje || data.error || 'No se pudo completar la acción');
  }
  return data;
}

function mapCreatedCourseCard(curso, userNombre, userid) {
  const cursoId = curso._id || curso.cursoId;
  return {
    cursoId,
    nombre: curso.nombre || curso.nombreCurso || 'Curso personalizado',
    desc: curso.descripcion || curso.desc || 'Curso personalizado creado por ti',
    color: curso.color_hex || curso.color || '#FF8C00',
    icono: curso.icono || 'bi-bookmark-fill',
    imagenUrl: curso.imagenUrl || '',
    href: `/cursos/${cursoId}?${buildUserQuery(userNombre, userid)}`
  };
}

function buildManagedCourse(curso, userNombre, userid) {
  const cursoId = curso.cursoId || curso._id;
  const nombreCurso = curso.nombreCurso || curso.nombre || 'Curso personalizado';
  const meta = courseMeta[nombreCurso] || { color: curso.color_hex || curso.color || '#FF8C00', icono: curso.icono || 'bi-bookmark-fill' };
  const href = courseMeta[nombreCurso]
    ? `/${normalizeSlug(nombreCurso)}?${buildUserQuery(userNombre, userid)}`
    : `/cursos/${cursoId}?${buildUserQuery(userNombre, userid)}`;

  return { ...curso, cursoId, nombreCurso, progreso: curso.progreso || 0, href, meta };
}

function Alert({ type, children }) {
  if (!children) return null;
  return <div className={`alert alert-${type} shadow-sm`}>{children}</div>;
}

function CourseImage({ src, alt, color, fallback }) {
  if (src) return <img src={src} alt={alt} className="principal-course-img" />;
  return (
    <div className="principal-course-placeholder" style={{ backgroundColor: `${color || '#FF8C00'}22` }}>
      <span className="fw-semibold">{fallback}</span>
    </div>
  );
}

function ModuleCard({ item, href, userNombre, userid }) {
  const finalHref = href || `/${item.slug}?${buildUserQuery(userNombre, userid)}`;
  return (
    <div className="col-12 col-lg-6 p-0 mb-3">
      <a className="text-decoration-none" href={finalHref}>
        <div className="card border-0 shadow-sm module-card principal-module-card">
          <CourseImage src={item.imagen} alt={`Imagen de ${item.nombre}`} color={item.color} fallback={`Imagen de apoyo pendiente para ${item.nombre}`} />
          <div className="p-3 d-flex align-items-center module-card-body">
            <div className="rounded-4 d-flex justify-content-center align-items-center me-3 module-icon principal-icon" style={{ backgroundColor: item.color }}>
              <i className={`bi ${item.icono}`} />
            </div>
            <div className="text-start">
              <h4 className="fw-bold mb-2 text-dark principal-card-title">{item.nombre}</h4>
              <p className="text-muted m-0 principal-card-desc">{item.desc}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function CreatedCourseCard({ curso, userNombre, userid, onDeleted }) {
  const deleteCreatedCourse = async () => {
    if (!confirm('¿Seguro que quieres eliminar este curso? Esta acción no se puede deshacer.')) return;
    await requestJson(`/api/cursos/${curso.cursoId}`, { method: 'DELETE' });
    onDeleted('Curso eliminado correctamente');
  };

  return (
    <div className="col-12 col-lg-6 p-0 mb-3">
      <div className="card border-0 shadow-sm module-card principal-module-card position-relative">
        <CourseImage src={curso.imagenUrl} alt={`Imagen de ${curso.nombre}`} color={curso.color} fallback="Agrega una imagen de apoyo para este curso" />
        <div className="position-absolute top-0 end-0 p-2 d-flex gap-2 principal-card-actions">
          <a className="btn btn-sm btn-light shadow-sm principal-action-btn" href={`/cursos/${curso.cursoId}/editar?${buildUserQuery(userNombre, userid)}`} title="Editar curso">
            <i className="bi bi-pencil-fill principal-orange" />
          </a>
          <button className="btn btn-sm btn-light shadow-sm principal-action-btn" type="button" title="Eliminar curso" onClick={deleteCreatedCourse}>
            <i className="bi bi-trash-fill text-danger" />
          </button>
        </div>
        <a className="text-decoration-none" href={curso.href}>
          <div className="p-3 d-flex align-items-center module-card-body principal-created-body">
            <div className="rounded-4 d-flex justify-content-center align-items-center me-3 module-icon principal-icon" style={{ backgroundColor: curso.color || '#FF8C00' }}>
              <i className={`bi ${curso.icono || 'bi-journal-text'}`} />
            </div>
            <div className="text-start">
              <h4 className="fw-bold mb-2 text-dark principal-card-title">{curso.nombre}</h4>
              <p className="text-muted m-0 principal-card-desc">{curso.desc || 'Curso personalizado creado por ti'}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

function App() {
  const initial = useMemo(readInitialContext, []);
  const [userNombre] = useState(initial.userNombre);
  const [userid] = useState(initial.userid);
  const [success, setSuccess] = useState(initial.success);
  const [error, setError] = useState(initial.error);
  const [loading, setLoading] = useState(Boolean(initial.userid));
  const [query, setQuery] = useState('');
  const [cursosActivos, setCursosActivos] = useState([]);
  const [cursosCreados, setCursosCreados] = useState([]);
  const [reviewsByCourse, setReviewsByCourse] = useState({});
  const [progressText, setProgressText] = useState(`0/${TOTAL_MODULOS}`);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [reviewForms, setReviewForms] = useState({});

  const userQuery = buildUserQuery(userNombre, userid);

  async function loadPrincipalData(message = '') {
    setError('');
    if (message) setSuccess(message);
    if (!userid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const usuario = await requestJson(`/api/users/${userid}`);
      const created = await requestJson(`/api/cursos?creador=${encodeURIComponent(userid)}&origen=dynamic`);
      const activos = (usuario.cursosEnrolados || []).map((curso) => buildManagedCourse(curso, userNombre, userid));
      const creados = (Array.isArray(created) ? created : []).map((curso) => mapCreatedCourseCard(curso, userNombre, userid));
      const reviewEntries = await Promise.all(activos.map(async (curso) => {
        try {
          const data = await requestJson(`/api/cursos/${curso.cursoId}/resenas`);
          return [String(curso.cursoId), data.reviews || []];
        } catch (_err) {
          return [String(curso.cursoId), []];
        }
      }));
      setCursosActivos(activos);
      setCursosCreados(creados);
      setReviewsByCourse(Object.fromEntries(reviewEntries));
      setProgressText(`${countCompletedModules(usuario.progresoModulos || {})}/${TOTAL_MODULOS}`);
    } catch (err) {
      setError(err.message || 'No se pudo cargar la información del usuario');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPrincipalData();
  }, []);

  const cursosDisponibles = useMemo(() => ([
    ...learningModules.map((modulo) => ({ tipo: 'static', nombreCurso: modulo.nombre, label: modulo.nombre, value: modulo.nombre })),
    ...cursosCreados.map((curso) => ({ tipo: 'dynamic', cursoId: curso.cursoId, nombreCurso: curso.nombre, label: `${curso.nombre} (creado por mí)`, value: curso.cursoId }))
  ]), [cursosCreados]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleModules = learningModules.filter((item) => `${item.nombre} ${item.desc}`.toLowerCase().includes(normalizedQuery));
  const visibleCreated = cursosCreados.filter((item) => `${item.nombre} ${item.desc}`.toLowerCase().includes(normalizedQuery));

  const addCourse = async (event) => {
    event.preventDefault();
    const selected = cursosDisponibles.find((curso) => curso.value === selectedCourse);
    if (!userid || !selected) {
      setError('Selecciona un curso válido');
      return;
    }
    try {
      const payload = selected.tipo === 'dynamic' ? { cursoId: selected.cursoId } : { nombreCurso: selected.nombreCurso };
      await requestJson(`/api/users/${userid}/cursos`, { method: 'POST', body: JSON.stringify(payload) });
      setSelectedCourse('');
      await loadPrincipalData('Curso añadido a tu lista personalizada');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const deleteActiveCourse = async (cursoId) => {
    try {
      await requestJson(`/api/users/${userid}/cursos/${cursoId}`, { method: 'DELETE' });
      await loadPrincipalData('Curso eliminado correctamente');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const submitReview = async (event, cursoId) => {
    event.preventDefault();
    const form = reviewForms[cursoId] || {};
    if (!form.rating || !form.comment) {
      setError('Completa calificación y comentario para crear la reseña');
      return;
    }
    try {
      await requestJson(`/api/cursos/${cursoId}/resenas`, {
        method: 'POST',
        body: JSON.stringify({ userId: userid, userName: userNombre || 'Anónimo', rating: form.rating, comment: form.comment })
      });
      setReviewForms((current) => ({ ...current, [cursoId]: { rating: '', comment: '' } }));
      await loadPrincipalData('Reseña creada con éxito');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="container-fluid p-0 main-shell principal-shell">
      <header className="header-naranja p-4 text-white main-header principal-header">
        <div className="main-header-inner">
          <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <div className="bg-white rounded-circle me-3 d-flex justify-content-center align-items-center main-avatar principal-avatar">
                <i className="bi bi-person-fill principal-avatar-icon" />
              </div>
              <div>
                <h2 className="h3 fw-bold m-0">¡Hola, {userNombre}!</h2>
                <p className="m-0 principal-subtitle">Sigamos aprendiendo juntos</p>
              </div>
            </div>
            <div className="bg-white rounded-pill px-4 py-2 shadow-sm main-progress-pill">
              <i className="bi bi-trophy-fill me-2 principal-orange principal-trophy" />
              <span className="fw-bold text-dark principal-progress-text">{progressText}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="cuerpo-app px-3 mt-4 main-content">
        <div className="main-content-inner">
          <Alert type="success">{success}</Alert>
          <Alert type="danger">{error}</Alert>
          {loading && <div className="alert alert-light shadow-sm">Cargando tus cursos...</div>}

          <div className="search-container mb-4">
            <div className="input-group shadow-sm principal-search">
              <span className="input-group-text bg-white border-0 principal-search-icon"><i className="bi bi-search principal-orange principal-search-bi" /></span>
              <input className="form-control border-0 py-3 principal-search-input" type="text" placeholder="¿Qué quieres aprender hoy?" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <section className="card border-0 shadow-sm p-4 mb-4 principal-intro-card">
            <h3 className="fw-bold mb-2 principal-section-title">Tu camino de aprendizaje</h3>
            <p className="text-muted m-0 principal-section-desc">Elige un tema para comenzar. Cada módulo tiene 3 ejercicios prácticos. Aprenderás haciendo, sin prisa y con ejemplos claros.</p>
          </section>

          <section className="row g-3 m-0 modules-grid">
            {visibleModules.map((modulo) => <ModuleCard key={modulo.slug} item={modulo} userNombre={userNombre} userid={userid} />)}
            {visibleCreated.map((curso) => <CreatedCourseCard key={curso.cursoId} curso={curso} userNombre={userNombre} userid={userid} onDeleted={loadPrincipalData} />)}
          </section>

          <section className="row mb-4 mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm p-4 principal-create-card">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h3 className="fw-bold mb-2 principal-dark-title">Crear un curso propio</h3>
                    <p className="text-muted mb-0">Diseña tus propios ejercicios y guárdalos en la plataforma.</p>
                  </div>
                  {userid ? <a className="btn text-white fw-bold principal-primary-btn" href={`/cursos/nuevo?${userQuery}`}>Crear curso</a> : <span className="text-muted">Inicia sesión para crear cursos</span>}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 pb-5 management-section">
            <h3 className="fw-bold mb-3 principal-management-title">Administrar mis cursos</h3>
            <div className="management-grid">
              <aside className="management-left">
                <div className="card border-0 shadow-sm mb-4 principal-add-card">
                  <div className="p-4 text-center">
                    <i className="bi bi-plus-circle-fill mb-3 principal-plus-icon" />
                    <h4 className="fw-bold text-dark principal-add-title">Añadir curso existente</h4>
                    <form className="mt-3" onSubmit={addCourse}>
                      <select className="form-select mb-3 principal-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required disabled={!userid}>
                        <option value="">Selecciona un curso para añadir...</option>
                        {cursosDisponibles.map((curso) => <option key={`${curso.tipo}-${curso.value}`} value={curso.value}>{curso.label}</option>)}
                      </select>
                      <button className="btn text-white fw-bold principal-primary-btn" type="submit" disabled={!userid}>+ Añadir a mi lista</button>
                    </form>
                  </div>
                </div>
              </aside>

              <div className="management-right">
                <h3 className="fw-bold mb-3 principal-management-title">Mis Cursos Activos (Gestionar)</h3>
                {!userid && <div className="alert alert-warning">Debes iniciar sesión para gestionar tus cursos.</div>}
                {userid && !loading && cursosActivos.length === 0 && <div className="alert alert-light shadow-sm">Aún no tienes cursos añadidos manualmente. Añade uno para comenzar.</div>}
                <div className="row g-2 m-0">
                  {cursosActivos.map((item) => {
                    const form = reviewForms[item.cursoId] || { rating: '', comment: '' };
                    const courseReviews = reviewsByCourse[String(item.cursoId)] || [];
                    return (
                      <div className="col-12 p-0 mb-3" key={item.cursoId}>
                        <div className="card border-0 shadow-sm p-4 principal-active-card">
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="d-flex align-items-center">
                              <div className="rounded me-3 d-flex justify-content-center align-items-center principal-active-icon" style={{ backgroundColor: item.meta.color }}>
                                <i className={`bi ${item.meta.icono}`} />
                              </div>
                              <div className="me-3">
                                <a className="fw-bold text-dark d-block text-decoration-none principal-active-title" href={item.href}>{item.nombreCurso}</a>
                                <span className="text-muted principal-active-progress">Progreso: {item.progreso || 0}%</span>
                              </div>
                            </div>
                            <button className="btn btn-link text-danger p-0 principal-delete-btn" type="button" onClick={() => deleteActiveCourse(item.cursoId)}>
                              <i className="bi bi-trash-fill" />
                            </button>
                          </div>

                          <div className="mt-4 pt-3 principal-review-area">
                            <h4 className="fw-bold mb-3 principal-review-title">Crear reseña de este curso</h4>
                            <form onSubmit={(event) => submitReview(event, item.cursoId)}>
                              <div className="row g-2">
                                <div className="col-md-3">
                                  <select className="form-select" value={form.rating} onChange={(e) => setReviewForms((current) => ({ ...current, [item.cursoId]: { ...form, rating: e.target.value } }))} required>
                                    <option value="">Calificación</option>
                                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>)}
                                  </select>
                                </div>
                                <div className="col-md-7">
                                  <input className="form-control" type="text" placeholder="Escribe tu comentario" value={form.comment} onChange={(e) => setReviewForms((current) => ({ ...current, [item.cursoId]: { ...form, comment: e.target.value } }))} required />
                                </div>
                                <div className="col-md-2">
                                  <button className="btn text-white w-100 principal-primary-btn" type="submit">Guardar</button>
                                </div>
                              </div>
                            </form>
                            {courseReviews.length > 0 && (
                              <div className="mt-3">
                                {courseReviews.map((review) => (
                                  <div className="bg-light rounded p-3 mb-2" key={review._id || review.id || `${review.userName}-${review.rating}-${review.comment}`}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                      <strong className="principal-review-user">{review.userName}</strong>
                                      <span className="badge text-bg-warning text-dark principal-review-badge">{review.rating}/5</span>
                                    </div>
                                    {review.comment && <p className="text-muted mb-0 mt-2 principal-review-comment">{review.comment}</p>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('principal-react-root')).render(<App />);
