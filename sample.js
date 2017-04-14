/* global angular */

angular.module("google-chart-sample", ["ngRoute", "googlechart"]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/fat', {
                templateUrl: 'partials/fat.html',
                controller: 'FatChartCtrl'
            }).
            when('/annotation', {
                templateUrl: 'partials/annotation.html',
                controller: 'AnnotationChartCtrl'
            }).
            when('/gauge', {
                templateUrl: 'partials/gauge.html',
                controller: 'GaugeChartCtrl'
            }).
            when('/map', {
                templateUrl: 'partials/map.html',
                controller: 'MapChartCtrl'
            }).
            when('/generic/:chartType', {
                templateUrl: 'partials/generic.html',
                controller: 'GenericChartCtrl'
            }).
            otherwise({
                redirectTo: '/fat'
            });
    }])
    .config(["agcLibraryLoaderProvider", function(agcLibraryLoaderProvider){
        agcLibraryLoaderProvider.setLoader("gstatic");
    }])
    .config(["agcGstaticLoaderProvider", function(gstaticProvider){
        gstaticProvider.addPackage("map");
        //gstaticProvider.setOption("mapsApiKey", "INSERT YOUR KEY HERE");
    }]);/*.value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart', 'gauge'],
                language: 'fr'
            }
    });*/
