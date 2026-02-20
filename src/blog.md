---
layout: layouts/page.njk
title: Blog
description: Articoli e appunti
pagination:
  data: collections.posts
  size: 5
  alias: posts
permalink: "{% if pagination.pageNumber > 0 %}/blog/page/{{ pagination.pageNumber | plus: 1 }}/index.html{% else %}/blog/index.html{% endif %}"
---

<h1>
  <i class="text-primary bi bi-journal-text me-1"></i>
  {{ title }}
</h1>

<div class="mb-4">
  <div class="input-group">
    <span class="input-group-text bg-body border-end-0">
      <i class="bi bi-search text-muted"></i>
    </span>
    <input
      type="search"
      id="search-input"
      class="form-control border-start-0 border-end-0 ps-0"
      placeholder="Cerca un articolo per titolo..."
      aria-label="Cerca articoli"
      autocomplete="off"
    >
    <button id="search-button" class="btn btn-primary shadow-none" type="button" style="transform: none;">
      Cerca
    </button>
  </div>
  <div id="search-results" class="mt-3" hidden></div>
</div>

<section id="posts-list" class="row g-4">{% for post in posts %}
  <div class="col-12">
    <article class="card h-100 overflow-hidden shadow-sm">
      <div class="row g-0 h-100">{% if post.data.image %}
        <div class="col-md-4 p-0">
          <img src="{{ post.data.image }}" alt="{% if post.data.imageAlt %}{{ post.data.imageAlt }}{% else %}{{ post.data.title }}{% endif %}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 250px; max-height: 400px">
        </div>
      <div class="col-md-8">{% else %}
        <div class="col-12">{% endif %}
          <div class="card-body d-flex flex-column h-100">
            <div>
              <h2 class="h4 card-title mb-2">
                <a href="{{ post.url }}" class="text-decoration-none">{{ post.data.title }}</a>
              </h2>
              <time class="text-muted text-truncate small d-block mb-2" datetime="{{ post.date | dateIso }}">
                <i class="bi bi-calendar3 me-1"></i>{{ post.date | dateHuman }}
              </time>
              <hr>{% if post.data.description %}
              <p class="card-text">{{ post.data.description }}</p>{% endif %}{% if post.data.tags %}
              <div class="mb-3"><span class="fw-bold me-2">Tag:</span>{% for tag in post.data.tags %}{% if tag != "posts" %}
                <a href="/tags/{{ tag | slug }}/" class="badge bg-light text-body border text-decoration-none">{{ tag }}</a>{% endif %}{% endfor %}
              </div>{% endif %}</div>
              <div class="text-end mt-auto mb-3">
                <a href="{{ post.url }}" class="btn btn-primary btn-sm">Leggi l'articolo <i class="bi bi-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
        </div>
    </article>
  </div>{% endfor %}
</section>

<nav id="pagination" class="mt-5" aria-label="Navigazione pagine blog">
  <div class="d-flex justify-content-between align-items-center">
    <div>
      {% if pagination.previousPageHref %}
        <a href="{{ pagination.previousPageHref }}" class="btn btn-outline-primary">
          <i class="bi bi-arrow-left me-1"></i>Precedente
        </a>
      {% endif %}
    </div>
    <div class="text-muted small">
      Pagina {{ pagination.pageNumber | plus: 1 }} di {{ pagination.pages | size }}
    </div>
    <div>
      {% if pagination.nextPageHref %}
        <a href="{{ pagination.nextPageHref }}" class="btn btn-outline-primary">
          Successivo<i class="bi bi-arrow-right ms-1"></i>
        </a>
      {% endif %}
    </div>
  </div>
</nav>