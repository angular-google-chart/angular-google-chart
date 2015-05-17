/* global angular */
(function(){
    angular.module('googlechart')
        .provider('googleJsapiUrl', googleJsapiUrlProvider);
        
    function googleJsapiUrlProvider() {
        var protocol = 'https:';
        var url = '//www.google.com/jsapi';
        
        this.setProtocol = function (newProtocol) {
            protocol = newProtocol;
        };

        this.setUrl = function (newUrl) {
            url = newUrl;
        };

        this.$get = function () {
            return (protocol ? protocol : '') + url;
        };
    }
})();