---
layout: layouts/page.njk
title: home
---

<div class="row">
  <h1>{{ title }}</h1>

  {% for post in collections.posts %}
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ post.data.title }}</h5>
        <p class="card-text">{{ post.data.description }}</p>
        <div class="text-end mt-auto mb-3">
          <a class="btn btn-primary text-end" type="button" href="{{ post.url }}">Leggi l'articolo →</a>
        </div>
      </div>
    </div>
  </div>
  {% endfor %}

</div>
