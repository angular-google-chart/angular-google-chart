/* global angular */
(function(){
    angular.module('googlechart-docs', ['ui.bootstrap'])
        .controller('HeaderController', HeaderController)
        .config(changeDelimeters);
        
    function HeaderController(){
        var self = this;
        self.collapsed = true;
    }
    
    changeDelimeters.$inject = ['$interpolateProvider']
    function changeDelimeters($interpolateProvider){
        $interpolateProvider.startSymbol('!!');
        $interpolateProvider.endSymbol('!!');
    }
})();