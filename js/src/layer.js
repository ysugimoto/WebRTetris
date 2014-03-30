var Layer = {};
(function() {

var doc     = document,
    layer   = doc.getElementById('layer'),
    message = layer.querySelector('p'),
    forced  = false;

message.normalize();

Layer.show = function(msg, force) {
    if ( forced ) {
        return;
    }
    message.firstChild.nodeValue = msg;
    layer.classList.add('show');

    if ( ! forced && force ) {
        forced = true;
    }
};

Layer.hide = function() {
    ! forced && layer.classList.remove('show');
};

})();


