/* global angular */
(function() {
    angular.module('googlechart')
        .factory('GoogleChartService', GoogleChartServiceFactory);

    GoogleChartServiceFactory.$inject = ['agcLibraryLoader', '$injector', '$q', 'FormatManager'];

    function GoogleChartServiceFactory(agcLibraryLoader, $injector, $q, FormatManager) {
        function GoogleChartService() {
            var self = this;
            self.draw = draw;
            self.getChartWrapper = getChartWrapper;
            self.getData = getData;
            self.getElement = getElement;
            self.getOption = getOption;
            self.getOptions = getOptions;
            self.getView = getView;
            self.getReadyPromise = getReadyPromise;
            self.isApiReady = isApiReady;
            self.registerChartListener = registerChartListener;
            self.registerServiceListener = registerServiceListener;
            self.registerWrapperListener = registerWrapperListener;
            self.setData = setData;
            self.setElement = setElement;
            self.setOption = setOption;
            self.setOptions = setOptions;
            self.setup = setup;
            self.setView = setView;

            var $google,
                _libraryPromise,
                _apiReady,
                _chartWrapper,
                _element,
                _chartType,
                _data,
                _view,
                _options,
                _formatters,
                _innerVisualization,
                _formatManager,
                _needsUpdate = true,
                _customFormatters,
                _serviceDeferred,
                serviceListeners = {},
                wrapperListeners = {},
                chartListeners = {};

            _init();

            function _activateServiceEvent(eventName) {
                var i;
                if (angular.isArray(serviceListeners[eventName])) {
                    for (i = 0; i < serviceListeners[eventName].length; i++) {
                        serviceListeners[eventName][i]();
                    }
                }
            }

            function _apiLoadFail(reason) {
                // Not sure what to do if this does happen.
                // Post your suggestions in the issues tracker at
                // https://github.com/angular-google-chart/angular-google-chart/
                return reason;
            }

            function _apiLoadSuccess(g) {
                $google = g;
                _apiReady = true;
                _serviceDeferred.resolve();
                return g;
            }


            function _continueSetup() {
                if (!angular.isDefined(_chartWrapper)) {
                    _chartWrapper = new $google.visualization.ChartWrapper({
                        chartType: _chartType,
                        dataTable: _data,
                        view: _view,
                        options: _options,
                        containerId: _element[0]
                    });
                    _registerListenersWithGoogle(_chartWrapper, wrapperListeners);
                }
                else {
                    _chartWrapper.setChartType(_chartType);
                    _chartWrapper.setDataTable(_data);
                    _chartWrapper.setView(_view);
                    _chartWrapper.setOptions(_options);
                }

                if (!_formatManager) {
                    _formatManager = new FormatManager($google);
                }

                if (_formatManager.applyFormats(_chartWrapper.getDataTable(),
                        _formatters, _customFormatters).requiresHtml) {
                    _chartWrapper.setOption('allowHtml', true);
                }

                _needsUpdate = false;
            }

            // Credit for this solution:
            // http://stackoverflow.com/a/20125572/3771976
            function _getSetDescendantProp(obj, desc, value) {
                var arr = desc ? desc.split(".") : [];

                while (arr.length && obj) {
                    var comp = arr.shift();
                    var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);

                    if (value) {
                        if (obj[comp] === undefined) {
                            obj[comp] = {};
                        }

                        if (arr.length === 0) {
                            obj[comp] = value;
                        }
                    }

                    obj = obj[comp];
                }

                return obj;
            }

            function _handleReady() {
                // When the chartWrapper is ready, check to see if the inner chart
                // has changed. If it has, re-register listeners onto that chart.
                if (_innerVisualization !== _chartWrapper.getChart()) {
                    _innerVisualization = _chartWrapper.getChart();
                    _registerListenersWithGoogle(_innerVisualization, chartListeners);
                }
            }

            function _init() {
                _apiReady = false;
                _serviceDeferred = $q.defer();
                //keeps the resulting promise to chain on other actions
                _libraryPromise = agcLibraryLoader
                    .then(_apiLoadSuccess)
                    .catch(_apiLoadFail);

                registerWrapperListener('ready', _handleReady, self);
            }

            function _registerListener(listenerCollection, eventName, listenerFn, listenerObject) {
                // This is the function that will be invoked by the charts API.
                // Passing the wrapper function allows the use of DI for
                // for the called function.
                var listenerWrapper = function() {
                    var locals = {
                        chartWrapper: _chartWrapper,
                        chart: _chartWrapper.getChart(),
                        args: arguments
                    };
                    $injector.invoke(listenerFn, listenerObject || this, locals);
                };

                if (angular.isDefined(listenerCollection) && angular.isObject(listenerCollection)) {
                    if (!angular.isArray(listenerCollection[eventName])) {
                        listenerCollection[eventName] = [];
                    }
                    listenerCollection[eventName].push(listenerWrapper);
                    return function() {
                        if (angular.isDefined(listenerWrapper.googleListenerHandle)) {
                            $google.visualization.events.removeListener(listenerWrapper.googleListenerHandle);
                        }
                        var fnIndex = listenerCollection[eventName].indexOf(listenerWrapper);
                        listenerCollection[eventName].splice(fnIndex, 1);
                        if (listenerCollection[eventName].length === 0) {
                            listenerCollection[eventName] = undefined;
                        }
                    };
                }
            }

            function _registerListenersWithGoogle(eventSource, listenerCollection) {
                for (var eventName in listenerCollection) {
                    if (listenerCollection.hasOwnProperty(eventName) && angular.isArray(listenerCollection[eventName])) {
                        for (var fnIterator = 0; fnIterator < listenerCollection[eventName].length; fnIterator++) {
                            if (angular.isFunction(listenerCollection[eventName][fnIterator])) {
                                listenerCollection[eventName][fnIterator].googleListenerHandle =
                                    $google.visualization.events.addListener(eventSource, eventName, listenerCollection[eventName][fnIterator]);
                            }
                        }
                    }
                }
            }

            function _runDrawCycle() {
                _activateServiceEvent('beforeDraw');
                _chartWrapper.draw();
            }

            /*
            This function does this:
                - waits for API to load, if not already loaded
                - sets up ChartWrapper object (create or update)
                - schedules timeout event to draw chart
            */
            function draw() {
                if (_needsUpdate) {
                    _libraryPromise = _libraryPromise.then(_continueSetup);
                }
                _libraryPromise = _libraryPromise.then(_runDrawCycle());
            }

            function getChartWrapper() {
                // Most get functions on this interface return copies,
                // this one should return reference so as to expose the 
                //chart api to users
                return _chartWrapper;
            }

            function getData() {
                var data = _data || {};
                return angular.copy(data);
            }

            function getElement() {
                return _element;
            }

            function getOption(name) {
                var options = _options || {};
                return _getSetDescendantProp(options, name);
            }

            function getOptions() {
                var options = _options || {};
                return angular.copy(options);
            }

            function getReadyPromise() {
                return _serviceDeferred.promise;
            }

            function getView() {
                var view = _view || {};
                return angular.copy(view);
            }

            function isApiReady() {
                return _apiReady;
            }

            function registerChartListener(eventName, listenerFn, listenerObject) {
                return _registerListener(chartListeners, eventName, listenerFn, listenerObject);
            }

            function registerServiceListener(eventName, listenerFn, listenerObject) {
                return _registerListener(serviceListeners, eventName, listenerFn, listenerObject);
            }

            function registerWrapperListener(eventName, listenerFn, listenerObject) {
                return _registerListener(wrapperListeners, eventName, listenerFn, listenerObject);
            }

            function setData(data) {
                if (angular.isDefined(data)) {
                    _data = angular.copy(data);
                    _needsUpdate = true;
                }
            }

            function setElement(element) {
                if (angular.isElement(element) && _element !== element) {
                    _element = element;
                    // clear out the chartWrapper because we're going to need a new one
                    _chartWrapper = null;
                    _needsUpdate = true;
                }
            }

            function setOption(name, value) {
                _options = _options || {};
                _getSetDescendantProp(_options, name, angular.copy(value));
                _needsUpdate = true;
            }

            function setOptions(options) {
                if (angular.isDefined(options)) {
                    _options = angular.copy(options);
                    _needsUpdate = true;
                }
            }

            function setup(element, chartType, data, view, options, formatters, customFormatters) {
                // Keep values if already set,
                // can call setup() with nulls to keep
                // existing values
                _element = element || _element;
                _chartType = chartType || _chartType;
                _data = data || _data;
                _view = view || _view;
                _options = options || _options;
                _formatters = formatters || _formatters;
                _customFormatters = customFormatters || _customFormatters;

                _libraryPromise = _libraryPromise.then(_continueSetup);
            }

            function setView(view) {
                _view = angular.copy(view);
            }
        }
        return GoogleChartService;
    }
})();
