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
