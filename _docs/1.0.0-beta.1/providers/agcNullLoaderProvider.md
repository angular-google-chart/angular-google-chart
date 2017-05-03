---
layout: docs
category: Providers
title: agcNullLoaderProvider
version: 1.0.0-beta.1
latest: false
---

This provider configures a loader that is just a shim for activating the
library when script tags and loader calls for the Google Visualization API
are already present. This could be for testing purposes, or for edge cases
like usage with the Google Analytics Embeded API.

Also allows the passing of an override `google` object which will be used
by angular-google-chart regardless of whether there is a `google` object
on the global scope.

See also: [agcLibraryLoaderProvider]({{ site.baseurl }}{% link _docs/1.0.0-beta.1/providers/agcLibraryLoaderProvider.md %}),
[agcNullLoader Service]({{ site.baseurl }}{% link _docs/1.0.0-beta.1/services/agcNullLoader.md %}).

### Methods
<table class="table">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><p><code>getTriggerFunction();</code></p></td>
        <td>If the trigger function has been fetched, the provider will wait for the function to be called before resolving the loader promise.</td>
        <td></td>
    </tr>
    <tr>
        <td><p><code>overrideLibrary(library);</code></p></td>
        <td>Set an object that effectively replaces the `google` object for all of the Angular Google Chart library. Useful for mocking and monkey patching.</td>
        <td><p><code>window.google</code></p></td>
    </tr>
</table>
### Example Code
{% highlight javascript %}
(function(){
    angular.module('myApp')
        .config(configLoader);
    
    configLoader.$inject = ['agcLibraryLoaderProvider', 'agcNullLoaderProvider'];
    
    function configLoader(agcLibraryLoaderProvider, agcNullLoaderProvider){

        // Select the loader strategy.
        agcLibraryLoaderProvider.setLoader("null");

        // Get the trigger function.
        var callback = agcLibraryLoaderProvider.getTriggerFunction();

        // Does effectively the same as the gstatic loader,
        // but without adding a script tag for you.
        google.charts.load('45', {packages: ['corechart']});
        google.charts.setOnLoadCallback(callback);
    }
}();
{% endhighlight %}
