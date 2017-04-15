---
layout: docs
title: Guides
category: Guides
version: 1.0.0-beta.1
latest: false
---

{% assign examples = site.docs | where:'version', page.version | where:'category', 'Guides' | where:'latest', page.latest %}

{% for example in examples %}
{% if example.title != example.category %}
##### [{{ example.title }}]({{ example.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}
