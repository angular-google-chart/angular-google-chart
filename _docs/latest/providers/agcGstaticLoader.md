---
layout: docs
category: Providers
title: agcGstaticLoader
version: 1.0.0-beta.1
latest: true
---

This provider is the loader strategy implementation for the current
google chart "gstatic" loader version.

New loaders have been implemented as providers to provide a helpful
programmatic implementation for configuration.

### Methods
<table class="table">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><p><code>setVersion(value)</code></p></td>
        <td>Sets the frozen version of the Google Visualization API to use.</td>
        <td><p><code>'current'</code></p></td>
    </tr>
    <tr>
        <td><p><code>addPackage(packageName)</code></p></td>
        <td>Adds <code>packageName</code> to the list of Google Visualization API packages to be loaded.</td>
        <td><p><code>'corechart'</code></p></td>
    </tr>
    <tr>
        <td><p><code>removePackage(packageName)</code></p></td>
        <td>Removes <code>packageName</code> from the list of Google Visualization API packages to be loaded, if present.</td>
        <td><p><code>'corechart'</code></p></td>
    </tr>
    <tr>
        <td><p><code>setOption(key, value)</code></p></td>
        <td>Sets an option <code>key</code> on the loader configuration to the value set with <code>value</code>.</td>
        <td></td>
    </tr>
    <tr>
        <td><p><code>setOptions(value)</code></p></td>
        <td>Overwrites the entire underlying options object to the object passed as <code>value</code>. This is helpful for bulk setting of many options.</td>
        <td></td>
    </tr>
    <tr>
        <td><p><code>clearOption(key)</code></p></td>
        <td>Delete <code>key</code> from the options object. May be helpful to provide a quick override for a value set by a utility method in your application.</td>
        <td></td>
    </tr>
    <tr>
        <td><p><code>useBothLoaders(value)</code></p></td>
        <td>Pass <code>true</code> to add scripts for both jsapi and gstatic loaders. This is required for Google Visualization API versions before `45` if using `GeoChart` or `Map` types. Angular Google Chart handles this internally already, so this is here is an override to add special cases or cancel out the automatic setting.</td>
        <td><p><code>false</code></p></td>
    </tr>
</table>

### Example Code
{% highlight javascript %}
(function() {
    angular.module('myApp')
        .config(configLoader);
    
    configLoader.$inject = ['agcLibraryLoaderProvider', 'agcGstaticLoaderProvider'];
    
    function configLoader(agcLibraryLoaderProvider, agcGstaticLoaderProvider){

        // Select the loader strategy.
        agcLibraryLoaderProvider.setLoader('gstatic');

        // Provider supports method chaining.
        agcGstaticLoaderProvider
            .setVersion('45')
            .addPackage('map')
            .setOption('mapsApiKey', '[YOUR API KEY]');

    }
})();
{% endhighlight %}
