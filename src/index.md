---
layout: layouts/page.njk
title: Home
---

<div class="hero-section text-center py-5 mb-5">
  <h1 class="display-4 fw-bold mb-3">
    Ciao, sono <span class="text-primary">Davide</span> 👋
  </h1>
  <p class="lead text-muted mb-4">
    Informatico appassionato di tecnologie moderne.<br>
    Condivido qui i miei progetti e articoli su programmazione e sicurezza informatica.
  </p>
  <div class="d-flex gap-3 justify-content-center">
    <a href="/blog/" class="btn btn-primary btn-lg">
      <i class="bi bi-journal-text me-2"></i>Leggi il Blog
    </a>
    <a href="/about/" class="btn btn-outline-primary btn-lg">
      <i class="bi bi-person me-2"></i>About
    </a>
  </div>
</div>

<hr class="my-5" />

<!-- Progetti recenti -->
<section class="mb-5">
  <div class="d-flex align-items-center justify-content-between mb-4">
    <h2 class="h3 fw-bold mb-0">
      <i class="bi bi-code-square text-primary me-2"></i>Progetti recenti
    </h2>
  </div>

  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-none" style="transform: none;">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-github fs-3 text-primary me-2"></i>
            <h3 class="h5 card-title mb-0">Personal Blog</h3>
          </div>
          <p class="card-text text-muted">
            Blog personale realizzato con Eleventy e Bootstrap. Include sistema di tag, pagination e dark mode.
          </p>
          <div class="mb-3">
            <span class="badge bg-light text-body border me-1 pe-none">Eleventy</span>
            <span class="badge bg-light text-body border me-1 pe-none">Bootstrap</span>
            <span class="badge bg-light text-body border pe-none">Nunjucks</span>
          </div>
          <div class="mt-auto">
            <a href="https://github.com/Dino-996/dino-996.github.io" target="_blank" class="btn btn-primary btn-sm mb-2 w-100">
              <i class="bi bi-github me-1"></i>Vedi su GitHub
            </a>
            <div class="text-start">
              <span class="badge bg-success pe-none">
                <i class="bi bi-check-circle me-1"></i>Completato
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-none" style="transform: none;">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-cloud-fill fs-3 text-primary me-2"></i>
              <h3 class="h5 card-title mb-0">Spring Boot API</h3>
            </div>
            <p class="card-text text-muted">
              API REST completa sviluppata con Spring Boot per la gestione utenti, con supporto per database PostgreSQL e H2.
            </p>
            <div class="mb-3">
              <span class="badge bg-light text-body border me-1 pe-none">Sping Boot</span>
            <span class="badge bg-light text-body border me-1 pe-none">API REST</span>
            </div>
            <div class="mt-auto">
              <a href="https://github.com/Dino-996/spring-boot-api" target="_blank" class="btn btn-primary btn-sm mb-2 w-100">
                <i class="bi bi-github me-1"></i>Vedi su GitHub
              </a>
              <div class="text-start">
                <span class="badge bg-success pe-none">
                  <i class="bi bi-check-circle me-1"></i>Completato
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-none" style="transform: none;">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-lightbulb fs-3 text-warning me-2"></i>
            <h3 class="h5 card-title mb-0">Prossimamente</h3>
          </div>
          <p class="card-text text-muted">
            Attualmente sto lavorando ad un progetto di cyber security. Torna a controllare tra qualche settimana!
          </p>
          <div class="mb-3">
            <span class="badge bg-light text-body border me-1 pe-none">In sviluppo</span>
          </div>
          <div class="mt-auto">
            <button class="btn btn-secondary btn-sm mb-2 w-100" disabled>
              <i class="bi bi-hourglass-split me-1"></i>Coming Soon
            </button>
            <div class="text-start">
              <span class="badge bg-warning text-dark pe-none">
                <i class="bi bi-gear-fill me-1"></i>In corso
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="my-5" />

<!-- Ultimi Articoli -->
<section class="mb-5">
  <div class="d-flex align-items-center justify-content-between mb-4">
    <h2 class="h3 fw-bold mb-0">
      <i class="bi bi-journal-text text-primary me-2"></i>Ultimi Articoli
    </h2>
    <a href="/blog/" class="btn btn-outline-primary btn-sm">
      Vedi tutti <i class="bi bi-arrow-right ms-1"></i>
    </a>
  </div>
  
  <div class="row g-4">{% assign recentPosts=collections.posts | reverse %}{% for post in recentPosts limit: 3 %}
  <div class="col-md-6 col-lg-4">
    <article class="card h-100 overflow-hidden shadow-none" style="transform: none">
      <div class="row g-0 h-100">{% if post.data.image %}
        <div class="col-12 p-0">
          <img 
            src="{{ post.data.image }}" 
            alt="{% if post.data.imageAlt %}{{ post.data.imageAlt }}{% else %}{{ post.data.title }}{% endif %}" 
            class="img-fluid w-100" 
            style="object-fit: cover; height: 200px;"
          >
        </div>{% endif %}
        <div class="col-12">
          <div class="card-body d-flex flex-column h-100">
            <div>
              <h2 class="h4 card-title mb-2">
                <a href="{{ post.url }}" class="text-decoration-none">{{ post.data.title }}</a>
              </h2>
              <time class="text-muted text-truncate small d-block mb-2" datetime="{{ post.date | dateIso }}">
                <i class="bi bi-calendar3 me-1"></i>{{ post.date | dateHuman }}
              </time>
              <hr>
              {% if post.data.description %}
              <p class="card-text">{{ post.data.description | truncate: 140 }}</p>
              {% endif %}
              {% if post.data.tags %}
              <div class="mb-3">
               <div class="d-flex flex-row gap-1">
                 <strong class="me-2">Tag:</strong>
                   {% for tag in post.data.tags %}
                     {% unless tag == "posts" %}
                     <a href="/tags/{{ tag | slugify }}/" class="badge bg-light text-body border text-decoration-none">{{ tag }}</a>
                     {% endunless %}
                   {% endfor %}
               </div>
              </div>
              {% endif %}
            </div>
            <div class="text-end mt-auto mb-3">
              <a href="{{ post.url }}" class="btn btn-primary btn-sm">
                Leggi l'articolo <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
  {% endfor %}
</div>
</section>

<!-- Call to Action -->
<section class="text-center py-5 bg-light rounded">
  <h2 class="h4 fw-bold mb-3">Vuoi rimanere aggiornato?</h2>
  <p class="text-muted mb-4">
    Seguimi sui social per non perdere i nuovi articoli e progetti
  </p>
  <div class="d-flex gap-3 justify-content-center">
    <a href="https://github.com/Dino-996" target="_blank" class="btn btn-dark">
      <i class="bi bi-github me-2"></i>GitHub
    </a>
    <a href="https://linkedin.com/in/davidesabia" target="_blank" class="btn btn-primary">
      <i class="bi bi-linkedin me-2"></i>LinkedIn
    </a>
  </div>
</section>