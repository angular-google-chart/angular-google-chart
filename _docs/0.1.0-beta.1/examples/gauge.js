/* global angular */
(function() {
  'use strict';
  angular.module("google-chart-sample", ["googlechart", "googlechart-docs"])
  .controller("GaugeChartCtrl", function($scope) {

    $scope.myChartObject = {};
    $scope.myChartObject.type = "Gauge";

    $scope.myChartObject.options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    };

    $scope.myChartObject.data = [
      ['Label', 'Value'],
      ['Memory', 80],
      ['CPU', 55],
      ['Network', 68]
    ];
  });
})();