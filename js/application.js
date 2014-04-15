(function(global) {

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

// Future implement block image
//var colors = [
//    '',
//    // red
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACT0lEQVR4Ae3WS24TXRAF4HObToIJYNgHG0HsCokNsAu2kOkf6d8JAyBJv++rHlS1ZRQxwI7JjByVStcDf7qullzdXl1dbzYXRGwhD4tHLXhIZI0hpdSUUinUmvvu6//KJMsoU29dc9SSlSqO1lXFv5IjLVOcxnHo/3v/sSUiU8L5RfPilVu7G4vAi4/Q3UUtWjPFJc2TuX0/LMvS1soyD03YhrPz5vK1i8aJhbX6+bDLpLWwu+PYd/0wdqnYTPzWNgeoNi+3dnfrqhKYAhWfySHYSok4x53bmRvzSFpKbpnZ56sCaHO5VfEfwf0Pn3taIPxnWkW05jxPU9/f9UO35JF1YdRaWhE1IojATyLL2H35jIen4/ObWEfSJLBiZqNFa4GrbJ3vvuOkDKn0FVFQFbTOqYVFWNdPsk7jNHpiL2PEvD29RkS1KpPkeBqdBdlF/Er72+OGyGk0A+Luffrx80Q/0f8ArYr96VFpc9Ui3olOg1i9moBwn3aUGcJK9S//nloT93qrqmBSIq2Zc8rLHE6ibwkz43kDDabvaa1FSuYU8+zruKOzIdeJkQ9tXQVIURS3Fd+qH0ixaXDR7LeMpEg5pvX94XYYbyL1BKOLQHAgZmXx+xZxWnYFo8k3eo2zuQav+7hMrEnACsXhNMBZ8DmQgtftNYvTvnZLqXEcfBDj1CXfm5FRjqZDWPUGG7jou3wdo5TSxph2br+6y/qgGUe5TgPPAiwaoA10pxtda1srXX/4tCzT+g5YiCoziSiOjqpaYxZmMoFLZqI327c/ARn2odbMxN2AAAAAAElFTkSuQmCC',
//    // yellow
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxNC4zLjMxRoRUyQAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJ/SURBVEiJ7ZdLbtswEIY/O8rDCVqn98npCvQCvUJyiqwL9CZZxK2sl/UgZ8guhrIVIwvb8aZABhgIsqH5+JME5+fs+flXXCyuEVFUFRFBRAkhEEIkxshHwuoEVBXnPH3f45yQLRbXPDz8BgSogTI9O2AAPHAqPKQaHaoNfV/TNCWPj9/JRCQVvwa+JEiYPAOgJ8AD4IAB1ZZhaGiakqKoaNuWzHsFKmAJXAFf98A6eT8GKoAjhJZhqGmagqKoWa8dfd+PistUeJmUL998bDNyaMSUQgjdFrpe1+T5QFlGnBvIVBVb01HVMqmsgD9pUG367VCwra1Iw2ZTkufVFto04L0jCyGmwmGSNfDzCJXvx9UVFMUVq5WnLCNtC10HqkoWwrgJpuu5+jB0jKJw5Dm0LTgH3kOMkcz+HndtZDfN54mqsvQeQrCcgMGUemxDdWcD973l/jmUvX0dVYezgVVN5X7Mz0Y4Mj7Bn+BP8P8Pnpxc0zPtYz7rkJjvQGODkJTnCRHL/WMzKR5bogKeGDtms/OAxyZxeQlZBvMkdW72dTR8HSE0OLc5DxVYraCuzQA4Z00DIDOwI8aBEDqcq6nrkqK4pCg8VWUjfq/DvBcx2tQOA7y+wsvLzgDc3cHNzcSBxNihOhqzkr9/a1YrIc+tiQ/DbqSHhIgNtq7t2/H70QioirlMkU2CVskNOqoq0nVW5NjLxHxua7pYmFJVU13XBvbekdm1okpmuyHPzZhtNruRHguezeDiwsze7a3V2GwMHiM458i6rt9C12u/taB9f5rafXCMuxzh3nsy74Wnpx+0bZMuVA4Rj6pg1ve0sE0bUQ2oCs45nBsQEe7vv/EP4tgpLDuVls0AAAAASUVORK5CYII=',
//    // lightgreen
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACPUlEQVR4Ae2VTY4jRRBG3wzp9jRofrgP10JijcQF5gpwilkjseUULPDgdlWWqzLjJ4MsVcuLWdBuq1donj+lauF6Dn2WMtKnT7+/ud+79Y/bireV6PAcojXvcVfRpRQVS9375w9/GJbJA0M/F5ZKVTS41t5oldpfnHzKJQ/T8OOvPyczU3TP/i1vg2i07exxPIhrvIJ09ezzVKfuHU/jPM/J1EfG97y/4+4d7y5qx7fnJ72GCTK3Odd8mk75lOVBainr1ANDEN3eZ+/n5duKPtEv0WPY0pZH70OuxxpDiNRk7pncaJvd8ZHxM58HhpnZ8f9Wby1PNg3nYTyOm5cJUUmtRVc02pZM/shHnktv83SnB129Myy4e4rWBLmUe+DATchJOLJ6BZSISIDjW2tbG9zGuAaFtoZNDTSaooYtLNxGWUNwIX3xdzcat+F88Wri5fmq/qr+/6uDuDy8pDqIy+oyjNsw1rxes5ECthu1R9ElFl5x+/W0g/RoTxFhWE+lllbOembPLRwgwz3sYUdsakFq1HW/SR7ysDvt9KSMUKA9sRwxqPA3/AUCCt/BG5p7aq31EhZf92bf8/mfbAfjCCNU8CsqLpChssahrTG3daOf7dy94zT2fSxHiTFYwCB4mtewg3tQcBDI0FCVJKJjGfu802nS47o3OW+/f536FXwDd/AtOJxBIBCRVJby6H1YvUxQLiM/Rx1bHu2qmlTtp99+Oc9TKUVF1NTdokVwNRFBNG/mptKpZvbhw/f/Aq8KNix5i2NJAAAAAElFTkSuQmCC',
//    // blue
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACXklEQVR4Ae3VS24TQRAG4JqHHTtZRMBRkBDHRrDLGombsCDCnhlPv+pJ9dhRwiY4VlYopVKv0p9/VWdUzd3d9+12wywi7Ke3LmUGLypdyhVEyjn72W+3V0P3URpIClEgERQCYhCF83UzIAEkiFlCyNNh/vTuS1+TNrDqYHsFTqmBPbTWO2e5LDVNLhJjcXcch3gVeyJOAs0G+g6uXbfTD6iCCdgZrmiNnFHnWMZpnsYhhX3OqaYOWonrTc3up1W3BmGF522rXemCGjxvdfdh3lEZEbEXkUSnCdxsKhozTAFC8Qugz9N2mnKMPE5hGHbR3TwyzkTYq6oTZqcppwLffsDLa12mIUz3nlcoCicRcdpYFlrrOQa4rFIYMO3cVUUTMrMeYMnrLrteU19WXCbGSYXcstrWPz60LA9CF9IqWTm7CA/VP31uWMZ9WZmKmcKTauH1641+o/9j+vFDP5a9Lu2u1bO26MUfOntD0zZN+xetD5sF0QCaC2jh7N22K2j7o96amSxoIUhFY0a4qDDeMx6Ekwo6CWC9mdawbFj3G47jIQ9DjgOVSSWb6XOe1dsqpYRfef5pjq6oW9+AbUS0bplCVoqE457f/w6He0o7wkm5mMk/R6ycPa9KOf59TbNWEe6ZOWV29+DuuE9hx2USTqZ8zv+Lj7VpV22/7YRMZZnGAUzr2kWkOWTf84dpcBfzyBQ8gqmctxcc79pu3a2uzUTqXWQwxNKnlE5u3Nd9jLNyPjPyUW6g0gBW27yrTkQ9EX/+8DVu55wzIjKjiKjauTRUzQ+pxYjkeZnp9vb9H2CzqquGELfvAAAAAElFTkSuQmCC',
//    // lightblue
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACWklEQVR4Ae3WT24zRRAF8Nfjtv2ZjygSd+AEHAZxPU6AWGbNAeAE7JAgwvN/pv9U1aN7TERgY8fKjjyVauX+qVVppcY/Pf10On0SUVUpvZRtIfGm2JaipJRDCKX70+n469ffKDErRq09GBIhxO04icR6cM46raEfp29//sHXmxIHh8+7ahlqp9WuBG92k2HNOodY3KHvlmXxOcukeNhh7/Dl7kLXrlo7b3CFyMQqNm3u2Hehb0NY661HBVH1g6udhBLZINdgbqVA2Nyu3Ldr1+6sU59S8qo6K8haDx5GTIo2Y9yGrrxOJ8McpZ/moT1fXFunnJM3s2D/THlWfP873p4Dui6cn6sbFsZVVQvNTJhCSyfOgvsShk6GM4ubEyWT9Hh5CTToNo37YvNQqqAwA22jtxhAVjranTRTYAyv35T/z9/EcG9UwX+d9njX/E/oD/qDJv4O+a40L8Xa9V6IKqXgGtc0r2hWUQkhghJwd/97cn7Pnb/onqRsdLLi2hIzcLyD1vbZltEdT+5whN8DLLRlFpd1v8XUD6N1XRo6m4d6EdqVpavCFKX9Q55/Q05OcmOfcfikat4KqsXV6bLnz3/GsoeGc6VzpF4bfqVDuW/9cYrOFLTGTFW8iCxZijuUPd+1od/QuFLlpudSxur3ZQ6N5OIxJ5tHmGWXfEp53L53pr6L/baPw8wcYXoTDeeaHfzBHb9wqihnJdnK5KNf1/XFbau7TIyBIre5VUazc/tDc9mvJDgzp8zsc5bvfvlxWabtGzCJJFU1I0DcFrI2rZHkctpFYX58/OovsY2FynrDbyoAAAAASUVORK5CYII=',
//    // orange
//    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACR0lEQVR4Ae3VXW77RBQF8JNkkvxToIH9sDokNsAWYBV9RkJshAcCie3xx8z9xLeJSvtC0qhv9OjIyoP105FjedLT06+73VZE50hELeJz8J5YxGaEiEspRJJm9/vNb0iCmqEtLEMmSIUxbtfdoBU8ae3LkPvc/vz1D0lEsGKkLbbfAA638zUKvUkPlyBVaaxjP7tN243LMTEr0GGxx2qD7SMCDRqmUAP8umsCJQs3913TtPnUU9mVWA1rg9juEdv3L3fD+JrsURPj6eye2nzsa1ucqCZVBefL2C/7GFs7jH+htuARpldoN0iVqR+69th0xxxuT2CmZOZBuF1KGb//hHdmAzTt5tDx7I6MiaGqM21QQrga1+GAu9IMdBwxu6Rgg7snAIGaQ/zyNO5KV6NsMI8G/eoFYphAJtyVIlHHv0lv/5O5hruisRd4S39g/jf0J/1Ju7/8+FA6OL98sk1wV8Siy0X0FR2owuay87S4//OE9QppedGTx1KJajUuXIYt7slhRCbsErYJ6+ULreQyuxONObdt06ybkbsaK8zxH3GHGKrizwF/ZJCC1/jK8SXhcso4T0rP52Zu/z7lQ5bjiJmuCrXrj7hI7K1yud88qipJ5tTh2e2ez2Pqik8CsZteluUinu8uxV71GJ4p6Dh2ibgMXd+1Tdcfhzg3B44J6nBcz2KB1QKbFR6CxhB6bCKiNE3l7J7CjXO+3Dw5aGC1xAbwc2edQ2fmxCy/PP44pr48FCISYVUxc9wc9zBVTVUoUkXk2/13/wAuwGWy97igZQAAAABJRU5ErkJggg==',
//    // purple
//    'data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAACUUlEQVR4Ae3WT27rNhAG8JFM2Q7QNn1v+85ZoOfocbLuAXqDLNpdi9gSbYmcv/1kLlpvasfIrpl8ILiY/DigAjDp5eXXp/1ezUxRhvilIuhd5eFuDoZFylKwpqf97ttvX0NDs8ooWH1xr+7idLcegKvbYnKSOc95rL//NCdVC4l+16fv02o5aShaO+/CguI+lx20zLKcljzmcRrneU6iKpMMz0O/7dMPCX3tALhtf9MNjeBY3bzk40XmqVRep9ZRQUDH7FjR7eo99yFxw441oGWRkgtc/Ix1nGNmjmSgs7YB03MKC52U/2KcZ7OF3aDbLZdTwbSH6TDV6RznQkW4T+6+EqCdsOKY119e6f113B6PcoRbqTKx2TZ5hLMDbZfLfzI9VJlzpgxXSZGIIRFR+0sALyYyyWP0TDNiZA6JAkn/fGiJTjtf/DGaiRH6V6Wrb4LyeIxuw17TH1r/F/qT/qSDrjYfRsea8FhXfdA2MqSnvqOOGt3QsEskdNHHaCFBNrRBmp4CpWu8uhat5/oYPdK40LKl7UAD9D4CtDu7VcO8JZdpnI7DMUtGHxMHxX+/X0YmJHDf6A2bPe0R6MkdCVtMlst7jPctHw56yLTSaHXym1fMxK259QcF1k41qSqfeXWny3vMl/eY2Oiu/0JwrYnSjnbtfVFSHIPNRjgxyzzNmHc8jZNMcCvVdv6ddE9909uvQMe65ZqWgnsocLNkvMc482rku+mgaClUoItIEtE/fl7m87kUZiGVjdnWY1jb7q4+Irl1qr18N3BVlecfv/wN4W2ZJreJKGMAAAAASUVORK5CYII='
//];
//
//colors.forEach(function(base64, index) {
//    if ( index > 0 ) {
//        config.BLOCK_COLORS[index] = new Image();
//        config.BLOCK_COLORS[index].src = base64;
//    }
//});


// Server configuration
config.ICE_SERVER     = {'iceServers': [{'url': 'stun:stun.l.goolge.com:19302'}]};
config.HOST           = 'localhost';
config.HTTP_PORT      = 8889;
config.WEBSOCKET_PORT = 8124;

Config = config;

// node config
if ( typeof exports !== 'undefined' ) {
    module.exports = config;
}


})();

var Event = {};
(function() {

Event.implement = function(fn) {
   fn.prototype = new EventInterface();

   return fn;
};

function EventInterface() {
    this.callbacks = {};
}

EventInterface.prototype.on = function(name, callback) {
    if ( ! (name in this.callbacks) ) {
        this.callbacks[name] = [];
    }

    this.callbacks[name].push(callback);
};

EventInterface.prototype.off = function(name, callback) {
    if ( ! (name in this.callbacks) ) {
        return;
    } else if ( ! callback ) {
        delete this.callbacks[name];
        return;
    }

    var size = this.callbacks[name].length,
        i    = 0;

    for ( ; i < size; ++i ) {
        if ( this.callbacks[name][i] === callback ) {
            this.callbacks[name].splice(i--, 1);
        }
    }
};

EventInterface.prototype.trigger = function(name, data) {
    if ( ! (name in this.callbacks) ) {
        return;
    }

    var size = this.callbacks[name].length,
        i    = 0;

    for ( ; i < size; ++i ) {
        this.callbacks[name][i]({data: data});
    }
};

})();

var Ticker = function() {};
(function() {

// Implements static method
Ticker.implement = function(fn) {
    fn.prototype = new TickerInterface();

    return fn;
};

Ticker.isImplemented = function(obj) {
    return (obj instanceof TickerInterface);
};

function TickerInterface() {
    this.lastTime        = null;
    this.duration        = 100; // ms
    this._tickerCallback = null;
    this.times           = 0;
    this.paused          = false;
}

TickerInterface.prototype.tick = function(callback) {
    if ( typeof callback === 'function' ) {
        this._tickerCallback = callback;
    }
};

TickerInterface.prototype.pause = function() {
    this.paused = true;
};

TickerInterface.prototype.resume = function() {
    this.paused = false;
};

TickerInterface.prototype.update = function(time) {
    if ( this.lastTime === null ) {
        this.lastTime = time;
        return;
    }

    if ( time - this.lastTime >= this.duration ) {
        this.lastTime = time;
        ! this.paused && this._tickerCallback(++this.times);
    }
};

})();

var GameEvent;
(function() {

var _event = Event.implement(function() {});

GameEvent = new _event();

})();

var PeerConnection;
(function() {

var RTCPeerConnection     = window.RTCPeerConnection     || window.webkitRTCPeerConnection     || window.mozRTCPeerConnection,
    RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription,
    RTCIceCandidate       = window.RTCIceCandidate       || window.webkitRTCIceCandidate       || window.mozRTCIceCandidate,
    WebSocket             = window.WebSocket             || window.mozWebSocket;

function error(err) {console.log('offer/answer error');}

PeerConnection = Event.implement(function() {
    this.generateUUID();

    // Chrome's DataChannel needs optional parameters.
    //if ( RTCPeerConnection === webkitRTCPeerConnection ) {
    //    this.peer = new RTCPeerConnection(Config.ICE_SERVER, {
    //        optional: [{RtpDataChannels: true}]
    //    });
    //} else {
        this.peer = new RTCPeerConnection(Config.ICE_SERVER);
    //}
    
    PlayerList.setUUID(this.uuid);

    this.webSocket        = new WebSocket('ws://' + Config.HOST + ':' + Config.WEBSOCKET_PORT);
    this.webSocket.onopen = this.setWebSocketEvents.bind(this);
    this.dataChannel      = null;
    this.remotePlayer     = null;

    this.setPeerConnectionEvents();

    // Game connection event
    GameEvent.on('playerSelected', function(evt) {
        var player = evt.data;

        this.sendOffer(player.uuid);
    }.bind(this));
});

PeerConnection.prototype.sendOffer = function(uuid) {
    var peer = this.peer,
        ws   = this.webSocket,
        me   = this.uuid;

    this.dataChannel = peer.createDataChannel('stageImageTransfer');
    this.initDataChannel();

    peer.createOffer(function(sdp) {
        peer.setLocalDescription(sdp, function() {
            ws.send(JSON.stringify({
                "sdp":  sdp,
                "from": me,
                "to":   uuid
            }));
        });
    }, error);
};

PeerConnection.prototype.setWebSocketEvents = function() {
    var peer = this.peer,
        ws   = this.webSocket,
        uuid = this.uuid,
        that = this,
        playerName = prompt('Input your player name') || 'unknown';

    ws.onmessage = function(evt) {
        var message = JSON.parse(evt.data),
            sdp,
            candidate;

        if ( message.uuids ) {
            PlayerList.update(message.uuids);
        }

        if ( message.sdp && message.to && message.to === uuid) {
            if ( ! that.remotePlayer ) {
                sdp = new RTCSessionDescription(message.sdp);
                that.remotePlayer = message.from;
                if ( sdp.type === 'offer' ) {
                    peer.setRemoteDescription(sdp, function() {
                        peer.createAnswer(function(localSdp) {
                            peer.setLocalDescription(localSdp, function() {
                                ws.send(JSON.stringify({
                                    "sdp":  localSdp,
                                    "from": uuid,
                                    "to":   that.remotePlayer
                                }));
                            });
                        }, error);
                    });
                } else if ( sdp.type === 'answer' ) {
                    peer.setRemoteDescription(sdp, function() {
                        GameEvent.trigger('peerConnected');

                        ws.send(JSON.stringify({
                            "from": uuid,
                            "to": that.remotePlayer,
                            "type": "playing"
                        }));
                    });
                }
            }
        } else if ( message.candidate ) {
            candidate = new RTCIceCandidate(message.candidate);
            peer.addIceCandidate(candidate);
        }
    };

    ws.send(JSON.stringify({
        'uuid': uuid,
        'name': playerName,
        'type': 'add'
    }));

    window.onbeforeunload = function() {
        ws.send(JSON.stringify({
            'uuid': uuid,
            'type': 'remove'
        }));
    };

    PlayerList.setPlayer(playerName);

};

PeerConnection.prototype.setPeerConnectionEvents = function() {
    var that = this;

    this.peer.onicecandidate = function(evt) {
        if ( ! evt.candidate ) {
            return;
        }

        that.webSocket.send(JSON.stringify({"candidate": evt.candidate}));
    };

    this.peer.ondatachannel = function(evt) {
        that.dataChannel = evt.channel;
        that.initDataChannel();

        console.log('game start');
        GameEvent.trigger('peerConnected');
    };
};

PeerConnection.prototype.send = function(data) {
    if ( ! this.dataChannel ) {
        throw new Error('DataChannel not connected.');
    }

    this.dataChannel.send(data);
};

PeerConnection.prototype.generateUUID = function() {
    this.uuid = [
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    ].join("");
};

PeerConnection.prototype.initDataChannel = function() {
    this.dataChannel.onmessage = function(evt) {
        // Check strict data-uri string transfered
        if ( evt.data ) {
            if ( evt.data === 'LOSE' ) {
                GameEvent.trigger('winGame');
            } else {
                GameEvent.trigger('stageTransfer', evt.data);
            }
        }
    };
};


})();

var PlayerList;
(function() {

var doc    = document,
    node   = doc.getElementById('players'),
    locked = false,
    uuid,
    playerName;

PlayerList = {
    update: update,
    setUUID: setUUID,
    lock:   lock,
    unlock: unlock,
    hide: hide,
    show: show,
    setPlayer: setPlayer,
    getPlayer: getPlayer,
    drawPlayerName: drawPlayerName
};

function update(players) {
    var ul   = doc.createElement('ul'),
        size = players.length,
        i    = 0,
        player,
        li;

    for ( ; i < size; ++i ) {
        player = players[i];
        if ( player.uuid === uuid ) {
            continue;
        }
        li = doc.createElement('li');
        li.appendChild(doc.createTextNode(player.name));
        li.setAttribute('data-uuid', player.uuid);
        if ( player.playing > 0 ) {
            li.setAttribute('data-playing', 1);
            li.appendChild(doc.createTextNode('(playing)'));
        }
        ul.appendChild(li);
    }

    if ( node.firstChild ) {
        node.replaceChild(ul, node.firstChild);
    } else {
        node.appendChild(ul);
    }
}

function lock() {
    locked = true;
}

function unlock() {
    locked = false;
}

function setUUID(id) {
    uuid = id;
}

function hide() {
    node.style.display = 'none';
}

function show() {
    node.style.display = 'block';
}

function setPlayer(name) {
    playerName = name;
}

function getPlayer(name) {
    return playerName;
}

function drawPlayerName(ctx) {
    console.log('Draw ' + playerName);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999999';
    ctx.fillText(playerName, 0, 50, 300);
}

node.addEventListener('click', function(evt) {
    var uuid = evt.target.getAttribute('data-uuid');

    evt.stopPropagation();

    if ( evt.target.tagName === 'LI' && uuid && ! evt.target.hasAttribute('data-playing') ) {
        GameEvent.trigger('playerSelected', {uuid: uuid, name: evt.target.firstChild.nodeValue});
        node.style.visibility = 'hidden';
    }
});

})();

var Stage;
(function() {

var isTick      = false,
    queue       = [],
    stageWidth  = 0,
    stageHeight = 0,
    animationFrame,
    lastTime;

// feature detection
animationFrame = requestAnimationFrame
                 || webkitRequestAnimationFrame
                 || mozRequestAnimationFrame
                 || msRequestAnimationFrame
                 || setTimeout;

Stage = {
    matrix: createStageMatrix(),
    tick: tick,
    addQueue: addQueue,
    removeQueue: removeQueue,
    isAcceptable: isAcceptable,
    putBlock: putBlock,
    deleteLines: deleteLines,
    draw: draw,
    set: set
};

// implements
function tick() {
    if ( isTick ) {
        return false;
    }

    isTick   = true;
    lastTime = Date.now();
    console.log('Tick function: ' + animationFrame.name);

    animationFrame(_tick);
}

function _tick() {
    var now = Date.now(),
        i   = -1;

    while ( queue[++i] ) {
        queue[i].update(now);
    }

    lastTime = now;
    animationFrame(_tick);
}

function addQueue(ticker) {
    if ( ! Ticker.isImplemented(ticker) ) {
        throw new TypeError('addQueue: object must be implemented Ticker interface.');
    }

    queue.push(ticker);
}

function removeQueue(ticker) {
    var i = -1;

    while ( queue[++i] ) {
        if ( queue[i] === ticker ) {
            queue.splice(i, 1);
            break;
        }
    }
}

function isAcceptable(matrix, x, y) {
    var stage = Stage.matrix,
        my    = matrix.length,
        mx    = matrix[0].length,
        sy    = stage.length,
        sx    = stage[0].length,
        i, j;

    // Check matrix in stage
    if ( y < 0 || y + my > sy || x < 0 || x + mx > sx ) {
        return false;
    }

    for ( i = 0; i < my; ++i ) {
        for ( j = 0; j < mx; ++j ) {
            if ( matrix[i][j] > 0 && stage[i + y][j + x] > 0 ) {
                return false;
            }
        }
    }

    return true;
}

function putBlock(block) {
    var stage = Stage.matrix,
        y     = block.positionY,
        x     = block.positionX,
        mm    = block.matrix,
        my    = block.matrix.length,
        mx    = block.matrix[0].length,
        sy    = stage.length,
        sx    = stage[0].length,
        lines = [],
        i, j, ln;

    for ( i = 0; i < my; ++i ) {
        for ( j = 0; j < mx; ++j ) {
            if ( mm[i][j] > 0 ) { 
                stage[i + y][j + x] = block.blockID;
            }
        }
    }

    Stage.matrix = stage;

    // calculate delete line
    for ( i = 0; i < sy; ++i ) {
        ln = true;
        for ( j = 0; j < sx; ++j ) {
            if ( stage[i][j] === 0 ) {
                ln = false;
                break;
            }
        }
        if ( ln === true ) {
            lines[lines.length] = i;
        }
    }

    return lines;
}

function createStageMatrix() {
    var i = 0,
        j = 0,
        x = Config.STAGE_X,
        y = Config.STAGE_Y,
        matrix = [];

    for ( ; i < y; ++i ) {
        matrix[i] = [];
        for ( j = 0; j < x; ++j ) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

function set(width, height) {
    stageWidth  = width;
    stageHeight = height;
}

function draw(ctx) {
    var matrix = Stage.matrix,
        size   = Config.BLOCK_SIZE,
        color  = Config.BLOCK_COLORS,
        x, y, i, j;

    y = matrix.length;
    x = matrix[0].length;

    ctx.clearRect(0, 0, stageWidth, stageHeight);

    for ( i = 0; i < y; ++i ) {
        for ( j = 0; j < x; ++j ) {
            if ( matrix[i][j] > 0 ) {
                ctx.fillStyle = color[matrix[i][j]];
                ctx.fillRect(j * size, i * size, size, size);
            }
        }
    }
}

function deleteLines(lines, ctx) {
    var sx = Config.STAGE_X,
        sy = Config.STAGE_Y,
        size = Config.BLOCK_SIZE,
        len = lines.length,
        i, j, index, line;

    for ( i = 0; i < len; ++i ) {
        index = lines[i];
        ctx.clearRect(0, size * index, size * sx, size);
        Stage.matrix.splice(index, 1);

        line = [];
        for ( j = 0; j < sx; ++j ) {
            line[j] = 0;
        }
        Stage.matrix.unshift(line);
    }
}
})();

var Block = function() {};
(function() {

var blockClass = [null, 'Square', 'Line', 'ZLeft', 'ZRight', 'Convex', 'LLeft', 'LRight'];

Block = {
    create: create,
    implement: implement
};

function create() {
    var blockID = (Math.random() * (blockClass.length - 1) + 1) | 0,
        block   = new Block[blockClass[blockID]](blockID);

    return block;
}

function implement(fn) {
    fn.prototype = new BlockInterface();

    return fn;
}

function BlockInterface() {
    this.matrix      = [];
    this.positionX   = Config.STAGE_X / 2 - 1;
    this.positionY   = 0;
    this.drawHistory = [];
}

BlockInterface.prototype.rotateRight = function() {
    var y = this.matrix.length,
        x = this.matrix[0].length,
        i, j,
        matrix = [];

    for ( i = 0; i < x; ++i ) {
        matrix[i] = [];
        for ( j = 0; j < y; ++j ) {
            matrix[i][y - j - 1] = this.matrix[j][i];
        }
    }

    if ( Stage.isAcceptable(matrix, this.positionX, this.positionY) ) {
        this.matrix = matrix;
        return true;
    }

    return false;
};

BlockInterface.prototype.rotateLeft = function() {
    var y = this.matrix.length - 1,
        x = this.matrix[0].length - 1,
        i, j, xx,
        matrix = [];

    for ( i = x; i >= 0; --i ) {
        xx = x - i;
        matrix[xx] = [];
        for ( j = y; j >= 0; --j ) {
            matrix[xx][j] = this.matrix[j][i];
        }
    }

    if ( Stage.isAcceptable(matrix, this.positionX, this.positionY) ) {
        this.matrix = matrix;
        return true;
    }

    return false;

};
BlockInterface.prototype.moveLeft = function() {
    if ( Stage.isAcceptable(this.matrix, this.positionX - 1, this.positionY) ) {
        this.positionX--;
        return true;
    }

    return false;
};
BlockInterface.prototype.moveRight = function() {
    if ( Stage.isAcceptable(this.matrix, this.positionX + 1, this.positionY) ) {
        this.positionX++;
        return true;
    }

    return false;
};
BlockInterface.prototype.fall = function() {
    if ( Stage.isAcceptable(this.matrix, this.positionX, this.positionY + 1) ) {
        this.positionY++;
        return true;
    }

    return false;
};
BlockInterface.prototype.reDraw = function(ctx) {
    var len  = this.drawHistory.length,
        size = Config.BLOCK_SIZE,
        i    = 0;

    for ( ; i < len; ++i ) {
        ctx.clearRect(this.drawHistory[i][0], this.drawHistory[i][1], size, size);
    }

    this.draw(ctx);
};
BlockInterface.prototype.draw = function(ctx, isFirst) {
    var my    = this.matrix.length,
        mx    = this.matrix[0].length,
        px    = this.positionX,
        py    = this.positionY,
        mm    = this.matrix,
        color = Config.BLOCK_COLORS,
        size  = Config.BLOCK_SIZE,
        i, j, x, y;

    ctx.fillStyle    = this.color;
    this.drawHistory = [];

    for ( i = 0; i < my; ++i ) {
        for ( j = 0; j < mx; ++j ) {
            if ( mm[i][j] > 0 ) {
                y = (py + i) * size;
                x = (px + j) * size;
                ctx.fillRect(x, y, size, size);
                this.drawHistory[this.drawHistory.length] = [x, y];
            }
        }
    }

    if ( isFirst === true && ! Stage.isAcceptable(mm, px, py) ) {
        GameEvent.trigger('gameover');
    }

};

})();
Block.Convex = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [0, 1, 0],
        [1, 1, 1]
    ];
});

Block.Convex.prototype.drawNext = function(ctx) {
    var size   = Config.BLOCK_SIZE,
        pointX = (160 - size * 3) / 2,
        pointY = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX + size, pointY, size, size);
    ctx.fillRect(pointX, pointY + size, size * 3, size);
};

Block.Line = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [1, 1, 1, 1]
    ];
});

Block.Line.prototype.drawNext = function(ctx) {
    var size  = Config.BLOCK_SIZE,
        pointX = (160 - size * 4) / 2,
        pointY = (160 - size) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX, pointY, size * 4, size);
};
Block.LLeft = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [1, 1, 1],
        [1, 0, 0]
    ];
});

Block.LLeft.prototype.drawNext = function(ctx) {
    var size   = Config.BLOCK_SIZE,
        pointX = (160 - size * 3) / 2,
        pointY = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX, pointY, size * 3, size);
    ctx.fillRect(pointX, pointY + size, size, size);
};
Block.LRight = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [1, 1, 1],
        [0, 0, 1]
    ];
});

Block.LRight.prototype.drawNext = function(ctx) {
    var size   = Config.BLOCK_SIZE,
        pointX = (160 - size * 3) / 2,
        pointY = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX, pointY, size * 3, size);
    ctx.fillRect(pointX + size * 2, pointY + size, size, size);
};
Block.Square = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [1, 1],
        [1, 1]
    ];
});

Block.Square.prototype.drawNext = function(ctx) {
    var size  = Config.BLOCK_SIZE,
        point = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(point, point, size * 2, size * 2);
};
Block.ZLeft = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [1, 1, 0],
        [0, 1, 1]
    ];
});

Block.ZLeft.prototype.drawNext = function(ctx) {
    var size   = Config.BLOCK_SIZE,
        pointX = (160 - size * 3) / 2,
        pointY = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX, pointY, size * 2, size);
    ctx.fillRect(pointX + size, pointY + size, size * 2, size);
};

Block.ZRight = Block.implement(function(blockID) {
    this.blockID = blockID;
    this.color   = Config.BLOCK_COLORS[blockID];
    this.matrix  = [
        [0, 1, 1],
        [1, 1, 0]
    ];
});

Block.ZRight.prototype.drawNext = function(ctx) {
    var size   = Config.BLOCK_SIZE,
        pointX = (160 - size * 3) / 2,
        pointY = (160 - size * 2) / 2;

    ctx.fillStyle = this.color;
    ctx.fillRect(pointX + size, pointY, size * 2, size);
    ctx.fillRect(pointX, pointY + size, size * 2, size);
};


var Controller;
(function() {

var doc = document;

Controller = Ticker.implement(function() {
    doc.addEventListener('keydown', this);
    doc.addEventListener('keyup', this);
});

Controller.create = function() {
    return new Controller();
};

Controller.prototype.handleEvent = function(evt) {
    if ( evt.type === 'keydown' ) {
        switch ( evt.keyCode ) {
            case 37: // move left
                GameEvent.trigger('moveLeft');
                break;

            case 39: // move right
                GameEvent.trigger('moveRight');
                break;

            case 40: // speed fall
                GameEvent.trigger('speedFall');
                break;

            case 65: // rotate left
                GameEvent.trigger('rotateLeft');
                break;

            case 83: // rotate right
                GameEvent.trigger('rotateRight');
                break;

            case 27: // pause
                GameEvent.trigger('pauseGame');
                break;
        }
    } else if ( evt.type === 'keyup' && evt.keyCode === 40 ) {
        GameEvent.trigger('speedFallEnd');
    }
};

})();

var Score = {};
(function() {

var doc = document,
    lines = doc.getElementById('linesValue'),
    score = doc.getElementById('scoreValue'),
    level = doc.getElementById('levelValue');

lines.normalize();
score.normalize();
level.normalize();

Score.set = function(type, value) {
    switch ( type ) {
        case 'line':
            lines.firstChild.nodeValue = value;
            break;

        case 'score':
            score.firstChild.nodeValue = value;
            break;

        case 'level':
            level.firstChild.nodeValue = value;
            break;
    }
};

})();

var NextBlock = {};
(function() {

var doc  = document,
    next = doc.getElementById('nextBlock'),
    ctx  = next.getContext('2d'),
    nextBlock;

NextBlock.create = function() {
    nextBlock = Block.create();
    
    ctx.clearRect(0, 0, 160, 160);
    nextBlock.drawNext(ctx);

    return nextBlock;
};

})();

var Layer = {};
(function() {

var doc     = document,
    layer   = doc.getElementById('layer'),
    message = layer.querySelector('p'),
    forced  = false;

message.normalize();

Layer.show = function(msg, force) {
    if ( forced ) {
        return;
    }
    message.firstChild.nodeValue = msg;
    layer.classList.add('show');

    if ( ! forced && force ) {
        forced = true;
    }
};

Layer.hide = function() {
    ! forced && layer.classList.remove('show');
};

})();



var Enemy = {};
(function() {

var doc   = document,
    enemy = doc.querySelector('.enemy'),
    img   = new Image();

enemy.appendChild(img);
img.width  = 300;
img.height = 600;

Enemy.setView = function(base64Data) {
    img.src = base64Data.data;
};


})();

var Tetris = Ticker.implement(function (canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.peer   = null;

    this.block       = null;
    this.nextBlock   = null;
    this.lock        = false;
    this.level       = 0;
    this.score       = 0;
    this.deleteLines = 0;
    this.controller  = null;

    Score.set('line', this.deleteLines);
    Score.set('score', this.score);
});

Tetris.start = function(stage, width, height, isDuel) {
    var canvas = document.createElement('canvas'),
        game   = new Tetris(canvas);

    canvas.setAttribute('width',  300);
    canvas.setAttribute('height', 600);
    Stage.set(300, 600);
    stage.appendChild(canvas);

    if ( isDuel ) {
        game.peer = window.peer = new PeerConnection();
        GameEvent.on('peerConnected', function() {
            var CountDown = Ticker.implement(function() {
                var times = 4,
                    that  = this;

                this.duration = 1000;
                this.tick(function() {
                    if ( times === 0 ) {
                        Layer.hide();
                        Stage.removeQueue(that);
                        game.initialize();
                    } else if ( times === 1 ) {
                        Layer.show('Start!');
                    } else {
                        Layer.show(times - 1);
                    }

                    --times;
                });
            }),
            msg = document.querySelector('.message');

            Stage.tick();
            Stage.addQueue(new CountDown());
            msg.parentNode.removeChild(msg);
            PlayerList.hide();
        });
    } else {
        Stage.tick();
        game.initialize();
    }
};

Tetris.prototype.initialize = function() {
    this.score       = 0;
    this.deleteLines = 0;
    this.block       = Block.create();
    this.nextBlock   = NextBlock.create();

    this.block.draw(this.ctx);
    this.setLevel(1);

    if ( ! this.controller ) {
        this.tick(this.timerUpdate.bind(this));
        this.setGameEvents();

        Stage.addQueue(this);

        this.controller = Controller.create();
    }
};

Tetris.prototype.timerUpdate = function() {
    if ( this.lock === true ) {
        return;
    }

    var block  = this.block,
        fallen = block.fall(),
        ctx    = this.ctx,
        canvas = this.canvas,
        that   = this,
        lines,
        queue;

    Stage.draw(ctx);
    block.draw(ctx);
    //PlayerList.drawPlayerName(ctx);

    if ( this.peer ) {
        this.peer.send(this.canvas.toDataURL());
    }

    if ( fallen ) {
        return;
    }

    lines = Stage.putBlock(block);

    if ( lines.length > 0 ) {
        this.lock = true;
        Stage.deleteLines(lines, ctx);
        that.addLineScore(lines.length);
        queue = Ticker.implement(function() {
            var instance = this;

            this.duration = 200;
            this.tick(function() {
                Stage.draw(ctx);
                Stage.removeQueue(instance);
                that.lock = false;
                GameEvent.trigger('putBlock');
                Enemy.setView(canvas.toDataURL());
            });
        });
        Stage.addQueue(new queue());
    } else {
        GameEvent.trigger('putBlock');
    }
};

Tetris.prototype.setLevel = function(level) {
    this.level = level;

    this.duration = 1000 / this.level;
    Score.set('level', this.level);
};

Tetris.prototype.addLineScore = function(lines) {
    this.deleteLines += lines;
    this.score       += lines * this.level * 100;

    this.setLevel((this.deleteLines > 10 ) ? this.deleteLines / 10 | 0 : 1);
    Score.set('line', this.deleteLines);
    Score.set('score', this.score);
};

Tetris.prototype.setGameEvents = function() {
    var that  = this,
        ctx   = this.ctx;

    GameEvent.on('putBlock', function() {
        that.block     = that.nextBlock;
        that.nextBlock = NextBlock.create();
        that.block.draw(ctx, true);
    });
    GameEvent.on('moveLeft', function() {
        that.block.moveLeft() && that.block.reDraw(ctx);
    });
    GameEvent.on('moveRight', function() {
        that.block.moveRight() && that.block.reDraw(ctx);
    });
    GameEvent.on('rotateLeft', function() {
        that.block.rotateLeft() && that.block.reDraw(ctx);
    });
    GameEvent.on('rotateRight', function() {
        that.block.rotateRight() && that.block.reDraw(ctx);
    });
    GameEvent.on('speedFall', function() {
        that.duration = 10;
    });
    GameEvent.on('speedFallEnd', function() {
        that.duration = 1000 / that.level;
    });
    GameEvent.on('pauseGame', function() {
       if ( that.paused ) {
           Layer.hide();
           that.resume();
       } else {
           Layer.show('pause');
           that.pause();
        }
    });
    GameEvent.on('gameover', function() {
        Stage.removeQueue(that);
        if ( that.peer ) {
            that.peer.send('LOSE');
            Layer.show('you lose', true);
        } else {
            Layer.show('Game over', true);
        }

    });
    GameEvent.on('stageTransfer', function(base64Data) {
        Enemy.setView(base64Data);
    });
    GameEvent.on('winGame', function(base64Data) {
        Stage.removeQueue(that);
        Layer.show('You win!', true);
    });
};



global.Tetris = Tetris;
global.stage  = Stage;

Tetris.start(document.querySelector('.player'), 300, 600, true);


document.body.style.height = window.innerHeight + 'px';

})(this);
