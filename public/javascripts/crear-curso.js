document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ejerciciosContainer');
  const addBtn = document.getElementById('addEjercicioBtn');
  const form = document.getElementById('cursoForm');

  const crearBloque = () => {
    const div = document.createElement('div');
    div.className = 'card p-3 mb-3 border-0 shadow-sm';
    div.innerHTML = `
      <div class="mb-2">
        <label class="form-label">Título del ejercicio</label>
        <input class="form-control" data-field="titulo" required>
      </div>

      <div class="mb-2">
        <label class="form-label">Descripción corta</label>
        <input class="form-control" data-field="descripcion">
      </div>

      <div class="mb-2">
        <label class="form-label">Pregunta</label>
        <input class="form-control" data-field="pregunta" required>
      </div>

      <div class="mb-2">
        <label class="form-label">Tipo</label>
        <select class="form-select" data-field="tipo">
          <option value="multiple">Selección múltiple</option>
          <option value="text">Respuesta escrita</option>
        </select>
      </div>

      <div class="mb-2 opciones-wrap">
        <label class="form-label">Opciones (una por línea)</label>
        <textarea class="form-control" data-field="opciones" rows="4"></textarea>
      </div>

      <div class="mb-2">
        <label class="form-label">Respuesta correcta</label>
        <input class="form-control" data-field="respuestaCorrecta" required>
      </div>

      <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Eliminar ejercicio</button>
    `;

    const tipo = div.querySelector('[data-field="tipo"]');
    const opcionesWrap = div.querySelector('.opciones-wrap');

    tipo.addEventListener('change', () => {
      opcionesWrap.style.display = tipo.value === 'multiple' ? 'block' : 'none';
    });

    div.querySelector('[data-remove]').addEventListener('click', () => {
      div.remove();
    });

    return div;
  };

  addBtn.addEventListener('click', () => {
    container.appendChild(crearBloque());
  });

  container.appendChild(crearBloque());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ejercicios = [...container.children].map((card) => {
      const tipo = card.querySelector('[data-field="tipo"]').value;
      const opcionesRaw = card.querySelector('[data-field="opciones"]').value;

      return {
        titulo: card.querySelector('[data-field="titulo"]').value.trim(),
        descripcion: card.querySelector('[data-field="descripcion"]').value.trim(),
        pregunta: card.querySelector('[data-field="pregunta"]').value.trim(),
        tipo,
        opciones: tipo === 'multiple'
          ? opcionesRaw.split('\n').map((x) => x.trim()).filter(Boolean)
          : [],
        respuestaCorrecta: card.querySelector('[data-field="respuestaCorrecta"]').value.trim()
      };
    });

    const payload = {
      userId: document.getElementById('userId').value,
      nombre: document.getElementById('nombreCurso').value.trim(),
      descripcion: document.getElementById('descripcionCurso').value.trim(),
      color_hex: document.getElementById('colorCurso').value,
      icono: document.getElementById('iconoCurso').value.trim() || 'bi-bookmark-fill',
      ejercicios
    };

    const res = await fetch('/cursos/nuevo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensaje || 'No se pudo crear el curso');
      return;
    }

    const nombreUsuario = document.getElementById('userNombre').value;
    window.location.href = `/cursos/${data._id}?nombre=${encodeURIComponent(nombreUsuario)}&userid=${encodeURIComponent(payload.userId)}`;
  });
});
