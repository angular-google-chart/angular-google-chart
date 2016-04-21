/* global angular */

(function(){
    angular.module('googlechart')
        .directive('agcRangeChange', agcRangeChangeDirective);

    function agcRangeChangeDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject = ['args', 'chart', 'chartWrapper'];
                function callback(args, chart, chartWrapper){
                    var returnParams = {
                        chartWrapper: chartWrapper,
                        chart: chart,
                        args: args,
                        start: args[0].start,
                        end: args[0].end
                    };
                    scope.$apply(function () {
                        scope.$eval(attrs.agcRangeChange, returnParams);
                    });
                }
                googleChartController.registerChartListener('rangechange', callback, this);
            }
        };
    }
})();
