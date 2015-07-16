/* global angular, google */
/* jshint -W072 */
(function(){
    angular.module('googlechart')
        .directive('googleChart', googleChartDirective);
        
    googleChartDirective.$inject = ['$timeout', '$window', '$rootScope', 'googleChartApiPromise'];
        
    function googleChartDirective($timeout, $window, $rootScope, googleChartApiPromise) {

        GoogleChartController.$inject = ['$scope', '$element', '$attrs', '$injector', 'FormatManager'];

        function GoogleChartController($scope, $element, $attrs, $injector, FormatManager){
            var self = this;
            var resizeHandler, wrapperListeners = {}, formatManager,
                chartListeners = {}, innerVisualization = null;
            self.registerChartListener = registerChartListener;
            self.registerWrapperListener = registerWrapperListener;

            init();

            function cleanup(){
                resizeHandler();
            }

            function draw() {
                if (!draw.triggered && (self.chart !== undefined)) {
                    draw.triggered = true;
                    $timeout(setupAndDraw, 0, true);
                } else if (self.chart !== undefined) {
                    $timeout.cancel(draw.recallTimeout);
                    draw.recallTimeout = $timeout(draw, 10);
                }
            }

            function drawAsync() {
                googleChartApiPromise.then(function () {
                    draw();
                });
            }

            function drawChartWrapper(){
                $scope.$eval($attrs.beforeDraw, { chartWrapper: $scope.chartWrapper });
                self.chartWrapper.draw();
                draw.triggered = false;
            }

            handleError.$inject = ['args'];
            function handleError(args) {
                var error = args[0];
                console.log("Chart not displayed due to error: '" + error.message + "' Full error object follows.");
                console.log(error);
            }

            function handleReady() {
                self.chart.displayed = true;
                if (innerVisualization !== self.chartWrapper.getChart()){
                    innerVisualization = self.chartWrapper.getChart();
                    registerListenersWithGoogle(innerVisualization, chartListeners);
                }
            }

            function init(){
                /* Watches, to refresh the chart when its data, formatters, options, view,
                or type change. All other values intentionally disregarded to avoid double
                calls to the draw function. Please avoid making changes to these objects
                directly from this directive.*/
                $scope.$watch(watchValue, watchHandler, true); // true is for deep object equality checking

                // Redraw the chart if the window is resized
                resizeHandler = $rootScope.$on('resizeMsg', function () {
                    $timeout(function () {
                        // Not always defined yet in IE so check
                        if (self.chartWrapper) {
                            drawAsync();
                        }
                    });
                });

                //Cleanup resize handler.
                $scope.$on('$destroy', cleanup);

                registerWrapperListener('error', handleError, self);
                registerWrapperListener('ready', handleReady, self);
            }

            function setupAndDraw(){
                if (typeof (self.chartWrapper) === 'undefined') {
                    var chartWrapperArgs = {
                        chartType: self.chart.type,
                        dataTable: self.chart.data,
                        view: self.chart.view,
                        options: self.chart.options,
                        containerId: $element[0]
                    };

                    self.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                    registerListenersWithGoogle(self.chartWrapper, wrapperListeners);
                } else {
                    self.chartWrapper.setChartType(self.chart.type);
                    self.chartWrapper.setDataTable(self.chart.data);
                    self.chartWrapper.setView(self.chart.view);
                    self.chartWrapper.setOptions(self.chart.options);
                }

                if (!formatManager){
                    formatManager = new FormatManager();
                }
                    
                if (formatManager.applyFormats(self.chartWrapper.getDataTable(),
                    self.chart.formatters, self.chart.customFormatters).requiresHtml){
                    self.chartWrapper.setOption('allowHtml', true);
                }
                    
                $timeout(drawChartWrapper);
            }

            function watchHandler(){
                self.chart = $scope.$eval($attrs.chart);
                drawAsync();
            }

            function watchValue(){
                var chartObject = $scope.$eval($attrs.chart);
                if (angular.isDefined(chartObject) && angular.isObject(chartObject)){
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

            // This function was written to genericize listener registration
            // because I plan to implement different collections of listeners
            // for events on the underlying chart object, and for
            // directive-level events (ie. beforeDraw).
            function registerListener(listenerCollection, eventName, listenerFn, listenerObject){
                // This is the function that will be invoked by the charts API.
                // Passing the wrapper function allows the use of DI for
                // for the called function.
                var listenerWrapper = function (){
                    var locals = {
                        chartWrapper: self.chartWrapper,
                        chart: self.chartWrapper.getChart(),
                        args: arguments
                    };
                    $injector.invoke(listenerFn, listenerObject || this, locals);
                };

                if (angular.isDefined(listenerCollection) && angular.isObject(listenerCollection)){
                    if (!angular.isArray(listenerCollection[eventName])){
                        listenerCollection[eventName] = [];
                    }
                    listenerCollection[eventName].push(listenerWrapper);
                    return function (){
                        if (angular.isDefined(listenerWrapper.googleListenerHandle)){
                            google.visualization.events.removeListener(listenerWrapper.googleListenerHandle);
                        }
                        var fnIndex = listenerCollection[eventName].indexOf(listenerWrapper);
                        listenerCollection[eventName].splice(fnIndex,1);
                        if (listenerCollection[eventName].length === 0){
                            listenerCollection[eventName] = undefined;
                        }
                    };
                }
            }

            function registerListenersWithGoogle(eventSource, listenerCollection){
                for (var eventName in listenerCollection){
                    if (listenerCollection.hasOwnProperty(eventName) && angular.isArray(listenerCollection[eventName])){
                        for (var fnIterator = 0; fnIterator < listenerCollection[eventName].length; fnIterator++){
                            if (angular.isFunction(listenerCollection[eventName][fnIterator])){
                                listenerCollection[eventName][fnIterator].googleListenerHandle =
                                google.visualization.events.addListener(eventSource, eventName, listenerCollection[eventName][fnIterator]);
                            }
                        }
                    }
                }
            }

            function registerChartListener(eventName, listenerFn, listenerObject){
                return registerListener(chartListeners, eventName, listenerFn, listenerObject);
            }

            function registerWrapperListener(eventName, listenerFn, listenerObject){
                return registerListener(wrapperListeners, eventName, listenerFn, listenerObject);
            }
        }

        return {
            restrict: 'A',
            scope: false,
            controller: GoogleChartController
        };
    }
})();
