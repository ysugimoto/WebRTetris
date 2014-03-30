var ws = require('websocket.io');
var server = ws.listen(8124);

server.on('connection', function(socket) {
    console.log('Connection started');
    console.log(socket.constructor);
    
    socket.on('message', function(data) {
        console.log(JSON.stringify(JSON.parse(data.replace(/\r/, "\n")), "", 2));
        
        server.clients.forEach(function(client) {
            client && client !== socket && client.send(data);
        });
    });
});
