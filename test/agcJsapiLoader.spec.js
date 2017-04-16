describe('JSAPI loader strategy factory', function(){
    var agcScriptTagHelperBackend,
        $injector,
        $rootScope,
        mockGoogleApi,
        apiConfig;

    beforeEach(function(){
        module('googlechart');
        module('googlechart.mocks', function($provide){
            apiConfig = {
                version: "1"
            };

            $provide.value("googleChartApiConfig", apiConfig);
        });

        inject(function(_$injector_, _$rootScope_, _agcScriptTagHelperBackend_, _mockGoogleApi_) {
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            agcScriptTagHelperBackend = _agcScriptTagHelperBackend_;
            window.google = mockGoogleApi = _mockGoogleApi_;
        });
    });

    it('should add call the tag helper with: "//www.google.com/jsapi"', function(){
        agcScriptTagHelperBackend.expect('//www.google.com/jsapi');
        agcScriptTagHelperBackend.when('//www.google.com/jsapi').succeed();
        
        var loaderPromise = $injector.get("agcJsapiLoader");

        agcScriptTagHelperBackend.verifyNoOutstandingExpects();
        agcScriptTagHelperBackend.verifyNoOutstandingRequests();
    });

    it('should call google.load()', function(){
        var loadSpy = spyOn(mockGoogleApi, 'load').and.callThrough();

        var loaderPromise = $injector.get("agcJsapiLoader");

        agcScriptTagHelperBackend.flush();
        $rootScope.$apply();

        expect(loadSpy).toHaveBeenCalled();
    });

    it ('should return a promise that resolves to the google API', function(done){

        // Create spy to call the google loader callback.
        var loadSpy = spyOn(mockGoogleApi, 'load')
            .and.callFake(function(libraryName, version, settings){
                setTimeout(function(){
                    settings.callback();
                })
            });

        var loaderPromise = $injector.get("agcJsapiLoader");

        loaderPromise.then(function(result){
            expect(result).toBe(mockGoogleApi);
            done();
        }, function(){
            fail();
            done();
        });
        
        agcScriptTagHelperBackend.flush();
        $rootScope.$apply();
    });

    it ('should call the user-defined callback from options, if set', function(done){
        var userCallbackSpy = jasmine.createSpy("userCallbackSpy");

        apiConfig.optionalSettings = {
            callback: userCallbackSpy
        };

        var loadSpy = spyOn(mockGoogleApi, 'load')
            .and.callFake(function(libraryName, version, settings){
                setTimeout(function(){
                    settings.callback();
                })
            });

        var loaderPromise = $injector.get("agcJsapiLoader");

        loaderPromise.then(function(){
            expect(userCallbackSpy).toHaveBeenCalled();
            done();
        }, function(){
            fail();
            done();
        });
        
        agcScriptTagHelperBackend.flush();
        $rootScope.$apply();
    });

    it ('should pass the failure along if the script helper returns a rejection', function(done){
        agcScriptTagHelperBackend
            .when("//www.google.com/jsapi")
            .fail();

        var loaderPromise = $injector.get("agcJsapiLoader");

        loaderPromise.then(function(result){
            fail();
            done();
        }, function(){
            done();
        });

        $rootScope.$apply();
    });

    afterEach(function(){
        delete window.google;
    });
});
