/* global angular */
(function(){
    angular.module("googlechart")
        .provider("agcLibraryLoader", AgcLibraryLoaderProvider);

    AgcLibraryLoaderProvider.$inject = ["$injector"];

    function AgcLibraryLoaderProvider($injector){

        this.$get = function(loader){
            return loader;
        }

        this.setLoader = function(loaderName){
            loaderName = loaderName.charAt(0).toUpperCase() + loaderName.slice(1);
            if ($injector.has(this.getProviderName(loaderName)))
                this.$get.$inject = [this.getProviderName(loaderName)];
            else
                console.warn("AGC loader type doesn't exist. Defaulting to JSAPI.");
        }

        this.getProviderName = function(loaderName){
            return "agc" + loaderName + "Loader";
        }

        this.setLoader("Jsapi");
    }
})();
