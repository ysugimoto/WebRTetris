var Enemy = {};
(function() {

var doc   = document,
    enemy = doc.querySelector('.enemy'),
    img   = new Image();

enemy.appendChild(img);
img.width  = 300;
img.height = 600;

Enemy.setView = function(base64Data) {
    if ( typeof base64Data === "string" ) {
        img.src = base64Data;
    } else {
        img.src = base64Data.data;
    }
};


})();
