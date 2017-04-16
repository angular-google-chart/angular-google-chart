/* global angular */
(function(){
    angular.module("googlechart")
        .provider("agcNullLoader", AgcNullLoaderProvider);
    
    /** Fake loader strategy. Use this if you're loading the google charts library
     *  in some non-standard way.
     */

    function AgcNullLoaderProvider(){
        this._hasTrigger = false;
        this._libraryOverride = null;
        this._triggerFunction = (function(){
            // If the trigger function is called before $get,
            // just act as if it was never fetched.
            if (this._deferred)
                this._deferred.resolve(this._libraryOverride || google);
            else
                this._hasTrigger = false;
        }).bind(this);
        this._deferred = null;
    }

    AgcNullLoaderProvider.prototype.$get = function($q){
        this._deferred = $q.defer();
        
        if (!this._hasTrigger)
            this._deferred.resolve(this._libraryOverride || google);
        
        return this._deferred.promise;
    };
    AgcNullLoaderProvider.prototype.$get.$inject = ["$q"];

    AgcNullLoaderProvider.prototype.getTriggerFunction = function(){
        // Records that the trigger function was fetched.
        // Will wait for it to be called to resolve.
        // This is useful for manual, but deferred, loading of
        // the google charts library.
        this._hasTrigger = true;
        return this._triggerFunction;
    };

    /** Forces angular-google-chart to load this object as the google library.
     *  Makes no checks to ensure that the object passed is compatible. Use
     *  at own risk.
     */
    AgcNullLoaderProvider.prototype.overrideLibrary = function(library){
        this._libraryOverride = library;
    };
})();
