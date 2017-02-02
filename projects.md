---
layout: page
title: Projects
metatitle: Projects | Shane Gerhardt
metadesc: View projects completed by Shane Gerhardt, a professional web developer near San Francisco, California.
permalink: /projects/
---

<ul class="post-list">
  {% for post in site.categories.projects %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
  {% endfor %}
</ul>
