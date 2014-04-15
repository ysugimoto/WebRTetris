var PlayerList;
(function() {

var doc    = document,
    node   = doc.getElementById('players'),
    locked = false,
    uuid;

PlayerList = {
    update: update,
    setUUID: setUUID,
    lock:   lock,
    unlock: unlock,
    hide: hide,
    show: show
};

function update(players) {
    var ul   = doc.createElement('ul'),
        size = players.length,
        i    = 0,
        player,
        li;

    for ( ; i < size; ++i ) {
        player = players[i];
        if ( player.uuid === uuid ) {
            continue;
        }
        li = doc.createElement('li');
        li.appendChild(doc.createTextNode(player.name));
        li.setAttribute('data-uuid', player.uuid);
        ul.appendChild(li);
    }

    if ( node.firstChild ) {
        node.replaceChild(ul, node.firstChild);
    } else {
        node.appendChild(ul);
    }
}

function lock() {
    locked = true;
}

function unlock() {
    locked = false;
}

function setUUID(id) {
    uuid = id;
}

function hide() {
    node.style.display = 'none';
}

function show() {
    node.style.display = 'block';
}

node.addEventListener('click', function(evt) {
    var uuid = evt.target.getAttribute('data-uuid');

    evt.stopPropagation();

    if ( evt.target.tagName === 'LI' && uuid ) {
        GameEvent.trigger('playerSelected', {uuid: uuid, name: evt.target.firstChild.nodeValue});
        node.style.visibility = 'hidden';
    }
});

})();
