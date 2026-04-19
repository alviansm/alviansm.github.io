---
layout: page
title: Archive
permalink: /archive/
---

Archived writings — older or moved content that I want to keep accessible.

{% assign archive_by_year = site.archive | sort: "date" | reverse | group_by_exp: "item", "item.date | date: '%Y'" %}

{% for year in archive_by_year %}
## {{ year.name }}

{% for item in year.items %}
- {{ item.date | date: "%Y-%m-%d" }} –
  **[{{ item.title }}]({{ item.url | relative_url }})**
  {% if item.description %}
  — {{ item.description }}
  {% endif %}
{% endfor %}

{% endfor %}

{% if site.archive.size == 0 %}
*Nothing here yet.*
{% endif %}
