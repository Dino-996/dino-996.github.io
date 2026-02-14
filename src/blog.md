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

<h1>{{ title }}</h1>

<div class="row g-4">{% for post in posts %}
  <div class="col-12">
    <article class="card h-100 overflow-hidden">
      <div class="row g-0 h-100">{% if post.data.image %}
        <div class="col-md-4 p-0">
          <img src="{{ post.data.image }}" alt="{% if post.data.imageAlt %}{{ post.data.imageAlt }}{% else %}{{ post.data.title }}{% endif %}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 250px;">
        </div>
      <div class="col-md-8">{% else %}
        <div class="col-12">{% endif %}
          <div class="card-body d-flex flex-column h-100">
            <div>
              <h2 class="h4 card-title mb-2">
                <a href="{{ post.url }}" class="text-decoration-none">{{ post.data.title }}</a>
              </h2>
              <time class="text-muted text-truncate small d-block mb-2" datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%d %B %Y' }}</time>
              <hr>{% if post.data.description %}
              <p class="card-text">{{ post.data.description | markdown }}
              </p>{% endif %}{% if post.data.tags %}
              <div class="mb-3"><span>Tag:</span>{% for tag in post.data.tags %}{% unless tag == "posts" %}
                <a href="/tags/{{ tag | slugify }}/" class="badge bg-secondary text-decoration-none">{{ tag }}</a>{% endunless %}{% endfor %}
              </div>{% endif %}</div>
              <div class="text-end mt-auto mb-3">
                <a href="{{ post.url }}" class="btn btn-outline-primary btn-sm">Leggi l'articolo →</a>
              </div>
            </div>
          </div>
        </div>
    </article>
  </div>{% endfor %}
</div>

<nav class="mt-5">
  {% if pagination.previousPageHref %}
    <a href="{{ pagination.previousPageHref }}" class="btn btn-outline-primary">← Precedente</a>
  {% endif %}
  {% if pagination.nextPageHref %}
    <a href="{{ pagination.nextPageHref }}" class="btn btn-outline-primary float-end">Successivo →</a>
  {% endif %}
</nav>