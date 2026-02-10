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

<ul class="list-unstyled border rounded p-2">
  {% for post in posts %}
    <li class="mb-4">
      <article>
        <h2 class="h4 mb-1">
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </h2>

        <time class="text-muted small" datetime="{{ post.date | dateIso }}">
          {{ post.date | dateHuman }}
        </time>

        <hr />

        {% if post.data.description %}
          <p class="mt-2 mb-0">{{ post.data.description }}</p>
        {% endif %}

        {% if post.data.tags %}
          <p class="mt-1">
            Tag:
            {% for tag in post.data.tags %}
              <a href="/tags/{{ tag | slug }}/" class="badge bg-secondary">{{ tag }}</a>
            {% endfor %}
          </p>
        {% endif %}
      </article>
    </li>
  {% endfor %}
</ul>

<nav class="mt-5">
  {% if post.data.tags %}
  <p>
    Tag:
    {% for tag in post.data.tags %}
      <a href="/tags/{{ tag | slug }}/" class="badge bg-secondary">{{ tag }}</a>
    {% endfor %}
  </p>
  {% endif %}
</nav>

{% for tag in collections.tagsList %}
  {{ tag }} -> {{ tag | slug }}
{% endfor %}