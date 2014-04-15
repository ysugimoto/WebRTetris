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

