---
layout: docs
category: Providers
title: googleJsapiUrl
version: 0.1.0
latest: false
---

This provider is used to set the url to fetch the Google API from.

### Methods
<table class="table">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><p><code>setUrl(url);</code></p></td>
        <td>Sets the major part of the URL.</td>
        <td><p><code>//www.google.com/jsapi</code></p></td>
    </tr>
    <tr>
        <td><p><code>setProtocol(protocol)</code></p></td>
        <td>Sets the protocol to use when requesting the API.</td>
        <td><p><code>https:</code></p></td>
    </tr>
</table>

### Example Code
{% highlight javascript %}
(function(){
    angular.module(configGoogleAPI)
        .config(configGoogleAPI);
    
    configGoogleAPI.$inject = ['googleJsapiUrl'];
    
    function configGoogleAPI(googleJsapiUrl){
        googleJsapiUrl.setUrl('//www.google.com/jsapi');
    }
}();
{% endhighlight %}