"use strict";
(function () {
    // ===========================================
    // = THEME TOGGLE
    // ===========================================

    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');
        if (!btn) return;

        function getPreferredTheme() {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        function applyTheme(theme) {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            if (sunIcon && moonIcon) {
                sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
                moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
            }
            syncGiscusTheme(theme);
        }

        btn.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });

        // Apply saved or OS preference on load
        applyTheme(getPreferredTheme());
    }

    // ===========================================
    // = OS THEME — GISCUS SYNC
    // ===========================================

    function syncGiscusTheme(theme) {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: theme } } },
            'https://giscus.app'
        );
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        syncGiscusTheme(e.matches ? 'dark' : 'light');
    });

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

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
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
                    <div style="text-align: center; padding: 32px 16px; color: var(--secondary);">
                    Nessun articolo trovato per "<strong>${escapeHtml(query)}</strong>"
                    </div>`;
                return;
            }

            searchResults.innerHTML = `
                <div>
                    ${filtered.map(p => `
                        <article class="article-item search-result-item" style="padding: 16px;">
                            <h3 style="font-family: var(--font-serif); font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">
                                <a href="${escapeHtml(p.url)}">${escapeHtml(p.title)}</a>
                            </h3>
                            ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}
                        </article>`).join('')}
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
    // = SMOOTH SCROLL FOR ANCHOR LINK
    // ===========================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // i link della ToC hanno il loro handler dedicato (setupTocClick) con offset corretto
        if (anchor.closest('.toc-list')) return;
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================================
    // = HEADER SCROLL
    // ===========================================

    let headerFrame = null;
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (headerFrame) return;
            headerFrame = requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                siteHeader.style.boxShadow = currentScroll > 50 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none';
                headerFrame = null;
            });
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
        button.className = 'copy-btn';
        button.textContent = 'Copia';
        const pre = block.parentElement;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(button);
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copiato!';
                button.style.background = 'rgba(0, 200, 80, 0.3)';
                button.style.color = '#fff';
                setTimeout(() => {
                    button.textContent = 'Copia';
                    button.style.background = '';
                    button.style.color = '';
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
            el.innerHTML = `${minutes} min di lettura`;
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
                window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
                    activeItem.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
            setupScrollSpy(tocMobileList, headings, links);
        }
    }

    // ===========================================
    // = MOBILE TOC TOGGLE
    // ===========================================

    const tocToggle = document.getElementById('toc-toggle');
    const tocMobile = document.getElementById('toc-mobile');
    const tocChevron = document.getElementById('toc-chevron');
    if (tocToggle && tocMobile) {
        tocToggle.addEventListener('click', function () {
            const isOpen = tocMobile.style.display === 'block';
            tocMobile.style.display = isOpen ? 'none' : 'block';
            if (tocChevron) tocChevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
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

    // ===========================================
    // = NEWSLETTER (Supabase + EmailJS)
    // ===========================================
    const EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || '';
    const EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || '';
    const EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || '';

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const newsletterInput = document.getElementById('newsletter-email');
    const newsletterBtn = document.getElementById('newsletter-submit');
    const newsletterMsg = document.getElementById('newsletter-message');

    let supabaseClient = null;
    if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
        supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    }

    function setNewsletterMessage(text, type) {
        if (!newsletterMsg) return;
        newsletterMsg.textContent = text;
        newsletterMsg.className = 'newsletter-message';
        if (type) newsletterMsg.classList.add('is-' + type);
        newsletterMsg.hidden = false;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function subscribeNewsletter() {
        const email = newsletterInput?.value.trim();

        if (!validateEmail(email)) {
            setNewsletterMessage('Inserisci un indirizzo email valido.', 'error');
            return;
        }

        if (!supabaseClient) {
            setNewsletterMessage('Servizio non configurato. Riprova più tardi.', 'error');
            return;
        }

        newsletterBtn.disabled = true;
        newsletterInput.disabled = true;
        newsletterBtn.classList.add('is-loading');
        newsletterMsg.hidden = true;

        try {
            // 1. INSERT via Supabase JS client
            const { data, error } = await supabaseClient
                .from('subscribers')
                .insert({ email })
                .select('unsubscribe_token')
                .single();

            if (error) {
                if (error.code === '23505') {
                    setNewsletterMessage('Sei già iscritto alla newsletter.', 'error');
                    return;
                }
                console.error('Supabase error:', error);
                setNewsletterMessage('Errore durante l\'iscrizione. Riprova più tardi.', 'error');
                return;
            }

            const token = data?.unsubscribe_token;
            const baseUrl = window.location.origin;
            const unsubscribeUrl = baseUrl + '/unsubscribe/?token=' + token;
            const date = new Date().toLocaleDateString('it-IT', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // 2. Email di conferma via EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    email,
                    date,
                    unsubscribe_url: unsubscribeUrl
                });
            }

            setNewsletterMessage('Grazie per esserti iscritto! Riceverai i prossimi aggiornamenti.', 'success');
            newsletterInput.value = '';

        } catch (err) {
            console.error('Newsletter error:', err);
            setNewsletterMessage('Errore durante l\'iscrizione. Riprova più tardi.', 'error');
        } finally {
            newsletterBtn.disabled = false;
            newsletterInput.disabled = false;
            newsletterBtn.classList.remove('is-loading');
        }
    }

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }

    console.log('✨ DinoSec loaded successfully!');

    // Init theme toggle
    initThemeToggle();

})();