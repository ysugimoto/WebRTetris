var Controller;
(function() {

var doc = document;

Controller = Ticker.implement(function() {
    doc.addEventListener('keydown', this);
    doc.addEventListener('keyup', this);
});

Controller.create = function() {
    return new Controller();
};

Controller.prototype.handleEvent = function(evt) {
    if ( evt.type === 'keydown' ) {
        switch ( evt.keyCode ) {
            case 37: // move left
                GameEvent.trigger('moveLeft');
                break;

            case 39: // move right
                GameEvent.trigger('moveRight');
                break;

            case 40: // speed fall
                GameEvent.trigger('speedFall');
                break;

            case 65: // rotate left
            case 38:
                GameEvent.trigger('rotateLeft');
                break;

            case 83: // rotate right
                GameEvent.trigger('rotateRight');
                break;

            case 27: // pause
                GameEvent.trigger('pauseGame');
                break;
        }
    } else if ( evt.type === 'keyup' && evt.keyCode === 40 ) {
        GameEvent.trigger('speedFallEnd');
    }
};

})();
