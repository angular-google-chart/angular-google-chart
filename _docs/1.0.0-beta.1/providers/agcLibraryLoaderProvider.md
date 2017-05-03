---
layout: docs
category: Providers
title: agcLibraryLoaderProvider
version: 1.0.0-beta.1
latest: false
---

This provider configures a service that effectively replaces the `googleChartApiPromise`
service used in previous versions. It was replaced to provide an interface
for configuring the Google Visualization API loader process.

It uses the angular injector to find a loader implementation by the name pattern:

<p><code>"agc" + loaderName + "Loader"</code></p>

### Methods
<table class="table">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><p><code>setLoader(loaderName);</code></p></td>
        <td>Select the loader strategy implementation to get the Google Visualization API.</td>
        <td><p><code>Jsapi</code></p></td>
    </tr>
</table>

### Example Code
{% highlight javascript %}
(function (){
    angular.module('myApp')
        .config(configLoader);
    
    configLoader.$inject = ['agcLibraryLoaderProvider'];

    function configLoader(agcLibraryLoaderProvider){
        // Built-in options: "jsapi", "gstatic", "null".
        agcLibraryLoaderProvider.setLoader("gstatic");
    }
})();
{% endhighlight %}
