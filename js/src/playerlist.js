var PlayerList;
(function() {

var doc    = document,
    node   = doc.getElementById('players'),
    locked = false,
    uuid,
    playerName;

PlayerList = {
    update: update,
    setUUID: setUUID,
    lock:   lock,
    unlock: unlock,
    hide: hide,
    show: show,
    setPlayer: setPlayer,
    getPlayer: getPlayer,
    drawPlayerName: drawPlayerName
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
        if ( player.playing > 0 ) {
            li.setAttribute('data-playing', 1);
            li.appendChild(doc.createTextNode('(playing)'));
        }
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

function setPlayer(name) {
    playerName = name;
}

function getPlayer(name) {
    return playerName;
}

function drawPlayerName(ctx) {
    console.log('Draw ' + playerName);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999999';
    ctx.fillText(playerName, 0, 50, 300);
}

node.addEventListener('click', function(evt) {
    var uuid = evt.target.getAttribute('data-uuid');

    evt.stopPropagation();

    if ( evt.target.tagName === 'LI' && uuid && ! evt.target.hasAttribute('data-playing') ) {
        GameEvent.trigger('playerSelected', {uuid: uuid, name: evt.target.firstChild.nodeValue});
        node.style.visibility = 'hidden';
    }
});

})();
