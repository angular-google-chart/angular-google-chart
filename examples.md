---
layout: docs
title: Examples
category: Examples
version: 1.0.0-beta.1
latest: true
permalink: "/docs/latest/examples/"
---

{% assign examples = site.docs | where:'version', page.version | where:'category', 'Examples' | where:'latest', page.latest %}

{% for example in examples %}
{% if example.title != example.category %}
##### [{{ example.title }}]({{ example.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}
