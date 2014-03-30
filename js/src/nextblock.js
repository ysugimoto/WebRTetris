var NextBlock = {};
(function() {

var doc  = document,
    next = doc.getElementById('nextBlock'),
    ctx  = next.getContext('2d'),
    nextBlock;

NextBlock.create = function() {
    nextBlock = Block.create();
    
    ctx.clearRect(0, 0, 160, 160);
    nextBlock.drawNext(ctx);

    return nextBlock;
};

})();
