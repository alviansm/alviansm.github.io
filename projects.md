---
layout: page
title: Projects
permalink: /projects/
---

## Active Projects

{% assign active_projects = site.projects | where: "status", "Active" | sort: "title" %}

{% for project in active_projects %}
- **[{{ project.title }}]({{ project.url | relative_url }})**
  {% if project.short %}
  — {{ project.short }}
  {% endif %}
{% endfor %}

---

## Other Projects

{% assign other_projects = site.projects | where_exp: "p", "p.status != 'Active'" | sort: "title" %}

{% for project in other_projects %}
- **[{{ project.title }}]({{ project.url | relative_url }})**
  {% if project.short %}
  — {{ project.short }}
  {% endif %}
{% endfor %}
