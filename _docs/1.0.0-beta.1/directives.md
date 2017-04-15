---
layout: docs
title: Directives
category: Directives
version: 1.0.0-beta.1
latest: false
---

{% assign directives = site.docs | where:'version', page.version | where:'category', 'Directives' | where:'latest', page.latest %}

{% for directive in directives %}
{% if directive.title != directive.category %}
##### [{{ directive.title }}]({{ directive.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}
