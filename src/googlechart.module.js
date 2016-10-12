/* global angular */
(function(){
    angular.module('googlechart', [])
        .run(registerResizeEvent);
        
    registerResizeEvent.$inject = ['$rootScope', '$window'];
    
    function registerResizeEvent($rootScope, $window){
        angular.element($window).on('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
    }
})();