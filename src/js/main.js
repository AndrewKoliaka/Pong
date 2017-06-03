var canvas = null,
    ctx = null;

var player1 = null,
    player2 = null,
    ball = null;

// constants
var player1Keys = {
    DOWN: 83,
    UP: 87,
    LEFT: 65,
    RIGHT: 68
}

var player2Keys = {
    DOWN: 40,
    UP: 38,
    LEFT: 37,
    RIGHT: 39
}

var SPACE_KEY = 32;

var direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

var color = {
    PLAYER_1: 'green',
    PLAYER_2: 'red',
    BONUS_BOX: 'skyblue',
    BALL: 'black'
}

var gameState = {
    ABOUT: 'ABOUT',
    PAUSE: 'PAUSE',
    PLAY: 'PLAY',
    FINISHED: 'FINISHED'
}

var bonusBoxType = {
    MOVEMENT_SPEED: 'MOVEMENT_SPEED',
    FAST_BALL: 'FAST_BALL',
    MORE_BALLS: 'MORE_BALLS'
}

var collisionObject = {
    BORDER_RIGHT: 'BORDER_RIGHT',
    BORDER_LEFT: 'BORDER_LEFT',
    BONUS_BOX: 'BONUS_BOX',
    PLAYER: 'PLAYER',
    OPPONENT_SIDE: 'OPPONENT_SIDE'
}

var popup = {
    ABOUT: document.getElementById('about-popup'),
    SCORE: document.getElementById('score-popup'),
    PAUSE: document.getElementById('pause-popup')
}

// handler for keyDown event
function keyPressed(e) {
    switch (e.keyCode) {
        case player2Keys.UP:
            player2.setDirection(direction.UP)
            break;
        case player2Keys.DOWN:
            player2.setDirection(direction.DOWN)
            break;
        case player2Keys.RIGHT:
            player2.setDirection(direction.RIGHT);
            break;
        case player2Keys.LEFT:
            player2.setDirection(direction.LEFT);
            break;
        case player1Keys.UP:
            player1.setDirection(direction.UP);
            break;
        case player1Keys.DOWN:
            player1.setDirection(direction.DOWN)
            break;
        case player1Keys.RIGHT:
            player1.setDirection(direction.RIGHT);
            break;
        case player1Keys.LEFT:
            player1.setDirection(direction.LEFT);
            break;
        case SPACE_KEY:
            view.togglePopup(popup.PAUSE);
            break;
    }
}

// handler for keyUp event
function keyUpped(e) {
    switch (e.keyCode) {
        case player2Keys.UP:
            player2.goUp = false;
            break;
        case player2Keys.DOWN:
            player2.goDown = false;
            break;
        case player2Keys.RIGHT:
            player2.goRight = false;
            break;
        case player2Keys.LEFT:
            player2.goLeft = false;
            break;
        case player1Keys.UP:
            player1.goUp = false;
            break;
        case player1Keys.DOWN:
            player1.goDown = false;
            break;
        case player1Keys.RIGHT:
            player1.goRight = false;
            break;
        case player1Keys.LEFT:
            player1.goLeft = false;
            break;
    }
}

// help-method which removes target element from array
Array.prototype.removeElement = function (el) {
    var index = this.indexOf(el);
    if (index > -1) {
        this.splice(index, 1);
        return true;
    }
    return false;
}

// occurs when dom and all scripts completely loaded
window.onload = game.init.bind(game);