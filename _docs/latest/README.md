---
layout: post
version: 0.0.11
latest: true
title: Readme
permalink: /docs/latest/index.html
---

- [Guides]({{site.baseurl}}/docs/{{page.version}}/guides/)
{% assign guides = site.docs | where:'version', page.version | where:'category', 'Guides' | where:'latest', page.latest %}
{% for guide in guides %}
{% if guide.title != guide.category %}
  - [{{ guide.title }}]({{ guide.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}

- [Examples]({{site.baseurl}}/docs/{{page.version}}/examples/)
{% assign examples = site.docs | where:'version', page.version | where:'category', 'Examples' | where:'latest', page.latest %}
{% for example in examples %}
{% if example.title != example.category %}
  - [{{ example.title }}]({{ example.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}

- [Providers]({{site.baseurl}}/docs/{{page.version}}/providers/)
{% assign providers = site.docs | where:'version', page.version | where:'category', 'Providers' | where:'latest', page.latest %}
{% for provider in providers %}
{% if provider.title != provider.category %}
  - [{{ provider.title }}]({{ provider.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}

- [Values]({{site.baseurl}}/docs/{{page.version}}/values)
{% assign values = site.docs | where:'version', page.version | where:'category', 'Values' | where:'latest', page.latest %}
{% for value in values %}
{% if value.title != value.category %}
  - [{{ value.title }}]({{ value.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}

- [Services]({{site.baseurl}}/docs/{{page.version}}/services/)
{% assign services = site.docs | where:'version', page.version | where:'category', 'Services' | where:'latest', page.latest %}

{% for service in services %}
{% if service.title != service.category %}
  - [{{ service.title }}]({{ service.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}

- [Directives]({{site.baseurl}}/docs/{{page.version}}/directives/)
{% assign directives = site.docs | where:'version', page.version | where:'category', 'Directives' | where:'latest', page.latest %}
{% for directive in directives %}
{% if directive.title != directive.category %}
  - [{{ directive.title }}]({{ directive.url | prepend: site.baseurl }})
{% endif%}
{% endfor %}