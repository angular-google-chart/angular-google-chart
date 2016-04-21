---
layout: docs
category: Services
title: googleChartApiPromise
version: 0.0.11
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

    ExampleController.$inject = ['$scope', 'googleChartApiPromise'];

    function ExampleController ($scope, googleChartApiPromise){
        $scope.myChartObject = {
            type: 'PieChart'
        };

        googleChartApiPromise.then(buildDataTable);

        function buildDataTable(){
            $scope.myChartObject.data = new google.visualization.DataTable();
            // Continue building the data table.
        }
    }
})();
{% endhighlight %}
