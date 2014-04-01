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

    this.webSocket        = new WebSocket(Config.WEBSOCKET_SERVER);
    this.webSocket.onopen = this.setWebSocketEvents.bind(this);
    this.dataChannel      = null;

    this.setPeerConnectionEvents();
});

PeerConnection.prototype.sendOffer = function() {
    var peer = this.peer,
        ws   = this.webSocket;

    this.dataChannel = peer.createDataChannel('stageImageTransfer');
    this.initDataChannel();

    peer.createOffer(function(sdp) {
        peer.setLocalDescription(sdp, function() {
            ws.send(JSON.stringify({"sdp": sdp}));
        });
    }, error);
};

PeerConnection.prototype.setWebSocketEvents = function() {
    var peer = this.peer,
        ws   = this.webSocket,
        that = this;

    ws.onmessage = function(evt) {
        var message = JSON.parse(evt.data),
            sdp,
            candidate;

        if ( peer.remoteDescription ) {
            // alredy connected peer.
            //return;
        }

        if ( message.sdp ) {
            sdp = new RTCSessionDescription(message.sdp);
            if ( sdp.type === 'offer' ) {
                peer.setRemoteDescription(sdp, function() {
                    peer.createAnswer(function(localSdp) {
                        peer.setLocalDescription(localSdp, function() {
                            ws.send(JSON.stringify({"sdp": localSdp}));
                        });
                    }, error);
                });
            } else {
                peer.setRemoteDescription(sdp);
                GameEvent.trigger('peerConnected');
            }
        } else if ( message.candidate ) {
            candidate = new RTCIceCandidate(message.candidate);
            peer.addIceCandidate(candidate);
        } else if ( message.uuid ) {
            console.log('offer send');
            that.sendOffer();
        }
    };

    ws.send(JSON.stringify({'uuid': this.uuid}));
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
            GameEvent.trigger('stageTransfer', evt.data);
        }
    };
};


})();
