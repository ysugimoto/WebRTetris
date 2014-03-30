var Config;
(function() {

var config = {};

config.STAGE_X      = 10;
config.STAGE_Y      = 20;
config.BLOCK_SIZE   = 30;
config.BLOCK_COLORS = [];

config.BLOCK_COLORS[1] = '#2836cc';
config.BLOCK_COLORS[2] = '#c428cc';
config.BLOCK_COLORS[3] = '#45cc28';
config.BLOCK_COLORS[4] = '#cca828';
config.BLOCK_COLORS[5] = '#3a0000';
config.BLOCK_COLORS[6] = '#432020';
config.BLOCK_COLORS[7] = '#cc9c28';

// Server configuration
config.ICE_SERVER       = {'iceServers': [{'url': 'stun:stun.l.goolge.com:19302'}]};
config.WEBSOCKET_SERVER = 'ws://localhost:8124';

Config = config;

})();
