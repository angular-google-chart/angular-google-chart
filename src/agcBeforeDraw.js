/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcBeforeDraw', onReadyDirective);
        
    function onReadyDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject=['chartWrapper'];
                function callback(chartWrapper){
                    scope.$apply(function (){
                        scope.$eval(attrs.agcBeforeDraw, {chartWrapper: chartWrapper});
                    });
                }
                googleChartController.registerServiceListener('beforeDraw', callback, this);
            }
        };
    }
})();