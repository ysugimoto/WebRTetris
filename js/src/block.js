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

    //ctx.fillStyle    = this.color;
    this.drawHistory = [];

    for ( i = 0; i < my; ++i ) {
        for ( j = 0; j < mx; ++j ) {
            if ( mm[i][j] > 0 ) {
                y = (py + i) * size;
                x = (px + j) * size;
                ctx.drawImage(this.color, x, y, size, size);
                //ctx.fillRect(x, y, size, size);
                this.drawHistory[this.drawHistory.length] = [x, y];
            }
        }
    }

    if ( isFirst === true && ! Stage.isAcceptable(mm, px, py) ) {
        GameEvent.trigger('gameover');
    }

};

})();
//= require_tree blocks
