document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.querySelector('[data-next-button]');

  const lockNextButton = () => {
    if (!nextButton) return;
    nextButton.classList.add('disabled');
    nextButton.setAttribute('aria-disabled', 'true');
    nextButton.style.pointerEvents = 'none';
    nextButton.style.opacity = '0.6';
  };

  const unlockNextButton = () => {
    if (!nextButton) return;
    nextButton.classList.remove('disabled');
    nextButton.removeAttribute('aria-disabled');
    nextButton.style.pointerEvents = 'auto';
    nextButton.style.opacity = '1';
  };

  const tapGame = document.querySelector('[data-minigame="tap"]');
  if (tapGame) {
    const options = tapGame.querySelectorAll('[data-option]');
    const feedback = tapGame.querySelector('[data-feedback]');
    const retryButton = tapGame.querySelector('[data-retry-button]');

    const resetOptions = () => {
      options.forEach((option) => {
        option.disabled = false;
        option.classList.remove('btn-success', 'btn-danger');
        option.classList.add('btn-outline-success');
      });
    };

    const showRetryButton = () => {
      if (!retryButton) return;
      retryButton.classList.remove('d-none');
    };

    const hideRetryButton = () => {
      if (!retryButton) return;
      retryButton.classList.add('d-none');
    };

    lockNextButton();
    hideRetryButton();

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const isCorrect = option.dataset.correct === 'true';

        options.forEach((btn) => {
          btn.disabled = true;
        });

        if (isCorrect) {
          option.classList.remove('btn-outline-success');
          option.classList.add('btn-success');

          if (feedback) {
            feedback.textContent = '¡Correcto! Ya puedes continuar.';
            feedback.className = 'alert alert-success mt-3';
          }

          hideRetryButton();
          unlockNextButton();
        } else {
          option.classList.remove('btn-outline-success');
          option.classList.add('btn-danger');

          const correctOption = tapGame.querySelector('[data-correct="true"]');
          if (correctOption) {
            correctOption.classList.remove('btn-outline-success');
            correctOption.classList.add('btn-success');
          }

          if (feedback) {
            feedback.textContent = 'Ups, esa no era. Inténtalo otra vez.';
            feedback.className = 'alert alert-danger mt-3';
          }

          showRetryButton();
          lockNextButton();
        }
      });
    });

    if (retryButton) {
      retryButton.addEventListener('click', () => {
        resetOptions();
        hideRetryButton();
        lockNextButton();

        if (feedback) {
          feedback.textContent = '';
          feedback.className = 'mt-3';
        }
      });
    }
  }

  const inputGame = document.querySelector('[data-minigame="input"]');
  if (inputGame) {
    const input = inputGame.querySelector('[data-input-answer]');
    const checkButton = inputGame.querySelector('[data-check-input]');
    const retryButton = inputGame.querySelector('[data-retry-input]');
    const feedback = inputGame.querySelector('[data-feedback]');
    const correctAnswer = checkButton?.dataset.correctAnswer || '';

    const normalize = (text) =>
      String(text || '')
        .trim()
        .toLowerCase();

    const resetInputGame = () => {
      if (input) {
        input.disabled = false;
        input.value = '';
        input.classList.remove('is-valid', 'is-invalid');
      }

      if (checkButton) {
        checkButton.disabled = false;
      }

      if (retryButton) {
        retryButton.classList.add('d-none');
      }

      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'mt-3';
      }

      lockNextButton();
    };

    lockNextButton();

    if (checkButton) {
      checkButton.addEventListener('click', () => {
        const userValue = normalize(input?.value);
        const expectedValue = normalize(correctAnswer);

        if (!input) return;

        if (userValue === expectedValue) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          input.disabled = true;
          checkButton.disabled = true;

          if (feedback) {
            feedback.textContent = '¡Muy bien! Escribiste el mensaje correctamente.';
            feedback.className = 'alert alert-success mt-3';
          }

          if (retryButton) {
            retryButton.classList.add('d-none');
          }

          unlockNextButton();
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          input.disabled = true;
          checkButton.disabled = true;

          if (feedback) {
            feedback.textContent = 'Ese mensaje no coincide. Inténtalo otra vez.';
            feedback.className = 'alert alert-danger mt-3';
          }

          if (retryButton) {
            retryButton.classList.remove('d-none');
          }

          lockNextButton();
        }
      });
    }

    if (retryButton) {
      retryButton.addEventListener('click', () => {
        resetInputGame();
      });
    }
  }
});