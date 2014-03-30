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
