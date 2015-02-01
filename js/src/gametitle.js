var GameTitle = {};
(function() {

    GameTitle.create = function() {
        var title = document.getElementById("gameTitle"),
            one   = title.querySelector(".player-single"),
            two   = title.querySelector(".player-double");

        Layer.show("");
        title.style.display = "block";

        one.addEventListener("click", function() {
            Layer.hide();
            title.style.display = "none";
            Tetris.start(document.querySelector('.player'), 300, 600, false);
        });
        two.addEventListener("click", function() {
            title.style.display = "none";
            Tetris.start(document.querySelector('.player'), 300, 600, true);
        });
    };

})();
