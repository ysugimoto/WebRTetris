var PeerConnection;
(function() {

var RTCPeerConnection     = window.RTCPeerConnection     || window.webkitRTCPeerConnection     || window.mozRTCPeerConnection,
    RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription,
    RTCIceCandidate       = window.RTCIceCandidate       || window.webkitRTCIceCandidate       || window.mozRTCIceCandidate,
    WebSocket             = window.WebSocket             || window.mozWebSocket;

var BYTES_PER_PACKET   = 64*1024;
var DATA_END_SIGNATURE = '\0';

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

        this.sendOffer(player);
    }.bind(this));
});

PeerConnection.prototype.sendOffer = function(player) {
    var peer = this.peer,
        ws   = this.webSocket,
        me   = this.uuid;

    this.dataChannel = peer.createDataChannel('stageImageTransfer');
    this.initDataChannel();

    peer.createOffer(function(sdp) {
        peer.setLocalDescription(sdp, function() {
            var selfPlayer = PlayerList.getPlayer();
            ws.send(JSON.stringify({
                "sdp":  sdp,
                "from": me,
                "to":   player.uuid,
                "image": selfPlayer.image,
                "name": selfPlayer.name
            }));
        });
    }, error);
};

PeerConnection.prototype.setWebSocketEvents = function() {
    var peer = this.peer,
        ws   = this.webSocket,
        uuid = this.uuid,
        that = this;

    ws.onmessage = function(evt) {
        var message = JSON.parse(evt.data),
            sdp,
            candidate;

        if ( message.uuids ) {
            PlayerList.update(message.uuids);
        }

        if ( "rejected" in message ) {
            if ( message.to === uuid ) {
                GameEvent.trigger("playerRejected");
            }
        }

        if ( message.sdp && message.to && message.to === uuid) {
            if ( ! that.remotePlayer ) {
                sdp = new RTCSessionDescription(message.sdp);
                that.remotePlayer = message.from;
                if ( sdp.type === 'offer' ) {
                    Modal.confirm({
                        msg: "Offered from: " + message.name,
                        image: message.image
                    }, function() {
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
                    }, function() {
                        ws.send(JSON.stringify({
                            "from": uuid,
                            "to":   message.from,
                            "rejected": true
                        }));
                        that.remotePlayer = null;
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
            try {
                candidate = new RTCIceCandidate(message.candidate);
                peer.addIceCandidate(candidate);
            } catch (e) {}
        }
    };

    window.onbeforeunload = function() {
        ws.send(JSON.stringify({
            'uuid': uuid,
            'type': 'remove'
        }));
    };

    Layer.show("");
    UserName.create(function(user) {

        ws.send(JSON.stringify({
            'uuid': uuid,
            'name': user.screen_name,
            'image': user.profile_image_url,
            'type': 'add'
        }));


        PlayerList.setPlayer(user.screen_name, user.profile_image_url);
    });

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

    if ( ! data || data === "undefined" ) {
        return;
    }

    var buffer = "",
        pointer = 0;

    data += DATA_END_SIGNATURE;
    // UDP accept 64KB/packet. so, we send chunk
    do {
        buffer = data.slice(pointer, BYTES_PER_PACKET);
        this.dataChannel.send(buffer);
        pointer += BYTES_PER_PACKET;
        data = data.slice(pointer);
    } while ( data.length > BYTES_PER_PACKET );
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
    var buffer = "";

    this.dataChannel.onmessage = function(evt) {
        // Check strict data-uri string transfered
        if ( evt.data ) {
            if ( evt.data.slice(0, 4) === 'LOSE' ) {
                GameEvent.trigger('winGame');
            } else {
                if ( evt.data[evt.data.length-1] === DATA_END_SIGNATURE ) {
                    GameEvent.trigger('stageTransfer', buffer + evt.data.slice(0, -1));
                    buffer = "";
                } else {
                    buffer += evt.data;
                }
            }
        }
    };
};


})();
