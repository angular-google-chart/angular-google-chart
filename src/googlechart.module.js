/* globals angular */
(function(){
    angular.module('googleChart', [])
        .run(registerResizeEvent);
        
    registerResizeEvent.$inject = ['$rootScope', '$window'];
    
    function registerResizeEvent($rootScope, $window){
        angular.element($window).bind('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
    }
})();