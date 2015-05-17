/* global angular */
(function() {
  'use strict';
  angular.module('google-chart-sample').controller("GaugeChartCtrl", function($scope) {

    $scope.chartObject = {};
    $scope.chartObject.type = "Gauge";

    $scope.chartObject.options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    };

    $scope.chartObject.data = [
      ['Label', 'Value'],
      ['Memory', 80],
      ['CPU', 55],
      ['Network', 68]
    ];
  });
})();