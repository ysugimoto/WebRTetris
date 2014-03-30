var Event = {};
(function() {

Event.implement = function(fn) {
   fn.prototype = new EventInterface();

   return fn;
};

function EventInterface() {
    this.callbacks = {};
}

EventInterface.prototype.on = function(name, callback) {
    if ( ! (name in this.callbacks) ) {
        this.callbacks[name] = [];
    }

    this.callbacks[name].push(callback);
};

EventInterface.prototype.off = function(name, callback) {
    if ( ! (name in this.callbacks) ) {
        return;
    } else if ( ! callback ) {
        delete this.callbacks[name];
        return;
    }

    var size = this.callbacks[name].length,
        i    = 0;

    for ( ; i < size; ++i ) {
        if ( this.callbacks[name][i] === callback ) {
            this.callbacks[name].splice(i--, 1);
        }
    }
};

EventInterface.prototype.trigger = function(name, data) {
    if ( ! (name in this.callbacks) ) {
        return;
    }

    var size = this.callbacks[name].length,
        i    = 0;

    for ( ; i < size; ++i ) {
        this.callbacks[name][i]({data: data});
    }
};

})();
