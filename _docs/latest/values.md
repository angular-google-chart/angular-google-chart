---
layout: docs
title: Values
category: Values
version: 1.0.0-beta.1
latest: true
---

{% assign values = site.docs | where:'version', page.version | where:'category', 'Values' | where:'latest', page.latest %}

{% for value in values %}
{% if value.title != value.category %}
##### [{{ value.title }}]({{ value.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}
