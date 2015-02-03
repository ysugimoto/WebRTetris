var Enemy = {};
(function() {

var doc   = document,
    enemy = doc.querySelector('.enemy'),
    img   = new Image();

img.className = "enemy";
img.width  = 300;
img.height = 600;
img.style.display = "none";
enemy.appendChild(img);

Enemy.show = function() {
    img.style.display = "inline-block";
};

Enemy.setView = function(base64Data) {
    if ( typeof base64Data === "string" ) {
        img.src = base64Data;
    } else {
        img.src = base64Data.data;
    }
};


})();
