/* global buttons */
/* global m */

let gameFieldW = 200;
let gameFieldH = 200;
let pixelMult;
let windowW = window.innerWidth;
let windowH = window.innerHeight;
let currScene = 'mainMenu';
let lastm = {x: 0, y: 0};



start();

function start() {
    setInterval(mainUpdate, 15);
}
function mainUpdate() {
    
    changeGameSize();
    
    $('#mainMenuPlayButton').x(gameFieldW/2).y(gameFieldH/2);
    
    fitToSize();
}
function calcMouseTranslation() {
    let diff = {
        x: m.x - lastm.x,
        y: m.y - lastm.y
    };
    
    return diff;
}
function changeGameSize() {
    let mDiff = {x: 0, y: 0};
    if(buttons.mouse)
        mDiff = calcMouseTranslation();
//    lastm = m;
    
    gameFieldW += mDiff.x;
    gameFieldH += mDiff.y;
}



function fitToSize() {
    
    pixelMult = windowW/gameFieldW;
    if(pixelMult > windowH/gameFieldH)
        pixelMult = windowH/gameFieldH;
        
    let realFieldH = gameFieldH*pixelMult;
    
    $('.menuContainer, #gameContainer').width(windowW).height(realFieldH);
    $('#gameContainer').offset({top: windowH/2 - realFieldH/2});
    
    fitToSizeJQbottom('#gameContainer');
}

(function($) {
    $.fn.fixY = function(bottom) {
    
    var offsetTop = (fieldH - this[0].offsetTop - this[0].offsetHeight) / pixelMult;
    
    if (typeof bottom !== 'undefined') {
        offsetTop = (fieldH - bottom - this[0].offsetHeight) * pixelMult;
        this[0].style.top = offsetTop + 'px';
        return this;
    } else {
        return offsetTop;
    }
    
  };
})(jQuery);

(function($) {
    $.fn.fixX = function(left) {
    
    var offsetLeft = (this[0].offsetLeft) / pixelMult;
    
    if (typeof left !== 'undefined') {
        offsetLeft = left * pixelMult;
        this[0].style.left = offsetLeft + 'px';
        return this;
    } else {
        return offsetLeft;
    }
    
  };
})(jQuery);