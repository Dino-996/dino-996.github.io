"use strict";
(function () {
    // ===========================================
    // = BOOTSTRAP TOGGLE THEME
    // ===========================================

    /* 
    Notifica Giscus del cambio tema tramite postMessage.
    L'iframe di Giscus ascolta questo evento e aggiorna il proprio tema senza ricaricare i commenti.
    @param { 'light' | 'dark' } theme
    */

    function syncGiscusTheme(theme) {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            'https://giscus.app'
        );
    }

    function initThemeToggle() {
        const toggles = document.querySelectorAll('.theme-toggle');
        if (toggles.length === 0) return;

        function setActiveTheme(theme) {
            toggles.forEach(toggle => {
                const buttons = toggle.querySelectorAll('.theme-toggle-btn');
                const slider = toggle.querySelector('.theme-toggle-slider');
                buttons.forEach(b => {
                    const isActive = b.dataset.theme === theme;
                    b.classList.toggle('active', isActive);
                    b.setAttribute('aria-pressed', isActive);
                });
                if (slider) {
                    slider.style.transform = theme === 'dark' ? 'translateX(100%)' : 'translateX(0)';
                }
            });
            localStorage.setItem('bs-theme', theme);
            document.documentElement.setAttribute('data-bs-theme', theme);
            syncGiscusTheme(theme);
        }

        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        toggles.forEach(toggle => {
            const buttons = toggle.querySelectorAll('.theme-toggle-btn');
            const slider = toggle.querySelector('.theme-toggle-slider');
            buttons.forEach(b => {
                const isActive = b.dataset.theme === currentTheme;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive);
            });
            if (slider) {
                slider.style.transform = currentTheme === 'dark' ? 'translateX(100%)' : 'translateX(0)';
            }
            buttons.forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    setActiveTheme(this.dataset.theme);
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }

    // ===========================================
    // = BLOG SEARCH
    // ===========================================

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const postsList = document.getElementById('posts-list');
    const paginationEl = document.getElementById('pagination');

    if (searchInput && searchButton) {
        let posts = [];
        async function loadPosts() {
            if (posts.length > 0) return;
            try {
                const res = await fetch('/search.json');
                posts = await res.json();
            } catch (err) {
                console.error('Errore nel caricamento di search.json:', err);
            }
        }

        function renderResults(query) {
            const q = query.trim().toLowerCase();
            if (!q) {
                searchResults.hidden = true;
                searchResults.innerHTML = '';
                postsList.hidden = false;
                if (paginationEl) paginationEl.hidden = false;
                return;
            }

            const filtered = posts.filter(p =>
                p.title.toLowerCase().includes(q)
            );

            postsList.hidden = true;
            if (paginationEl) paginationEl.hidden = true;
            searchResults.hidden = false;

            if (filtered.length === 0) {
                searchResults.innerHTML = `
                    <div class="text-center py-4 text-muted">
                    <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                    Nessun articolo trovato per "<strong>${query}</strong>"
                    </div>`;
                return;
            }

            searchResults.innerHTML = `
                <div class="row g-4">
                    ${filtered.map(p => `
                        <div class="col-12">
                            <article class="card shadow-sm">
                                <div class="card-body">
                                    <h2 class="h4 mb-1">
                                        <a href="${p.url}" class="text-decoration-none">${p.title}</a>
                                    </h2>
                                    ${p.description ? `<p class="text-muted mb-2 small">${p.description}</p>` : ''}
                                    <div class="d-flex flex-row-reverse mt-3">
                                        <a href="${p.url}" class="btn btn-primary btn-sm w-25 rounded">
                                            Leggi l'articolo <i class="bi bi-arrow-right ms-1"></i>
                                        </a>
                                    </div>
                                </div>

                            </article>
                        </div>`).join('')}
                </div>`;
            }

        async function doSearch() {
            await loadPosts();
            renderResults(searchInput.value);
        }

        // Click sul bottone
        searchButton.addEventListener('click', doSearch);

        // Invio da tastiera
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doSearch();
        });

        // Svuota i risultati se l'input viene cancellato manualmente
        searchInput.addEventListener('input', () => {
            if (searchInput.value === '') renderResults('');
        });
    }

    // ===========================================
    // = SMOOTH SCROOL FOR ANCHOR LINK
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
    // = NAVBAR SCROLL
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
    // = EXTERNAL LINK IN NEW TAB
    // ===========================================

    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ===========================================
    // = COPY CODE BLOCKS
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
                button.textContent = 'Copiato!';
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
    // = READING TIME ESTIMATOR
    // ===========================================

    const articleContent = document.querySelector('article .content');
    if (articleContent) {
        const text = articleContent.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(wordCount / 200);
        document.querySelectorAll('.reading-time').forEach(el => {
            el.innerHTML = `<i class="bi bi-clock me-1"></i>${minutes} min di lettura`;
        });
    }

    // ===========================================
    // = READING PROGRESS BAR
    // ===========================================

    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
            progressBar.style.width = `${progress}%`;
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ===========================================
    // = TABLE OF CONTENTS + SCROLL-SPY
    // ===========================================

    function buildToc(listEl, headings) {
        if (!listEl || headings.length === 0) return [];
        const links = [];
        const fragment = document.createDocumentFragment();
        let currentParent = null;

        headings.forEach(h => {
            const id = h.id;
            const text = h.textContent.trim();
            if (!id || !text) return;

            if (h.tagName === 'H2') {
                const li = document.createElement('li');
                li.className = 'toc-item toc-h2';
                li.dataset.target = id;
                li.innerHTML = `<a href="#${id}" class="toc-link">${text}</a>`;
                fragment.appendChild(li);
                currentParent = li;
                links.push(li.querySelector('.toc-link'));
            } else if (h.tagName === 'H3' && currentParent) {
                let subUl = currentParent.querySelector('.toc-sublist');
                if (!subUl) {
                    subUl = document.createElement('ul');
                    subUl.className = 'toc-sublist';
                    currentParent.appendChild(subUl);
                }
                const li = document.createElement('li');
                li.className = 'toc-item toc-h3';
                li.dataset.target = id;
                li.innerHTML = `<a href="#${id}" class="toc-link">${text}</a>`;
                subUl.appendChild(li);
                links.push(li.querySelector('.toc-link'));
            }
        });

        listEl.appendChild(fragment);
        return links;
    }

    function setupTocClick(listEl) {
        if (!listEl) return;
        const NAV_OFFSET = 90;
        listEl.addEventListener('click', (e) => {
            const link = e.target.closest('.toc-link');
            if (!link) return;
            e.preventDefault();
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
                history.replaceState(null, '', `#${id}`);
            }
        });
    }

    function setupScrollSpy(listEl, headings, links) {
        if (!listEl || headings.length === 0 || links.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            let activeId = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) activeId = entry.target.id;
            });
            if (activeId) {
                links.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
                });
                const activeItem = listEl.querySelector(`.toc-item[data-target="${activeId}"]`);
                if (activeItem) {
                    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        }, {
            rootMargin: '-90px 0px -60% 0px',
            threshold: 0
        });
        headings.forEach(h => observer.observe(h));
    }

    const contentEl = document.querySelector('.content');
    if (contentEl) {
        const headings = contentEl.querySelectorAll('h2[id], h3[id]');

        // Desktop ToC
        const tocList = document.getElementById('toc-list');
        if (tocList && headings.length > 0) {
            const links = buildToc(tocList, headings);
            setupTocClick(tocList);
            setupScrollSpy(tocList, headings, links);
        }

        // Mobile ToC
        const tocMobileList = document.getElementById('toc-list-mobile');
        if (tocMobileList && headings.length > 0) {
            const links = buildToc(tocMobileList, headings);
            setupTocClick(tocMobileList);
        }
    }

    // ===========================================
    // = PRINT CURRENT YEAR IN FOOTER
    // ===========================================
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    console.log('✨ dino-996 blog loaded successfully!');

})();