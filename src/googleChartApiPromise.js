/* global angular */
(function(){
    angular.module('googlechart')
        .factory('googleChartApiPromise', googleChartApiPromiseFactory);
        
    googleChartApiPromiseFactory.$inject = ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl'];
        
    function googleChartApiPromiseFactory($rootScope, $q, apiConfig, googleJsapiUrl) {
        apiConfig.optionalSettings = apiConfig.optionalSettings || {};
        var apiReady = $q.defer();
        var onLoad = function () {
            // override callback function
            var settings = {
                callback: function () {
                    var oldCb = apiConfig.optionalSettings.callback;
                    $rootScope.$apply(function () {
                        apiReady.resolve(google);
                    });

                    if (angular.isFunction(oldCb)) {
                        oldCb.call(this);
                    }
                }
            };

            settings = angular.extend({}, apiConfig.optionalSettings, settings);

            window.google.load('visualization', apiConfig.version, settings);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.src = googleJsapiUrl;

        if (script.addEventListener) { // Standard browsers (including IE9+)
            script.addEventListener('load', onLoad, false);
        } else { // IE8 and below
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    onLoad();
                }
            };
        }
        head.appendChild(script);

        return apiReady.promise;
    }
})();