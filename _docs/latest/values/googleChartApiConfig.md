---
layout: docs
category: Values
title: googleChartApiConfig
version: 0.0.11
latest: true
---

This value can be overriden by setting it on your module. It is used by the
googleChartApiPromise service to configure the Google Loader to bring in the
version and packages you want in your app.

#### Example Code
{% highlight javascript %}
(function(){
    angular.module('google-chart-sample')
        .value('googleChartApiConfig', {
            version: '1.1',
            optionalSettings: {
                packages: ['gauge'] //load just the package you want
            }
        });
})();
{% endhighlight %}