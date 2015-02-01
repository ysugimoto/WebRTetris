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

    ctx.drawImage(this.color, point, point, size, size);
    ctx.drawImage(this.color, point, point + size, size, size);
    ctx.drawImage(this.color, point + size, point + size, size, size);
    ctx.drawImage(this.color, point + size, point, size, size);
};
