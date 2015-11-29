---
layout: docs
title: Getting Started
category: Guides
version: 0.1.0
latest: false
---

### Install with Bower

```
$ bower install angular-google-chart#0.1.0 --save
```

### Install with NPM

```
$ npm install --save angular-google-chart@0.1.0
```

### Download from GitHub

You can download release archives from the official GitHub repository's release page.

[https://github.com/angular-google-chart/angular-google-chart/releases](https://github.com/angular-google-chart/angular-google-chart/releases)

### From a CDN

Angular Google Chart is hosted with [cdnjs.com](https://cdnjs.com/libraries/angular-google-chart).

{% highlight HTML %}
<!-- unminified for development -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.1.0/ng-google-chart.js" type="text/javascript"></script>

<!-- minified for production -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.1.0/ng-google-chart.min.js" type="text/javascript"></script>
{% endhighlight%}

### Add Module Dependency to your App

{% highlight JavaScript %}
angular.module('myApp', ['googlechart']);
{% endhighlight %}