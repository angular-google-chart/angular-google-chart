/* global angular */
(function(){
    angular.module('googlechart')
        .factory('googleChartApiPromise', googleChartApiPromiseFactory);
        
    googleChartApiPromiseFactory.$inject = ['agcLibraryLoader'];

    /** Here for backward-compatibility only. */
    function googleChartApiPromiseFactory(agcLibraryLoader) {
        return agcLibraryLoader;
    }
})();
