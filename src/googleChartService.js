/* global angular */
(function() {
    angular.module('googlechart')
        .service('GoogleChartService', GoogleChartService);

    GoogleChartService.$inject = ['googleChartApiPromise', '$injector', '$timeout'];

    function GoogleChartService(googleChartApiPromise, $injector, $timeout) {
        var self = this;
        self.draw = draw;
        self.getChartWrapper = getChartWrapper;
        self.getData = getData;
        self.getElement = getElement;
        self.getOption = getOption;
        self.getOptions = getOptions;
        self.getView = getView;
        self.isApiReady = isApiReady;
        self.registerServiceListener = registerServiceListener;
        self.setData = setData;
        self.setElement = setElement;
        self.setOption = setOption;
        self.setOptions = setOptions;
        self.setup = setup;
        self.setView = setView;

        var $google, _apiPromise, _apiReady, _chartWrapper, _element,
        _chartType, _data, _view, _options, _formatters;
        var serviceListeners = {};

        _init();

        function _activateServiceEvent(eventName){
            var i;
            if (angular.isArray(serviceListeners[eventName])){
                for(i=0;i<serviceListeners[eventName].length;i++)
                {
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
            return g;
        }
        
        // This function was written to genericize listener registration
        // because I plan to implement different collections of listeners
        // for events on the underlying chart object, and for
        // directive-level events (ie. beforeDraw).
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
        
        function _runDrawCycle(){
            _activateServiceEvent('beforeDraw');
            _chartWrapper.draw();
        }

        // Credit for this solution:
        // http://stackoverflow.com/a/20125572/3771976
        function _getSetDescendantProp(obj, desc, value) {
            var arr = desc ? desc.split(".") : [];

            while (arr.length && obj) {
                var comp = arr.shift();
                var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);

                // handle arrays
                if ((match !== null) && (match.length == 3)) {
                    var arrayData = {
                        arrName: match[1],
                        arrIndex: match[2]
                    };
                    if (obj[arrayData.arrName] !== undefined) {
                        if (value && arr.length === 0) {
                            obj[arrayData.arrName][arrayData.arrIndex] = value;
                        }
                        obj = obj[arrayData.arrName][arrayData.arrIndex];
                    }
                    else {
                        obj = undefined;
                    }

                    continue;
                }

                // handle regular things
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

        function _continueSetup() {
            if (!angular.isDefined(_chartWrapper)) {
                _chartWrapper = new $google.visualization.ChartWrapper({
                    chartType: _chartType,
                    dataTable: _data,
                    view: _view,
                    options: _options,
                    containerId: _element[0]
                });
            }
            else {
                _chartWrapper.setChartType(_chartType);
                _chartWrapper.setDataTable(_chartType);
                _chartWrapper.setView(_view);
                _chartWrapper.setOptions(_options);
            }
            _runDrawCycle();
        }

        function _init() {
            _apiReady = false;
            //keeps the resulting promise to chain on draw event
            _apiPromise = googleChartApiPromise
                .then(_apiLoadSuccess)
                .catch(_apiLoadFail);
        }
        
        /*
        This function does this:
            - waits for API to load, if not already loaded
            - sets up ChartWrapper object (create or update)
            - schedules timeout event to draw chart
        */
        function draw(){
            _apiPromise = _apiPromise.then(_continueSetup());
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
        
        function getElement(){
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
        
        function getView(){
            var view = _view || {};
            return angular.copy(view);
        }

        function isApiReady() {
            return _apiReady;
        }
        
        function registerServiceListener(eventName, listenerFn, listenerObject){
            return _registerListener(serviceListeners, eventName, listenerFn, listenerObject);
        }

        function setData(data) {
            if (angular.isDefined(data)) {
                _data = angular.copy(data);
            }
        }
        
        function setElement(element){
            if (angular.isElement(element)){
                _element = element;
            }
        }

        function setOption(name, value) {
            _options = _options || {};
            _getSetDescendantProp(_options, name, angular.copy(value));
        }

        function setOptions(options) {
            if (angular.isDefined(options)) {
                _options = angular.copy(options);
            }
        }

        function setup(element, chartType, data, view, options, formatters) {
            // Keep values if already set,
            // can call setup() with nulls to keep
            // existing values
            _element = element || _element;
            _chartType = chartType || _chartType;
            _data = data || _data;
            _view = view || _view;
            _options = options || _options;
            _formatters = formatters || _formatters;

            _apiPromise = _apiPromise.then(_continueSetup);
        }
        
        function setView(view){
            _view = angular.copy(view);
        }
    }
})();