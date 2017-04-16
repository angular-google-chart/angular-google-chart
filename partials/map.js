(function(){
    angular.module('google-chart-sample')
        .controller("MapChartCtrl", MapChartCtrl);
    
    MapChartCtrl.$inject = ["$scope"];
    function MapChartCtrl($scope){
        $scope.myMapChart = {
            type: "Map",
            data: [
                ["Lat", "Long", "Name"],
                [37.4232, -122.0853, 'Work'],
                [37.4289, -122.1697, 'University'],
                [37.6153, -122.3900, 'Airport'],
                [37.4422, -122.1731, 'Shopping']
            ],
            options: {
                showTooltop: true,
                showInfoWindow: true
            }
        };
    }
})();
