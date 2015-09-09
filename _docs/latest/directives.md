---
layout: docs
title: Directives
category: Directives
version: 0.0.11
latest: true
---

{% assign directives = site.docs | where:'version', page.version | where:'category', 'Directives' | where:'latest', page.latest %}

{% for directive in directives %}
{% if directive.title != directive.category %}
##### [{{ directive.title }}]({{ directive.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}