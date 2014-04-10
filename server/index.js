var ws = require('websocket.io');
var server = ws.listen(8124);

var players = [];

server.on('connection', function(socket) {
    console.log('Connection started');

    socket.on('message', function(data) {
        try {
            var json = JSON.parse(data),
                index;

            // user add
            if ( json.uuid ) {
                index = players.indexOf(json.uuid);
                if ( json.type === 'add' && index === -1 ) {
                    players.push(json.uuid);
                    server.clients.forEach(function(client) {
                        client && client.send(JSON.stringify({'uuids', players}));
                    });
                }
                else if ( json.type === 'remove' && index !== -1 ) {
                    players.splice(index, 1);
                    server.clients.forEach(function(client) {
                        client && client.send(JSON.stringify({'uuids', players}));
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
