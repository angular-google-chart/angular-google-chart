/* global angular */
(function() {
    angular.module('googlechart')
        .provider('agcGstaticLoader', agcGstaticLoaderProvider);

    function agcGstaticLoaderProvider(){
        var useBothLoaders = false;
        var version = "current";
        var options = {
            packages: ["corechart"]
        }

        this.setVersion = function(value){
            version = value;
            if (needsBothLoaders())
                useBothLoaders = true;
            return this;
        }

        this.addPackage = function(packageName){
            options.packages = options.packages || [];
            options.packages.push(packageName);

            if (needsBothLoaders())
                useBothLoaders = true;
            return this;
        }

        this.removePackage = function(packageName){
            options.packages = this._options.packages || [];
            var index = options.packages.indexOf(packageName);
            if (index > -1)
                options.packages.splice(index, 1);
            return this;
        }

        this.setOption = function(key, value){
            options[key] = value;
            return this;
        }

        this.setOptions = function(value){
            options = value;
            return this;
        }

        this.clearOption = function(key){
            delete this._options[key]
            return this;
        }
        
        this.useBothLoaders = function(value){
            useBothLoaders = !!value;
            return this;
        }

        function needsBothLoaders(){
            var versionCheck, packageCheck;

            versionCheck = !isNaN(+version) && +version < 45;
            packageCheck = options.packages.indexOf("geochart") > -1 ||
                options.packages.indexOf("map") > -1;

            return versionCheck && packageCheck;
        }

        this.$get = function($rootScope, $q, agcScriptTagHelper){

            function scriptLoadCallback(){
                if (!google ||
                    !google.charts ||
                    typeof google.charts.setOnLoadCallback !== 'function'){
                    return $q.reject("Google charts library loader not present.");
                }
                
                var deferred = $q.defer();

                google.charts.load(version, options);

                google.charts.setOnLoadCallback(function(){
                    $rootScope.$apply(function(){
                        deferred.resolve(google);
                    });
                });

                return deferred.promise;
            }

            var tagPromise = agcScriptTagHelper("https://www.gstatic.com/charts/loader.js");
            if (useBothLoaders)
                tagPromise = tagPromise.then(function(){ return agcScriptTagHelper("https://www.google.com/jsapi")})
            var libraryPromise = tagPromise.then(scriptLoadCallback);

            return libraryPromise;
        }
        this.$get.$inject = ["$rootScope", "$q", "agcScriptTagHelper"];
    }
})();
