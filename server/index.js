var ws     = require('websocket.io');
var http   = require('http');
var fs     = require('fs');
var url    = require('url');
var path   = require('path');
var config = require('../js/src/config');
var server = ws.listen(config.WEBSOCKET_PORT);

// constant document root
var DOCUMENT_ROOT = path.resolve(__dirname, '../');
var NOT_FOUND     = '404 NotFound.';

console.log('DOCUMENT_ROOT is "' + DOCUMENT_ROOT + '"');

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
                        client && client.send(JSON.stringify({'uuids': players}));
                    });
                }
                else if ( json.type === 'remove' && index !== -1 ) {
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

http.createServer(function(request, response) {
    var requestPath = url.parse(request.url).pathname,
        requestFile = DOCUMENT_ROOT +((requestPath === '/') ? '/index.html' : requestPath),
        header      = {},
        body        = '';

console.log('Request handled: ' + requestPath);

    if ( ! fs.existsSync(requestFile) ) {
        response.writeHead(404, {
            "Content-Type": 'text/plain',
            "Content-Length": NOT_FOUND.length
        });
        response.end(NOT_FOUND, 'utf8');
        return;
    }

    fs.readFile(requestFile, function(err, buffer) {
        switch ( path.extname(requestFile) ) {
            case '.html':
                header = {"Content-Type": 'text/html'};
                body   = buffer.toString('utf8');
                break;
            case '.js':
                header = {"Content-Type": 'application/javascript'};
                body   = buffer.toString('utf8');
                break;
            case '.css':
                header = {"Content-Type": 'text/css'};
                body   = buffer.toString('utf8');
                break;
            case '.jpg':
                header = {"Content-Type": 'image/jpeg'};
                body   = buffer;
                break;
            case '.png':
                header = {"Content-Type": 'image/png'};
                body   = buffer;
                break;
            default:
                return;
        }

        response.writeHead(200, header);
        response.end(body);
    });
}).listen(config.HTTP_PORT);
console.log('HTTP listen: ' + config.HOST + ':' + config.HTTP_PORT);
