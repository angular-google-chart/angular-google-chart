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
            var head = $document.find('head');
            var script = angular.element('<script></script>');

            script.attr('type', 'text/javascript');

            script.on('load', onLoad);
            script.on('error', onError);

            script.attr('src', url);

            // This: head.append(script);
            // Adds the tag, but event handles don't work.
            // Workaround is to add element with native appendChild().
            head[0].appendChild(script[0]);

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
