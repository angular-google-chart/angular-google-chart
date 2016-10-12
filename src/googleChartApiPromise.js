/* global angular */
(function(){
    angular.module('googlechart')
        .factory('googleChartApiPromise', googleChartApiPromiseFactory);
        
    googleChartApiPromiseFactory.$inject = ['$rootScope', '$q', 'googleChartApiConfig', 'agcJsapiLoaderStrategy'];
        
    function googleChartApiPromiseFactory($rootScope, $q, apiConfig, agcJsapiLoaderStrategy) {
        return agcJsapiLoaderStrategy();
    }
})();