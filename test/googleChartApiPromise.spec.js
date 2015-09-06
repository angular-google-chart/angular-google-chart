/* global angular */
/* eslint-env jasmine */
/*
 Due to the nature of this service,
 this is more of an E2E test than
 a unit test
*/
describe('googleChartApiPromise factory', function() {
    var googleChartApiPromise;
    beforeEach(module('googlechart', function($provide) {
        $provide.provider('googleJsapiUrl', function() {
            return {
                $get: function() {
                    return 'https://www.google.com/jsapi';
                }
            };
        });
    }));

    beforeEach(inject(function($injector) {
        googleChartApiPromise = $injector.get('googleChartApiPromise');
    }));

    it('should return a promise', function() {
        expect(googleChartApiPromise).toBeDefined();
        expect(googleChartApiPromise.then).toBeFunction();
        expect(googleChartApiPromise.catch).toBeFunction();
        expect(googleChartApiPromise.finally).toBeFunction();
    });

    it('should load the google api', function(done) {

        googleChartApiPromise.then(function($google) {
            expect($google).toBeDefined();
            expect(google).toBe($google);
            done();
        }).catch(function() {
            /*
             The promise shouldn't fail to load, but if it does then
             we should end the test with a fail.
            */
            expect(true).toBe(false);
            done();
        })
    });
});