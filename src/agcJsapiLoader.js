/* global angular */
(function() {
    angular.module("googlechart")
        .factory("agcJsapiLoader", agcJsapiLoaderFactory);

    agcJsapiLoaderFactory.$inject = ["$log", "$rootScope", "$q", "agcScriptTagHelper", "googleChartApiConfig"];
    function agcJsapiLoaderFactory($log, $rootScope, $q, agcScriptTagHelper, googleChartApiConfig){
        $log.debug("[AGC] jsapi loader invoked.");
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

        $log.debug("[AGC] Calling tag helper...");
        agcScriptTagHelper("//www.google.com/jsapi")
            .then(function(){
                $log.debug("[AGC] Tag helper returned success.");
                window.google.load('visualization', googleChartApiConfig.version || '1', settings);
            })
            .catch(function(){
                $log.error("[AGC] Tag helper returned error. Script may have failed to load.");
                apiReady.reject();
            });

        return apiReady.promise;
    }   
})();
