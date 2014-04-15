var ws     = require('websocket.io');
var config = require('../js/src/config');
var fork   = require('child_process').fork;
var path   = require('path');
var server = ws.listen(config.WEBSOCKET_PORT);

var players = [];

server.on('connection', function(socket) {
    console.log('Connection started');

    socket.on('message', function(data) {
        try {
            var json = JSON.parse(data),
                index;
            
            // user add
            if ( json.uuid ) {
                index = findPlayer(json.uuid);
                if ( json.type === 'add' && index === -1 ) {
                    console.log('player added');
                    players.push({'uuid': json.uuid, 'name': json.name});
                    server.clients.forEach(function(client) {
                        client && client.send(JSON.stringify({'uuids': players}));
                    });
                }
                else if ( json.type === 'remove' && index !== -1 ) {
                    console.log('player removed');
                    players.splice(index, 1);
                    server.clients.forEach(function(client) {
                        client && client.send(JSON.stringify({'uuids': players}));
                    });
                }
                return;
            }


            console.log(JSON.stringify(JSON.parse(data.replace(/\r/, "\n")), "", 2));

            // peer signaling
            server.clients.forEach(function(client) {
                client && client !== socket && client.send(data);
            });
        } catch ( e ) {}
    });

});
console.log('WebSocket listen: ' + config.HOST + ':' + config.WEBSOCKET_PORT);

var _http = fork(process.cwd() + '/server/http.js', [], {'cwd': process.cwd() + '/server'});
process.on('SIGINT', function() {
    console.log('SIGINT');
    _http.kill('SIGINT');
    process.exit();
});

process.on('uncaughtException', function(e) {
    console.log('Caught Error');
});

function findPlayer(uuid) {
    var size  = players.length,
        i     = 0,
        index = -1;

    for ( ; i < size; ++i ) {
        if ( players[i].uuid === uuid ) {
            index = i;
            break;
        }
    }

    return index;
}

