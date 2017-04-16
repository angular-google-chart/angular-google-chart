/* global angular */
(function() {
    angular.module('googlechart')
        .provider('agcGstaticLoader', agcGstaticLoaderProvider);

    function agcGstaticLoaderProvider(){
        var useBothLoaders = false;
        var version = "current";
        var options = {
            packages: ["corechart"]
        };

        /** Add Google Visualization API package to loader configuration. */
        this.addPackage = function(packageName){
            options.packages = options.packages || [];
            options.packages.push(packageName);

            if (needsBothLoaders())
                useBothLoaders = true;
            return this;
        };

        /** Delete key from underlying loader configuration. */
        this.clearOption = function(key){
            delete this._options[key];
            return this;
        };

        /** Remove Google Visualization API package from loader configuration. */
        this.removePackage = function(packageName){
            options.packages = this._options.packages || [];
            var index = options.packages.indexOf(packageName);
            if (index > -1)
                options.packages.splice(index, 1);
            return this;
        };

        /** Set option to value. See developers.google.com/chart/ for information about loader options. */
        this.setOption = function(key, value){
            options[key] = value;
            return this;
        };

        /** Sets underlying loader options object to value provided. Replaces everything, included packages. */
        this.setOptions = function(value){
            options = value;
            return this;
        };

        /** Set Google Visualization API frozen version to load. Default: 'current' */
        this.setVersion = function(value){
            version = value;
            if (needsBothLoaders())
                useBothLoaders = true;
            return this;
        };

        /** Override for internal setting to add both loader scripts. Required under certain conditions. */
        this.useBothLoaders = function(value){
            if (typeof value === 'undefined')
                value = true;

            useBothLoaders = !!value;
            return this;
        };

        /** Check if conditions are correct to need both JSAPI and gstatic loader scripts. */
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
                tagPromise = tagPromise.then(function(){ return agcScriptTagHelper("https://www.google.com/jsapi");});
            var libraryPromise = tagPromise.then(scriptLoadCallback);

            return libraryPromise;
        };
        this.$get.$inject = ["$rootScope", "$q", "agcScriptTagHelper"];
    }
})();
