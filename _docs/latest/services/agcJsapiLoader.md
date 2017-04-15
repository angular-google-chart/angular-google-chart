---
layout: docs
category: Services
title: agcJsapiLoader
version: 1.0.0-beta.1
latest: true
---

Intended for internal use only. Instantiating this service will result
in a script tag being added to the site head, and once the library has
loaded, returns the Google Visualization API base object (`window.google`).

To use the Jsapi Loader in versions `1.0.0` forward, set the loader with
the `agcLibraryLoaderProvider`.

### Example Code
{% highlight javascript %}
(function() {
    angular.module('myApp')
        .config(configLoader);
    
    configLoader.$inject = ['agcLibraryLoaderProvider'];
    
    function configLoader(agcLibraryLoaderProvider){

        // Select the loader strategy.
        agcLibraryLoaderProvider.setLoader('jsapi');

    }
})();
{% endhighlight %}
