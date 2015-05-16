/* globals angular */
(function(){
    angular.module('googleChart')
        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        });
})();