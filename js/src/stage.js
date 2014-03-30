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
