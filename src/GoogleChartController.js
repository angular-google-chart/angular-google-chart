/* global angular, google */

(function() {

    angular.module('googlechart')
        .controller('GoogleChartController', GoogleChartController);

    GoogleChartController.$inject = ['$scope', '$element', '$attrs', '$injector', '$timeout', '$window', '$rootScope', 'GoogleChartService'];

    function GoogleChartController($scope, $element, $attrs, $injector, $timeout, $window, $rootScope, GoogleChartService) {
        var self = this;
        var resizeHandler;
        self.registerChartListener = GoogleChartService.registerChartListener;
        self.registerWrapperListener = GoogleChartService.registerWrapperListener;
        self.registerServiceListener = GoogleChartService.registerServiceListener;

        init();

        function cleanup() {
            resizeHandler();
        }

        function draw() {
            if (!draw.triggered && (self.chart !== undefined)) {
                draw.triggered = true;
                $timeout(setupAndDraw, 0, true);
            }
            else if (self.chart !== undefined) {
                $timeout.cancel(draw.recallTimeout);
                draw.recallTimeout = $timeout(draw, 10);
            }
        }

        // Watch function calls this.
        function drawAsync() {
            GoogleChartService.getReadyPromise()
                .then(draw);
        }

        //setupAndDraw() calls this.
        function drawChartWrapper() {
            GoogleChartService.draw();
            draw.triggered = false;
        }

        function init() {
            /* Watches, to refresh the chart when its data, formatters, options, view,
            or type change. All other values intentionally disregarded to avoid double
            calls to the draw function. Please avoid making changes to these objects
            directly from this directive.*/
            $scope.$watch(watchValue, watchHandler, true); // true is for deep object equality checking

            // Redraw the chart if the window is resized
            resizeHandler = $rootScope.$on('resizeMsg', drawAsync);

            //Cleanup resize handler.
            $scope.$on('$destroy', cleanup);
        }

        function setupAndDraw() {
            GoogleChartService.setup($element,
            self.chart.type,
            self.chart.data,
            self.chart.view,
            self.chart.options,
            self.chart.formatters,
            self.chart.customFormatters);

            $timeout(drawChartWrapper);
        }

        function watchHandler() {
            self.chart = $scope.$eval($attrs.chart);
            drawAsync();
        }

        function watchValue() {
            var chartObject = $scope.$eval($attrs.chart);
            if (angular.isDefined(chartObject) && angular.isObject(chartObject)) {
                return {
                    customFormatters: chartObject.customFormatters,
                    data: chartObject.data,
                    formatters: chartObject.formatters,
                    options: chartObject.options,
                    type: chartObject.type,
                    view: chartObject.view
                };
            }
        }
    }
})();