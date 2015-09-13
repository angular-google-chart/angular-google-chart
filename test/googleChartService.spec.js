/* global angular, inject */
/* eslint-env jasmine */
describe('GoogleChartService', function() {

    var mockApiPromiseBackend, GoogleChartService, googleChartService, $rootScope, mockApi;

    beforeEach(function() {
        module('googlechart');
        module('googlechart.mocks', function($provide) {

            // A mock googleChartApiPromise with back-end on global mockApiPromiseBackend
            $provide.factory('googleChartApiPromise', mockApiPromiseFactory);

            function mockApiPromiseFactory($q, mockGoogleApi) {
                var deferred = $q.defer();
                mockApiPromiseBackend = {
                    succeed: function() {
                        deferred.resolve(mockGoogleApi);
                    },
                    fail: function(reason) {
                        deferred.reject(reason);
                    }
                };
                return deferred.promise;
            }
        });

        inject(function($injector, _$rootScope_) {
            $rootScope = _$rootScope_;
            GoogleChartService = $injector.get('GoogleChartService');
            googleChartService = new GoogleChartService();
            mockApi = $injector.get('mockGoogleApi');
        });
    });

    it('should have public interface methods', function() {
        expect(googleChartService).toHaveMethod('isApiReady');
        expect(googleChartService).toHaveMethod('getChartWrapper');
        expect(googleChartService).toHaveMethod('getData');
        expect(googleChartService).toHaveMethod('getElement');
        expect(googleChartService).toHaveMethod('getOption');
        expect(googleChartService).toHaveMethod('getOptions');
        expect(googleChartService).toHaveMethod('registerChartListener');
        expect(googleChartService).toHaveMethod('registerServiceListener');
        expect(googleChartService).toHaveMethod('registerWrapperListener');
        expect(googleChartService).toHaveMethod('setData');
        expect(googleChartService).toHaveMethod('setup');
        expect(googleChartService).toHaveMethod('setElement');
        expect(googleChartService).toHaveMethod('setOption');
        expect(googleChartService).toHaveMethod('setOptions');
    });

    it('should set and get individual options', function() {
        var result, value = 'Some Chart Title';
        googleChartService.setOption('title', value);
        result = googleChartService.getOption('title');
        expect(result).toBe(value);
    });

    it('should set and get complex options', function() {
        var value = {
                maxValue: 10,
                minValue: -10
            },
            result;
        googleChartService.setOption('vAxis', value);
        result = googleChartService.getOption('vAxis');

        //Should be equal, but not same object
        expect(angular.equals(value, result)).toBeTrue();
        expect(result).not.toBe(value);

        result = googleChartService.getOption('vAxis.maxValue');
        expect(result).toBe(10);
    });

    it('should set complex options with dots in key names', function() {
        var key = 'vAxis.maxValue';
        var value = 10;
        var expectedResult = {
            maxValue: 10
        };
        var result;

        googleChartService.setOption(key, value);
        result = googleChartService.getOption('vAxis');
        expect(angular.equals(result, expectedResult)).toBeTrue();

    });

    it('should get complex options with dots in key names', function() {
        var value = {
            maxValue: 10
        };
        var expectedResult = 10;
        var result;

        googleChartService.setOption('vAxis', value);
        result = googleChartService.getOption('vAxis.maxValue');
        expect(result).toBe(expectedResult);
    });
    
    it('should set and get view object', function(){
       var view = {columns:[0,1,2]};
       googleChartService.setView(view);
       var result = googleChartService.getView(view);
       expect(angular.equals(result,view)).toBeTrue();
       expect(result).not.toBe(view);
    });
    
    it('should replace element with setElement', function(){
       var newElement = angular.element('<div></div>');
       googleChartService.setElement(newElement);
       expect(googleChartService.getElement()).toBe(newElement);
    });
    
    it('should not replace element with non-element', function(){
       var newElement = angular.element('<div></div>');
       var notElement = {};
       googleChartService.setElement(newElement);
       expect(googleChartService.getElement()).toBe(newElement);
       googleChartService.setElement(notElement);
       expect(googleChartService.getElement()).not.toBe(notElement);
       expect(googleChartService.getElement()).toBe(newElement);
    });

    describe('before api is ready', function() {
        it('should return false from isApiReady', function() {
            expect(googleChartService.isApiReady()).toBe(false);
        });
        it('should not create chartWrapper when setup is called', function() {
            var chartType = "NoChart",
                data = {},
                options = {},
                formatters = {},
                view = {};
            //doesn't need directive, just an element to give to chartWrapper
            var element = angular.element("<div></div>");
            googleChartService.setup(element, chartType, data, view, options, formatters);
            $rootScope.$apply();
            expect(googleChartService.getChartWrapper()).not.toBeDefined();
        });
    });

    describe('after api is ready', function() {

        beforeEach(function() {
            mockApiPromiseBackend.succeed();
            $rootScope.$apply();
        });

        it('should return true from isApiReady', function() {
            expect(googleChartService.isApiReady()).toBe(true);
        });

        it('should create chartWrapper when setup is called', function() {
            var chartType = "NoChart",
                data = {},
                options = {},
                formatters = {},
                view = {};
            //doesn't need directive, just an element to give to chartWrapper
            var element = angular.element("<div></div>");
            googleChartService.setup(element, chartType, data, view, options, formatters);
            $rootScope.$apply();
            expect(googleChartService.getChartWrapper()).toBeDefined();
        });

        describe('before setup', function() {
            it('should return undefined from getChartWrapper()', function() {
                expect(googleChartService.getChartWrapper()).not.toBeDefined();
            });
        });
        
        describe('setup phase', function(){
            var element, type, data, options, formatters;
           beforeEach(function(){
               
              element = angular.element('<div></div>');
              type = "MadeUpChart";
              data = [];
              options = {title:'A Chart'};
              formatters = {};
           });
        });
        
        describe('setup complete', function(){
            var element, type, data, options, formatters;
           beforeEach(function(){
              element = angular.element('<div></div>');
              type = "MadeUpChart";
              data = [];
              options = {title:'A Chart'};
              formatters = {};
              googleChartService.setup(element, type, data, null, options, formatters);
              $rootScope.$apply();
           });
           
           it('should call draw on chartwrapper whe draw called on service', function(){
               var drawSpy = spyOn(mockApi.visualization.ChartWrapper.prototype, 'draw').and.callThrough();
              googleChartService.draw();
              $rootScope.$apply();
              expect(drawSpy).toHaveBeenCalled();
           });
           
           it('should call beforeDraw handler when chart draws', function(){
               var spy = jasmine.createSpy('listener');
               googleChartService.registerServiceListener('beforeDraw', spy, this);
               googleChartService.draw();
               $rootScope.$apply();
               expect(spy).toHaveBeenCalled();
           });
           
           it('should deregister handler when returned function is called', function(){
               var spy = jasmine.createSpy('listener');
               var deregister = googleChartService.registerServiceListener('beforeDraw', spy, this);
               googleChartService.draw();
               $rootScope.$apply();
               expect(spy).toHaveBeenCalled();
               spy.calls.reset();
               deregister();
               googleChartService.draw();
               $rootScope.$apply();
               expect(spy).not.toHaveBeenCalled();
           });
           
           it('should call set functions on chartWrapper when setup called a second time', function(){
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setChartType');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setDataTable');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setView');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setOptions');
               googleChartService.setup(element, type, data, null, options, formatters);
               $rootScope.$apply();
               expect(mockApi.visualization.ChartWrapper.prototype.setChartType).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setDataTable).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setView).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setOptions).toHaveBeenCalled();
           });
           
           it('should call set functions on chartWrapper when draw is called a values have been changed', function(){
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setChartType');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setDataTable');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setView');
               spyOn(mockApi.visualization.ChartWrapper.prototype,'setOptions');
               googleChartService.setOption('title', 'A Brief History of Time');
               googleChartService.draw();
               $rootScope.$apply();
               expect(mockApi.visualization.ChartWrapper.prototype.setChartType).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setDataTable).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setView).toHaveBeenCalled();
               expect(mockApi.visualization.ChartWrapper.prototype.setOptions).toHaveBeenCalled();
           });
        });
    });

    describe('after api fails to load', function() {
        beforeEach(function() {
            mockApiPromiseBackend.fail();
            $rootScope.$apply();
        });

        it('should return false from isApiReady', function() {
            expect(googleChartService.isApiReady()).toBe(false);
        });
    });
});