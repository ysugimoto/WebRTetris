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

    ctx.drawImage(this.color, pointX, pointY, size, size);
    ctx.drawImage(this.color, pointX + size, pointY, size, size);
    ctx.drawImage(this.color, pointX + size + size, pointY, size, size);
    ctx.drawImage(this.color, pointX + size + size, pointY + size, size, size);
};
