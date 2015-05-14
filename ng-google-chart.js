/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.0.11
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @author GitHub contributors
 * @license MIT
 * @year 2013
 */
 
 /* global google */
 
(function (document, window, angular) {
    'use strict';

    angular.module('googlechart', [])

        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        })

        .provider('googleJsapiUrl', function () {
            var protocol = 'https:';
            var url = '//www.google.com/jsapi';

            this.setProtocol = function (newProtocol) {
                protocol = newProtocol;
            };

            this.setUrl = function (newUrl) {
                url = newUrl;
            };

            this.$get = function () {
                return (protocol ? protocol : '') + url;
            };
        })

        .factory('googleChartApiPromise', ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl', function ($rootScope, $q, apiConfig, googleJsapiUrl) {
            var apiReady = $q.defer();
            var onLoad = function () {
                // override callback function
                var settings = {
                    callback: function () {
                        var oldCb = apiConfig.optionalSettings.callback;
                        $rootScope.$apply(function () {
                            apiReady.resolve();
                        });

                        if (angular.isFunction(oldCb)) {
                            oldCb.call(this);
                        }
                    }
                };

                settings = angular.extend({}, apiConfig.optionalSettings, settings);

                window.google.load('visualization', apiConfig.version, settings);
            };
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');

            script.setAttribute('type', 'text/javascript');
            script.src = googleJsapiUrl;

            if (script.addEventListener) { // Standard browsers (including IE9+)
                script.addEventListener('load', onLoad, false);
            } else { // IE8 and below
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        onLoad();
                    }
                };
            }

            head.appendChild(script);

            return apiReady.promise;
        }])

        .directive('googleChart', ['$timeout', '$window', '$rootScope', 'googleChartApiPromise', function ($timeout, $window, $rootScope, googleChartApiPromise) {

            GoogleChartController.$inject = ['$scope', '$element', '$attrs', '$injector'];

            function GoogleChartController($scope, $element, $attrs, $injector){
                var self = this;
                var oldChartFormatters = {}, resizeHandler, wrapperListeners = {},
                    chartListeners = {}, innerVisualization = null;
                self.registerChartListener = registerChartListener;
                self.registerWrapperListener = registerWrapperListener;

                init();

                function applyFormat(formatType, FormatClass, dataTable) {
                    var i;
                    if (typeof (self.chart.formatters[formatType]) !== 'undefined') {
                        if (!angular.equals(self.chart.formatters[formatType], oldChartFormatters[formatType])) {
                            oldChartFormatters[formatType] = self.chart.formatters[formatType];
                            self.formatters[formatType] = [];

                            if (formatType === 'color') {
                                for (var cIdx = 0; cIdx < self.chart.formatters[formatType].length; cIdx++) {
                                    var colorFormat = new FormatClass();

                                    for (i = 0; i < self.chart.formatters[formatType][cIdx].formats.length; i++) {
                                        var data = self.chart.formatters[formatType][cIdx].formats[i];

                                        if (typeof (data.fromBgColor) !== 'undefined' && typeof (data.toBgColor) !== 'undefined') {
                                            colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                                        } else {
                                            colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                                        }
                                    }

                                    self.formatters[formatType].push(colorFormat);
                                }
                            } else {

                                for (i = 0; i < self.chart.formatters[formatType].length; i++) {
                                    self.formatters[formatType].push(new FormatClass(
                                        self.chart.formatters[formatType][i])
                                    );
                                }
                            }
                        }


                        //apply formats to dataTable
                        for (i = 0; i < self.formatters[formatType].length; i++) {
                            if (self.chart.formatters[formatType][i].columnNum < dataTable.getNumberOfColumns()) {
                                self.formatters[formatType][i].format(dataTable, self.chart.formatters[formatType][i].columnNum);
                            }
                        }


                        //Many formatters require HTML tags to display special formatting
                        if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color') {
                            self.chart.options.allowHtml = true;
                        }
                    }
                }

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
                    $scope.$on('$destroy', cleanup());

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

                    if (typeof (self.formatters) === 'undefined'){
                        self.formatters = {};
                    }

                    if (typeof (self.chart.formatters) !== 'undefined') {
                        applyFormat("number", google.visualization.NumberFormat, self.chartWrapper.getDataTable());
                        applyFormat("arrow", google.visualization.ArrowFormat, self.chartWrapper.getDataTable());
                        applyFormat("date", google.visualization.DateFormat, self.chartWrapper.getDataTable());
                        applyFormat("bar", google.visualization.BarFormat, self.chartWrapper.getDataTable());
                        applyFormat("color", google.visualization.ColorFormat, self.chartWrapper.getDataTable());
                    }

                    var customFormatters = self.chart.customFormatters;
                    if (typeof (customFormatters) !== 'undefined') {
                        for (var name in customFormatters) {
                            if (customFormatters.hasOwnProperty(name)){
                                applyFormat(name, customFormatters[name], self.chartWrapper.getDataTable());
                            }
                        }
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
        }])

        .directive('onReady', function(){
            return {
                restrict: 'A',
                scope: false,
                require: 'googleChart',
                link: function(scope, element, attrs, googleChartController){
                    callback.$inject=['chartWrapper'];
                    function callback(chartWrapper){
                        scope.$apply(function (){
                            scope.$eval(attrs.onReady, {chartWrapper: chartWrapper});
                        });
                    }
                    googleChartController.registerWrapperListener('ready', callback, this);
                }
            };
        })

        .directive('onSelect', function(){
            return {
                restrict: 'A',
                scope: false,
                require: 'googleChart',
                link: function(scope, element, attrs, googleChartController){
                    callback.$inject = ['chartWrapper', 'chart'];
                    function callback(chartWrapper, chart){
                        var selectEventRetParams = { selectedItems: chart.getSelection() };
                        // This is for backwards compatibility for people using 'selectedItem' that only wanted the first selection.
                        selectEventRetParams.selectedItem = selectEventRetParams.selectedItems[0];
                        selectEventRetParams.chartWrapper = chartWrapper;
                        selectEventRetParams.chart = chart;
                        scope.$apply(function () {
                            scope.$eval(attrs.onSelect, selectEventRetParams);
                        });
                    }
                    googleChartController.registerWrapperListener('select', callback, this);
                }
            };
        })

        .directive('onError', function(){
            return{
                restrict: 'A',
                scope: false,
                require: 'googleChart',
                link: function(scope, element, attrs, googleChartController){
                    callback.$inject = ['chartWrapper', 'chart', 'args'];
                    function callback(chartWrapper, chart, args){
                        var returnValues = {
                            chartWrapper: chartWrapper,
                            chart: chart,
                            args: args,
                            error: args[0],
                            err: args[0],
                            id: args[0].id,
                            message: args[0].message
                        };
                        scope.$apply(function(){
                            scope.$eval(attrs.onError, returnValues);
                        });
                    }
                    googleChartController.registerWrapperListener('error', callback, this);
                }
            };
        })

        .run(['$rootScope', '$window', function ($rootScope, $window) {
            angular.element($window).bind('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
        }]);

})(document, window, window.angular);
