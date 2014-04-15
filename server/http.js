var http   = require('http');
var fs     = require('fs');
var url    = require('url');
var path   = require('path');
var config = require('../js/src/config');

// constant document root
var DOCUMENT_ROOT = path.resolve(__dirname, '../');
var NOT_FOUND     = '404 NotFound.';

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
