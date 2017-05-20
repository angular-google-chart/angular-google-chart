/* global angular */
(function() {
    angular.module("googlechart")
        .factory("agcJsapiLoader", agcJsapiLoaderFactory);

    agcJsapiLoaderFactory.$inject = ["$rootScope", "$q", "agcScriptTagHelper", "googleChartApiConfig"];
    function agcJsapiLoaderFactory($rootScope, $q, agcScriptTagHelper, googleChartApiConfig){
        var apiReady = $q.defer();
        // Massage configuration as needed.
        googleChartApiConfig.optionalSettings = googleChartApiConfig.optionalSettings || {};

        var userDefinedCallback = googleChartApiConfig.optionalSettings.callback;

        var settings = {
            callback: function() {
                if (angular.isFunction(userDefinedCallback))
                    userDefinedCallback.call(this);

                $rootScope.$apply(function(){
                    apiReady.resolve(google);
                });
            }
        };

        settings = angular.extend({}, googleChartApiConfig.optionalSettings, settings);

        agcScriptTagHelper("https://www.google.com/jsapi")
            .then(function(){
                window.google.load('visualization', googleChartApiConfig.version || '1', settings);
            })
            .catch(function(){
                apiReady.reject();
            });

        return apiReady.promise;
    }   
})();
