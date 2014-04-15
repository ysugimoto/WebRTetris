(function(global) {

//= require config.js
//= require event.js
//= require ticker.js
//= require gameevent.js
//= require peerconnection.js
//= require playerlist.js
//= require stage.js
//= require block.js
//= require controller.js
//= require score.js
//= require nextblock.js
//= require layer.js
//= require enemy.js
//= require tetris.js

global.Tetris = Tetris;
global.stage  = Stage;

Tetris.start(document.querySelector('.player'), 300, 600, true);


document.body.style.height = window.innerHeight + 'px';

})(this);
