document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ejerciciosContainer');
  const addBtn = document.getElementById('addEjercicioBtn');
  const form = document.getElementById('cursoForm');
  const iconoInput = document.getElementById('iconoCurso');
  const iconButtons = document.querySelectorAll('.icon-option');
  const imagenCursoFile = document.getElementById('imagenCursoFile');
  const imagenCursoUrl = document.getElementById('imagenCursoUrl');
  const previewImagenCurso = document.getElementById('previewImagenCurso');

  const initialCourse = window.CURSO_INITIAL_DATA || null;
  const isEditMode = Boolean(window.CURSO_MODO_EDICION);
  const cursoId = initialCourse?._id || initialCourse?.cursoId || null;

  function transformarYouTube(url = '') {
    if (!url) return '';

    try {
      if (url.includes('youtu.be')) {
        const id = url.split('/').pop().split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }

      if (url.includes('watch?v=')) {
        const id = new URL(url).searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }

      return url;
    } catch {
      return url;
    }
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function seleccionarIcono(icono) {
    if (!iconoInput) return;

    iconoInput.value = icono || 'bi-bookmark-fill';

    iconButtons.forEach((btn) => {
      const activo = btn.dataset.icon === iconoInput.value;

      btn.classList.toggle('btn-warning', activo);
      btn.classList.toggle('text-white', activo);
      btn.classList.toggle('btn-light', !activo);
      btn.classList.toggle('border-warning', activo);
    });
  }

  function mostrarPreview(imgElement, url) {
    if (!imgElement) return;

    if (!url) {
      imgElement.style.display = 'none';
      imgElement.removeAttribute('src');
      return;
    }

    imgElement.src = url;
    imgElement.style.display = 'block';
  }

  async function subirImagen(file) {
    if (!file) return '';

    const formData = new FormData();
    formData.append('imagen', file);

    const res = await fetch('/uploads/imagenes', {
      method: 'POST',
      body: formData
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.mensaje || 'No se pudo subir la imagen');
    }

    return data.url;
  }

  iconButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      seleccionarIcono(btn.dataset.icon);
    });
  });

  if (imagenCursoFile) {
    imagenCursoFile.addEventListener('change', () => {
      const file = imagenCursoFile.files?.[0];
      mostrarPreview(previewImagenCurso, file ? URL.createObjectURL(file) : imagenCursoUrl?.value);
    });
  }

  const crearBloque = (ejercicio = null) => {
    const div = document.createElement('div');
    div.className = 'card p-3 mb-3 border-0 shadow-sm';

    const tipoInicial = ejercicio?.tipo || 'multiple';
    const opcionesIniciales = Array.isArray(ejercicio?.opciones)
      ? ejercicio.opciones.map((op) => (typeof op === 'string' ? op : op.texto)).join('\n')
      : '';
    const imagenInicial = ejercicio?.imagenUrl || '';

    div.innerHTML = `
      <div class="mb-2">
        <label class="form-label">Título del ejercicio</label>
        <input class="form-control" data-field="titulo" required value="${escapeHtml(ejercicio?.titulo || '')}">
      </div>

      <div class="mb-2">
        <label class="form-label">Descripción corta</label>
        <input class="form-control" data-field="descripcion" value="${escapeHtml(ejercicio?.descripcion || '')}">
      </div>

      <div class="mb-2">
        <label class="form-label">Imagen de apoyo del ejercicio</label>
        <input class="form-control mb-2" data-field="imagenFile" type="file" accept="image/*">
        <input class="form-control" data-field="imagenUrl" type="url" placeholder="O pega una URL de imagen: https://..." value="${escapeHtml(imagenInicial)}">
        <small class="text-muted">Puedes subir una imagen desde tu PC o pegar una URL. Esta imagen se mostrará dentro del minijuego.</small>
        <img class="mt-2" data-preview="imagen" src="${escapeHtml(imagenInicial)}" alt="Vista previa" style="${imagenInicial ? '' : 'display:none;'} width:100%; max-height:180px; object-fit:cover; border-radius:14px;">
      </div>

      <div class="mb-2">
        <label class="form-label">Video de apoyo (opcional)</label>
        <input
          class="form-control"
          data-field="videoUrl"
          type="url"
          placeholder="Pega link de YouTube"
          value="${escapeHtml(ejercicio?.videoUrl || '')}"
        >
        <small class="text-muted">Puedes pegar un link normal de YouTube; se convertirá automáticamente.</small>
      </div>

      <div class="mb-2">
        <label class="form-label">Pregunta</label>
        <input class="form-control" data-field="pregunta" required value="${escapeHtml(ejercicio?.pregunta || '')}">
      </div>

      <div class="mb-2">
        <label class="form-label">Tipo</label>
        <select class="form-select" data-field="tipo">
          <option value="multiple" ${tipoInicial === 'multiple' ? 'selected' : ''}>Selección múltiple</option>
          <option value="text" ${tipoInicial === 'text' ? 'selected' : ''}>Respuesta escrita</option>
        </select>
      </div>

      <div class="mb-2 opciones-wrap">
        <label class="form-label">Opciones (una por línea)</label>
        <textarea class="form-control" data-field="opciones" rows="4">${escapeHtml(opcionesIniciales)}</textarea>
      </div>

      <div class="mb-2">
        <label class="form-label">Respuesta correcta</label>
        <input class="form-control" data-field="respuestaCorrecta" required value="${escapeHtml(ejercicio?.respuestaCorrecta || '')}">
      </div>

      <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Eliminar ejercicio</button>
    `;

    const tipo = div.querySelector('[data-field="tipo"]');
    const opcionesWrap = div.querySelector('.opciones-wrap');
    const imagenFileInput = div.querySelector('[data-field="imagenFile"]');
    const imagenUrlInput = div.querySelector('[data-field="imagenUrl"]');
    const preview = div.querySelector('[data-preview="imagen"]');

    const actualizarVistaTipo = () => {
      opcionesWrap.style.display = tipo.value === 'multiple' ? 'block' : 'none';
    };

    tipo.addEventListener('change', actualizarVistaTipo);
    actualizarVistaTipo();

    imagenFileInput.addEventListener('change', () => {
      const file = imagenFileInput.files?.[0];
      mostrarPreview(preview, file ? URL.createObjectURL(file) : imagenUrlInput.value.trim());
    });

    imagenUrlInput.addEventListener('input', () => {
      if (!imagenFileInput.files?.[0]) {
        mostrarPreview(preview, imagenUrlInput.value.trim());
      }
    });

    div.querySelector('[data-remove]').addEventListener('click', () => {
      div.remove();
    });

    return div;
  };

  function cargarDatosIniciales() {
    const iconoInicial = initialCourse?.icono || 'bi-bookmark-fill';
    seleccionarIcono(iconoInicial);

    if (initialCourse?.imagenUrl && imagenCursoUrl) {
      imagenCursoUrl.value = initialCourse.imagenUrl;
      mostrarPreview(previewImagenCurso, initialCourse.imagenUrl);
    }

    if (!initialCourse) {
      container.appendChild(crearBloque());
      return;
    }

    document.getElementById('nombreCurso').value = initialCourse.nombre || '';
    document.getElementById('descripcionCurso').value = initialCourse.descripcion || '';
    document.getElementById('colorCurso').value = initialCourse.color_hex || '#FF8C00';

    const ejercicios = Array.isArray(initialCourse.ejercicios) ? initialCourse.ejercicios : [];

    if (!ejercicios.length) {
      container.appendChild(crearBloque());
      return;
    }

    ejercicios
      .sort((a, b) => (a.orden || 0) - (b.orden || 0))
      .forEach((ejercicio) => {
        container.appendChild(crearBloque(ejercicio));
      });
  }

  addBtn.addEventListener('click', () => {
    container.appendChild(crearBloque());
  });

  cargarDatosIniciales();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value.trim();
    const nombreUsuario = document.getElementById('userNombre').value.trim();
    const nombreCurso = document.getElementById('nombreCurso').value.trim();
    const descripcionCurso = document.getElementById('descripcionCurso').value.trim();
    const colorCurso = document.getElementById('colorCurso').value;
    const iconoCurso = document.getElementById('iconoCurso').value.trim() || 'bi-bookmark-fill';

    if (!userId) {
      alert('No se encontró el usuario. Inicia sesión nuevamente.');
      return;
    }

    if (!nombreCurso) {
      alert('Debes escribir un nombre para el curso.');
      return;
    }

    try {
      const imagenCursoSubida = imagenCursoFile?.files?.[0]
        ? await subirImagen(imagenCursoFile.files[0])
        : (imagenCursoUrl?.value.trim() || '');

      const ejercicios = await Promise.all([...container.children].map(async (card) => {
        const tipo = card.querySelector('[data-field="tipo"]').value;
        const opcionesRaw = card.querySelector('[data-field="opciones"]').value;
        const imagenFileInput = card.querySelector('[data-field="imagenFile"]');
        const imagenUrlInput = card.querySelector('[data-field="imagenUrl"]');
        const imagenSubida = imagenFileInput?.files?.[0]
          ? await subirImagen(imagenFileInput.files[0])
          : (imagenUrlInput?.value.trim() || '');

        return {
          titulo: card.querySelector('[data-field="titulo"]').value.trim(),
          descripcion: card.querySelector('[data-field="descripcion"]').value.trim(),
          imagenUrl: imagenSubida,
          videoUrl: transformarYouTube(card.querySelector('[data-field="videoUrl"]').value.trim()),
          pregunta: card.querySelector('[data-field="pregunta"]').value.trim(),
          tipo,
          opciones: tipo === 'multiple'
            ? opcionesRaw.split('\n').map((x) => x.trim()).filter(Boolean)
            : [],
          respuestaCorrecta: card.querySelector('[data-field="respuestaCorrecta"]').value.trim()
        };
      }));

      const hayEjercicioInvalido = ejercicios.some((ejercicio) => {
        if (!ejercicio.titulo || !ejercicio.pregunta || !ejercicio.respuestaCorrecta) return true;
        if (ejercicio.tipo === 'multiple' && ejercicio.opciones.length < 2) return true;
        return false;
      });

      if (hayEjercicioInvalido) {
        alert('Revisa los ejercicios. Cada ejercicio debe tener título, pregunta, respuesta correcta y, si es múltiple, al menos dos opciones.');
        return;
      }

      const payload = {
        userId,
        nombre: nombreCurso,
        descripcion: descripcionCurso,
        color_hex: colorCurso,
        icono: iconoCurso,
        imagenUrl: imagenCursoSubida,
        ejercicios
      };

      const res = await fetch(isEditMode && cursoId ? `/api/cursos/${cursoId}` : '/cursos/nuevo', {
        method: isEditMode && cursoId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.mensaje || 'Error al guardar el curso');
        return;
      }

      window.location.href = `/principal?nombre=${encodeURIComponent(nombreUsuario)}&userid=${encodeURIComponent(userId)}&success=${encodeURIComponent('Curso guardado correctamente')}`;
    } catch (err) {
      alert(err.message || 'Error al guardar curso');
    }
  });
});
