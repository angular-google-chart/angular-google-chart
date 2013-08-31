'use strict';

angular.module('google-chart-sample', ['googlechart']).controller("SampleCtrl", function ($scope) {

    var chart1 = {};
    chart1.type = "AreaChart";
    chart1.displayed = false;
    chart1.cssStyle = "height:600px; width:100%;";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "laptop-id", label: "Laptop", type: "number"},
        {id: "desktop-id", label: "Desktop", type: "number"},
        {id: "server-id", label: "Server", type: "number"}
    ], "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42 items"},
            {v: 12, f: "Ony 12 items"},
            {v: 7, f: "7 servers"}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            {v: 1, f: "1 unit (Out of stock this month)"},
            {v: 12}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            {v: 5},
            {v: 11}

        ]}
    ]};

    chart1.options = {
        "title": "Sales per month",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Sales unit", "gridlines": {"count": 10}
        },
        "hAxis": {
            "title": "Date"
        }
    };  

    $scope.chart = chart1;

    $scope.hideServer = false;
    $scope.selectionChange = function () {
        if($scope.hideServer) {
            $scope.chart.view = {columns: [0,1,2]};
        } else {
            $scope.chart.view = {};
        }
    }

});



