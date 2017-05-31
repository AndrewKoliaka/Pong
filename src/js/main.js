var canvas = null,
    ctx = null;

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

var direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

var player1 = null,
    player2 = null,
    ball = null;

function keyPressed(e) {
    switch (e.keyCode) {
        case player2Keys.UP:
            player2.setDirection(direction.UP);
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
    }
}

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

window.onload = game.init.bind(game);