WebRTetris(Server side)
=======================

Network play "Tetris" using WebRTC-DataChannel API at server-side

### How to build

Install depend npm modules

```
npm install
```

Execute node process with server.js

```
node server.js
```

Case: forever

```
npm install -g forever
forver start server.js
```

Case: pm2

```
npm install -g pm2
pm2 start server.js
```

And access to local

http://localhost:8889
