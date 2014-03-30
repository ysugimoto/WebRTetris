var Ticker = function() {};
(function() {

// Implements static method
Ticker.implement = function(fn) {
    fn.prototype = new TickerInterface();

    return fn;
};

Ticker.isImplemented = function(obj) {
    return (obj instanceof TickerInterface);
};

function TickerInterface() {
    this.lastTime        = null;
    this.duration        = 100; // ms
    this._tickerCallback = null;
    this.times           = 0;
    this.paused          = false;
}

TickerInterface.prototype.tick = function(callback) {
    if ( typeof callback === 'function' ) {
        this._tickerCallback = callback;
    }
};

TickerInterface.prototype.pause = function() {
    this.paused = true;
};

TickerInterface.prototype.resume = function() {
    this.paused = false;
};

TickerInterface.prototype.update = function(time) {
    if ( this.lastTime === null ) {
        this.lastTime = time;
        return;
    }

    if ( time - this.lastTime >= this.duration ) {
        this.lastTime = time;
        ! this.paused && this._tickerCallback(++this.times);
    }
};

})();
