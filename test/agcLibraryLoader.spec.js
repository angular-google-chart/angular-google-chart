/* global angular, inject */
/* eslint-env jasmine */
describe('agcLibraryLoaderProvider', function() {

    it('should use the selected loader strategy implementation', function(){
        
        // Expect agcLibraryLoader to return this from $get.
        var placeholderLoader = {};
        module('googlechart', 'googlechart.mocks', function($provide, agcLibraryLoaderProvider){

            $provide.factory('agcFakeLoader', function($q){
                return placeholderLoader;
            });

            // This is the call under test.
            agcLibraryLoaderProvider.setLoader("fake");
        });

        inject(function(agcLibraryLoader){
            expect(agcLibraryLoader).toEqual(placeholderLoader);
        });
    });

    it('should default to the JSAPI loader if selected loader does not exist', function(){
        // Expect agcLibraryLoader to return this from $get.
        var placeholderLoader = {};
        module('googlechart', 'googlechart.mocks', function($provide, agcLibraryLoaderProvider){

            $provide.factory('agcJsapiLoader', function($q){
                return placeholderLoader;
            });

            // This is the call under test.
            agcLibraryLoaderProvider.setLoader("foo");
        });

        inject(function(agcLibraryLoader){
            expect(agcLibraryLoader).toEqual(placeholderLoader);
        });
    });
});
