describe('Null loader strategy implementation', function(){
    var $injector,
        $rootScope,
        mockGoogleApi,
        provider;

    beforeEach(function(){
        angular.module("googlechart")
            .config(function(agcNullLoaderProvider){
                provider = agcNullLoaderProvider;
            });

        module("googlechart");
        module("googlechart.mocks");

        inject(function(_$injector_, _$rootScope_, _mockGoogleApi_){
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            window.google = mockGoogleApi = _mockGoogleApi_;
        });
    });

    it('should return a function that resolves to window.google by default', function(done){
        var loaderPromise = $injector.get("agcNullLoader");
        
        loaderPromise.then(function(result){
            expect(result).toBe(mockGoogleApi);
            done();
        }, function(){
            fail();
            done();
        });

        $rootScope.$apply();
    });

    it('should return the override object if provided', function(done){
        var fakeLib = {};
        provider.overrideLibrary(fakeLib);

        var loaderPromise = $injector.get("agcNullLoader");

        loaderPromise.then(function(result){
            expect(result).toBe(fakeLib);
            expect(result).not.toBe(mockGoogleApi);
            done();
        }, function(){
            fail();
            done();
        });

        $rootScope.$apply();
    });

    it('should wait for trigger function if it has been fetched', function(done){
        var trigger = provider.getTriggerFunction();

        var loaderPromise = $injector.get("agcNullLoader");

        var promiseSpy = jasmine.createSpy("promiseSpy").and.callFake(function(){
            done();
        });
        
        loaderPromise.then(promiseSpy, function(){
            fail();
            done();
        });

        $rootScope.$apply();

        expect(promiseSpy).not.toHaveBeenCalled();

        trigger();

        $rootScope.$apply();
    });

    it ('should resolve properly if the trigger function already called', function(done){
        var trigger = provider.getTriggerFunction();

        trigger();

        var loaderPromise = $injector.get("agcNullLoader");
        
        loaderPromise.then(function(result){
            done();
        }, function(){
            fail();
            done();
        });

        $rootScope.$apply();
    });

    afterEach(function(){
        delete window.google;
    });
});
