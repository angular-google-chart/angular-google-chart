/* global angular */
(function() {
    angular.module("googlechart")
        .factory("agcScriptTagHelper", agcScriptTagHelperFactory);

    agcScriptTagHelperFactory.$inject = ["$q", "$document"];
    function agcScriptTagHelperFactory($q, $document)
    {
        /** Add a script tag to the document's head section and return an angular
          * promise that resolves when the script has loaded.
          */
        function agcScriptTagHelper(url)
        {
            var deferred = $q.defer();
            var head = $document.getElementsByTagName('head')[0];
            var script = $document.createElement('script');

            script.setAttribute('type', 'text/javascript');
            script.src = url;

            if (script.addEventListener) { // Standard browsers (including IE9+)
                script.addEventListener('load', onLoad, false);
                script.onerror = onError;
            } else { // IE8 and below
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        onLoad();
                    }
                };
            }
            head.appendChild(script);

            function onLoad() {
                deferred.resolve();
            }

            function onError() {
                deferred.reject();
            }

            return deferred.promise;
        }

        return agcScriptTagHelper;
    }
})();
