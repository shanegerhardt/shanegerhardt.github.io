---
layout: page
title: Articles
metatitle: Articles | Shane Gerhardt
metadesc: Read articles by Shane Gerhardt, a professional web developer near San Francisco, California.
permalink: /articles/
---

<ul class="post-list">
  {% for post in site.categories.article %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
  {% endfor %}
</ul>

<p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
