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
        playerName = prompt('Input your player name');

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
        'name': playerName || 'unknown',
        'type': 'add'
    }));

    window.onbeforeunload = function() {
        ws.send(JSON.stringify({
            'uuid': uuid,
            'type': 'remove'
        }));
    };

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
