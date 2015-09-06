/* global angular */
/* eslint-env jasmine */
describe('googleJsapiUrl provider', function() {
    var providerInstance;

    //capture the provider by injecting it into a fake module
    beforeEach(function() {
        angular.module('fakeModule',[])
            .config(function(googleJsapiUrlProvider) {
                providerInstance = googleJsapiUrlProvider;
            });

        module('googlechart', 'fakeModule');

        //run injector to get the provider instance
        inject(function(){});
    });
    
    it ('should return default value if nothing changed', function(){
       var result = providerInstance.$get();
       expect(result).toBe('https://www.google.com/jsapi');
    });
    
    it ('should return http url if protocol changed', function(){
       providerInstance.setProtocol('http:');
       var result = providerInstance.$get();
       expect(result).toMatch(/^http:/);
       expect(result).not.toMatch(/^https:/);
    });
    
    it ('should return url as set if it has been set', function(){
       providerInstance.setUrl('//www.example.com/api');
       var result = providerInstance.$get();
       expect(result).toMatch(/\/\/www\.example\.com\/api$/);
    });
});