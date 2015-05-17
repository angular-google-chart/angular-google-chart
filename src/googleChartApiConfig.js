/* global angular */
(function(){
    angular.module('googlechart')
        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        });
})();