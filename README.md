WebRTetris
=======================

Network play "Tetris" using WebRTC-DataChannel API 

### How to build
Checkout this project

```
git clone https://github.com/ysugimoto/WebRTetris.git
```

Install depend npm modules

```
npm install
```

And install grunt-cli at global if you not.

```
npm install -g grunt-cli
```

Execute grunt command with "deploy" parameter

```
grunt deploy
```

### Server configuration(Signaling/HTTP Sever)

See https://github.com/ysugimoto/WebRTetris/tree/master/server

### Changing ICE/HTTP/WebSocket host

Configuration file exists at `js/src/config.js`.
Please opne your editor and change below properties:

```
// ICE(STUN Server)
config.ICE_SERVER = {'iceServers': [{'url': 'stun:stun.l.goolge.com:19302'}]};

// Sever host
config.HOST = 'localhost';
// HTTP Port
config.HTTP_PORT      = 8889;
// WebSocket Port
config.WEBSOCKET_PORT = 8124;
```

Don't forget rebuild application:

```
grunt deploy
```


