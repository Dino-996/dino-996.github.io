/**
 * Main JavaScript file for dino-996 blog
 */

(function () {
  'use strict';

  // ===========================================
  // = Bootstrap toggle theme
  // ===========================================

  /**
   * Notifica Giscus del cambio tema tramite postMessage.
   * L'iframe di Giscus ascolta questo evento e aggiorna il proprio tema
   * senza ricaricare i commenti.
   * @param {'light'|'dark'} theme
   */
  function syncGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }

  document.querySelectorAll('.mode-switch .btn').forEach(btn =>
    btn.addEventListener('click', function () {
      const mode = this.id; // 'dark' o 'light'

      // Salva la scelta dell'utente
      localStorage.setItem('bs-theme', mode);

      // Imposta l'attributo sul root
      document.documentElement.setAttribute('data-bs-theme', mode);

      // Aggiorna lo stato dei bottoni
      document.querySelectorAll('.mode-switch .btn').forEach(b =>
        b.classList.remove('text-body')
      );
      this.classList.add('text-body');

      // Sincronizza il tema di Giscus (solo nelle pagine post dove è presente)
      syncGiscusTheme(mode);
    })
  );

  // ===========================================
  // = Smooth scroll for anchor links
  // ===========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===========================================
  // = Navbar scroll effect
  // ===========================================
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)';
      }

      lastScroll = currentScroll;
    });
  }

  // ===========================================
  // = External links open in new tab
  // ===========================================
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ===========================================
  // = Copy code blocks
  // ===========================================
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.className = 'btn btn-sm btn-outline-secondary copy-btn';
    button.textContent = 'Copia';
    button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem;';

    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(button);

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = '✓ Copiato!';
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-success');

        setTimeout(() => {
          button.textContent = 'Copia';
          button.classList.remove('btn-success');
          button.classList.add('btn-outline-secondary');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

  // ===========================================
  // = Reading time estimator
  // ===========================================
  const articleContent = document.querySelector('article .content');
  if (articleContent) {
    const text = articleContent.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    const timeElement = document.createElement('span');
    timeElement.className = 'text-muted small ms-3';
    timeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>${readingTime} min di lettura`;

    const timeContainer = document.querySelector('article time');
    if (timeContainer) {
      timeContainer.parentElement.appendChild(timeElement);
    }
  }

  // ===========================================
  // = Print current year in footer
  // ===========================================
  const yearElements = document.querySelectorAll('.current-year');
  if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  console.log('dino-996 blog loaded successfully!');
})();