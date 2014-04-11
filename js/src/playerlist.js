var PlayerList;
(function() {

var doc      = document,
    fragment = doc.createDocumentFragment(),
    node     = doc.getElementById('players'),
    locked   = false;

node.appendChild(fragment);

PlayerList = {
    update: update,
    lock:   lock,
    unlock: unlock
};

function update(players) {
    var flg  = doc.createDocumentFragment(),
        ul   = doc.crateElement('ul'),
        size = players.length,
        i    = 0,
        player,
        li;

    for ( ; i < size; ++i ) {
        player = players[i];
        li = doc.createElement('li');
        li.appendChild(doc.createTextNode(player.name));
        li.setAttribute('data-uuid', plyer.uuid);
        ul.appendChild(li);
    }

    node.replaceChild(fragment, flg);
    fragment = flg;
}

function lock() {
    locked = true;
}

function unlock() {
    locked = false;
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
