---
layout: docs
category: Services
title: googleChartsApiPromise
version: 0.1.0
latest: false
---

This services returns a promise that resolves when the Google Charts API has
been loaded and is ready to use. Before this promise resolves, the various
objects and functions related to the API will not be available.

#### Example Code
{% highlight javascript %}
(function(){
    angular.module('google-chart-sample', 'googlechart')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = ['$scope', 'googleChartsApiPromise'];

    function ExampleController ($scope, googleChartsApiPromise){
        $scope.chartObject = {
            type: 'PieChart'
        };

        googleChartsApiPromise.then(buildDataTable);

        function buildDataTable(){
            $scope.chartObject.data = new google.visualization.DataTable();
            // Continue building the data table.
        }
    }
})();
{% endhighlight %}
