(function(global) {

//= require retriever.min.js
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
//= require gametitle.js
//= require username.js
//= require modal.js

global.Tetris = Tetris;
global.stage  = Stage;

//Tetris.start(document.querySelector('.player'), 300, 600, false);
document.body.style.height = window.innerHeight + 'px';

GameTitle.create();

})(this);
