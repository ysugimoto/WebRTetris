var PlayerList;
(function() {

var doc    = document,
    node   = doc.getElementById('players'),
    locked = false,
    uuid,
    playerName,
    playerImage;

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
        li,
        img;

    ul.className = "user-others-list";

    for ( ; i < size; ++i ) {
        player = players[i];
        if ( uuid &&  player.uuid === uuid ) {
            continue;
        }
        li = doc.createElement('li');
        img = doc.createElement('img');
        img.src = player.image;
        img.width = 40;
        img.height = 40;
        li.appendChild(img);
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

function setPlayer(name, image) {
    playerName = name;
    playerImage = image;
}

function getPlayer(name) {
    return  ( playerName ) ? { name: playerName, image: playerImage } : false;
}

function drawPlayerName(ctx) {
    console.log('Draw ' + playerName);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999999';
    ctx.fillText(playerName, 0, 50, 300);
}

node.addEventListener('click', function(evt) {
    var uuid = evt.target.getAttribute('data-uuid'),
        element = evt.target;

    evt.stopPropagation();

    if ( getPlayer() === false ) {
        return;
    }

    if ( element.tagName === "IMG" ) {
        element = element.parentNode;
    }

    if ( element.tagName === 'LI' && uuid && ! element.hasAttribute('data-playing') ) {
        GameEvent.trigger('playerSelected', {
            uuid: uuid,
            name: element.lastChild.nodeValue,
            image: element.firstChild.src
        });
        Modal.dialog({
            msg: "Sending offer..."
        });
    }
});

})();
