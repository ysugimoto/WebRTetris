var Score = {};
(function() {

var doc = document,
    lines = doc.getElementById('linesValue'),
    score = doc.getElementById('scoreValue'),
    level = doc.getElementById('levelValue');

lines.normalize();
score.normalize();
level.normalize();

Score.set = function(type, value) {
    switch ( type ) {
        case 'line':
            lines.firstChild.nodeValue = value;
            break;

        case 'score':
            score.firstChild.nodeValue = value;
            break;

        case 'level':
            level.firstChild.nodeValue = value;
            break;
    }
};

})();
