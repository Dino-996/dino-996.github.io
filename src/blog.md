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
    <span class="input-group-text bg-body rounded-start-3">
      <i class="bi bi-search text-muted"></i>
    </span>
    <input
      type="search"
      id="search-input"
      class="form-control border-2 ps-0 ml-3"
      placeholder="Cerca un articolo per titolo..."
      aria-label="Cerca articoli"
      autocomplete="off"
    >
    <button id="search-button" class="btn btn-primary shadow-none rounded-end-3" type="button" style="transform: none;">
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
              <hr>
              <div class="mb-3">
                {% if post.data.description.size > 160 %}
                  <div class="text-truncate">{{ post.data.description }}<div>
                {% else %}
                  {{ post.data.description }}
                {% endif %}
                </div>
              {% assign rawTags = post.data.strapiTags | split: "," %}
              {% if rawTags %}
                <div class="mb-3 d-flex flex-wrap align-items-baseline gap-2">
                  <span class="fw-bold small text-uppercase">Tag:</span>
                  {% for t in rawTags %}
                    {% assign cleanTag = t | strip %}
                    {% unless cleanTag == "posts" or cleanTag == "" %}
                      <a href="/tags/{{ cleanTag | slugify }}/"
                         class="badge border text-decoration-none d-inline-flex align-items-center"
                         style="color: var(--bs-body-color); border-color: var(--bs-border-color) !important; padding: 0.4em 0.6em; line-height: 1;">
                        {{ cleanTag }}
                      </a>
                    {% endunless %}
                  {% endfor %}
                </div>
              </div>
              {% endif %}
              <div class="text-end mt-auto mb-3">
                <a href="{{ post.url }}" class="btn btn-primary btn-sm rounded">Leggi l'articolo <i class="bi bi-arrow-right ms-1"></i></a>
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
        <a href="{{ pagination.previousPageHref }}" class="btn btn-outline-primary rounded">
          <i class="bi bi-arrow-left me-1"></i>Precedente
        </a>
      {% endif %}
    </div>
    <div class="text-muted small">
      Pagina {{ pagination.pageNumber | plus: 1 }} di {{ pagination.pages | size }}
    </div>
    <div>
      {% if pagination.nextPageHref %}
        <a href="{{ pagination.nextPageHref }}" class="btn btn-outline-primary rounded">
          Successivo<i class="bi bi-arrow-right ms-1"></i>
        </a>
      {% endif %}
    </div>
  </div>
</nav>