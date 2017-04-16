describe ('gstatic loader strategy provider implementation', function(){
    var agcScriptTagHelperBackend,
        provider,
        $injector,
        $rootScope,
        mockGoogleApi;

    beforeEach(function(){

        angular.module('googlechart.mocks')
            .config(function(agcGstaticLoaderProvider){
                provider = agcGstaticLoaderProvider;
            });

        module('googlechart');
        module('googlechart.mocks')

        inject(function(_$injector_, _$rootScope_, _agcScriptTagHelperBackend_, _mockGoogleApi_) {
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            agcScriptTagHelperBackend = _agcScriptTagHelperBackend_;
            window.google = mockGoogleApi = _mockGoogleApi_;
        });
    });

    it ('should call the tag helper with https://www.gstatic.com/charts/loader.js', function(){
        agcScriptTagHelperBackend.expect('https://www.gstatic.com/charts/loader.js');
        agcScriptTagHelperBackend.when('https://www.gstatic.com/charts/loader.js').succeed();

        var loaderPromise = $injector.get("agcGstaticLoader");

        agcScriptTagHelperBackend.verifyNoOutstandingExpects();
        agcScriptTagHelperBackend.verifyNoOutstandingRequests();
    });

    describe('should use both loaders when it', function(){

        beforeEach(function(){
            agcScriptTagHelperBackend.expect('https://www.gstatic.com/charts/loader.js');
            agcScriptTagHelperBackend.when('https://www.gstatic.com/charts/loader.js').succeed();

            agcScriptTagHelperBackend.expect('https://www.google.com/jsapi');
            agcScriptTagHelperBackend.when('https://www.google.com/jsapi').succeed();
        });

        it('had useBothLoaders() called', function(){
            provider.useBothLoaders();

            var loaderPromise = $injector.get("agcGstaticLoader");

            $rootScope.$apply();
        });

        it('had useBothLoaders() called with true', function(){
            provider.useBothLoaders(true);

            var loaderPromise = $injector.get("agcGstaticLoader");

            $rootScope.$apply();
        });

        describe ('has version less than 45 and', function(){

            beforeEach(function(){
                provider.setVersion(44);
            });

            ['map', 'geochart'].forEach(function(package){
                it ('has '+ package +' package included', function(){
                    provider.addPackage(package);

                    var loaderPromise = $injector.get("agcGstaticLoader");

                    $rootScope.$apply();
                });
            });

        });

        // Same tests for map an geochart
        ['map', 'geochart'].forEach(function(package){
            describe ('has package ' + package + ' and', function(){

                beforeEach(function(){
                    provider.addPackage(package);
                });

                it ('has version less than 45', function(){
                    provider.setVersion(44);

                    var loaderPromise = $injector.get("agcGstaticLoader");

                    $rootScope.$apply();
                });

            });
        });

        afterEach(function(){
            agcScriptTagHelperBackend.verifyNoOutstandingExpects();
            agcScriptTagHelperBackend.verifyNoOutstandingRequests();
        });
    });

    afterEach(function(){
        delete window.google;
    });
});
