---
layout: layouts/page.njk
title: About
---

  <!-- Hero narrativo -->
  <section class="mb-5">
    <h1 class="fw-bold mb-3">
        <i class="text-primary bi bi-person me-1"></i>
        {{ title }}
    </h1>
    <p class="lead text-muted">
      Sono un informatico orientato alla costruzione di software solido,
      con interesse per architettura backend e sicurezza applicativa.
    </p>
  </section>

  <div class="row g-4">
    <!-- Stack -->
    <div class="col-12 col-md-6">
      <div class="card h-100 shadow-none border" style="transform: none">
        <div class="card-body">
          <h3 class="h5 mb-3">Stack</h3>
          <p class="mb-2">
            <strong>Backend</strong><br>
            <span class="badge bg-light text-body border me-1">Java</span>
            <span class="badge bg-light text-body border me-1">Spring Boot</span>
            <span class="badge bg-light text-body border">PostgreSQL</span>
          </p>
          <p class="mb-0">
            <strong>Frontend</strong><br>
            <span class="badge bg-light text-body border me-1">Angular</span>
            <span class="badge bg-light text-body border me-1">TypeScript</span>
            <span class="badge bg-light text-body border">Bootstrap</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Blog -->
    <div class="col-12 col-md-6">
      <div class="card h-100 shadow-none border" style="transform: none">
        <div class="card-body d-flex flex-column">
          <h3 class="h5 mb-3">Il Blog</h3>
          <p class="text-muted mb-3">
            Uno spazio di studio pubblico dove documento ciò che imparo,
            con particolare attenzione a sviluppo web e sicurezza.
          </p>
          <div class="mt-auto">
            <a href="https://github.com/Dino-996" target="_blank"
               class="btn btn-dark btn-sm w-100">
              <i class="bi bi-github me-1"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Contatti full width -->
    <div class="col-12">
      <div class="card shadow-none border" style="transform: none">
        <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h3 class="h5 mb-1">Contatti</h3>
            <p class="text-muted mb-0">Disponibile per collaborazioni e progetti.</p>
          </div>
          <a href="mailto:davidesabia22@gmail.com"
             class="btn btn-outline-primary btn-sm">
            <i class="bi bi-envelope-fill me-1"></i>
            Email
          </a>
        </div>
      </div>
    </div>
  </div>
