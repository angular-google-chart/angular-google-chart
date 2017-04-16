(function(){
    angular.module('googlechart.mocks')
        .provider("agcScriptTagHelper", AgcScriptTagHelperProvider)
        .provider("agcScriptTagHelperBackend", AgcScriptTagHelperBackendProvider);
    
    var backend, q;

    AgcScriptTagHelperProvider.$inject = [];
    function AgcScriptTagHelperProvider(){
        this.$get = function($q){
            backend = backend || new AgcScriptTagHelperBackend();
            q = q || $q;
            return backend.mockHelper;
        }
    }

    function ScriptTagHelperWhenBuilder(url, whensCollection) {
        this._whens = whensCollection;
        this.url = url;
    }

    ScriptTagHelperWhenBuilder.prototype.fail = function(reason) {
        var when = {
            url: this.url,
            respond: function(){
                this.response = this.response || q.reject(reason);
                return this.response;
            }
        }

        this._whens.push(when);
    }

    ScriptTagHelperWhenBuilder.prototype.succeed = function(response) {
        var when = {
            url: this.url,
            respond: function(){
                this.response = this.response || q.when(response);
                return this.response;
            }
        }

        this._whens.push(when);
    }

    function AgcScriptTagHelperBackend(){
        var _calls = [],
            _whens = [],
            _expects = [],
            _outstandingRequests = []
            _outstandingExpects = [];
        
        this.flush = function(resolve){
            // Resolve all successfully by default.
            // False value for resolve is reject result.
            resolve = typeof resolve === 'undefined' ? true : resolve;
            var request;
            while (_outstandingRequests.length){
                request = _outstandingRequests.shift();
                request.deferred[resolve ? 'resolve' : 'reject']();
            }
        }

        this.when = function(url){
            return new ScriptTagHelperWhenBuilder(url, _whens);
        }

        this.expect = function(url){
            var exists = false, i;
            for (i = 0; i < _expects.length; i++){
                if (_expects[i].url === url){
                    exists = true;
                    break;
                }
            }

            if (!exists)
                _expects.push({
                    url: url,
                    count: 0
                });
        }

        this.verifyNoOutstandingRequests = function(){
            if (_outstandingRequests.length){
                throw new Error("Outstanding Script Tag Helper Requests.");
            }
        }

        this.verifyNoOutstandingExpects = function(){
            var uncalledExpects = [];
            var i;
            for (i = 0; i < _expects.length; i++){
                if (_expects[i].count < 1)
                    uncalledExpects.push(_expects[i].url);
            }

            if (uncalledExpects.length)
                throw new Error("Script Tag Helper had uncalled expects: " + uncalledExpects.join (", ") + ".");
        }

        this.mockHelper = function(url){

            _calls.push(url);
            var i;

            // Increment expecation if set.
            for (i = 0; i < _expects.length; i++){
                if (_expects[i].url === url){
                    _expects[i].count++;
                    break;
                }
            }
            for (i = 0; i < _whens.length; i++){
                // Handle pre-defined 'when'.
                if (_whens[i].url === url){
                    _whens[i].result = _whens[i].respond();
                    return _whens[i].respond();
                }
            }
                
            // No 'when' for url.
            var request = {
                deferred: q.defer(),
                url: url
            }

            _outstandingRequests.push(request);

            return request.deferred.promise;
        }
    }

    function AgcScriptTagHelperBackendProvider(){
        this.$get = function($q){
            backend = new AgcScriptTagHelperBackend();
            q = $q;
            return backend;
        }
    }
})();
