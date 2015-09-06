/* global angular, google */
/* jshint -W072 */
(function(){
    angular.module('googlechart')
        .directive('googleChart', googleChartDirective);
        
    googleChartDirective.$inject = [];
        
    function googleChartDirective() {

        return {
            restrict: 'A',
            scope: false,
            controller: 'GoogleChartController'
        };
    }
})();
