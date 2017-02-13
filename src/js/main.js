var canvas = null,
    ctx = null;

var KEY_RIGHT = 39,
    KEY_LEFT = 37;

var ai = null,
    player = null;

function keyPressed(e) {
    if (e.keyCode === KEY_RIGHT) {
        player.goLeft = false;
        player.goRight = true;
    } else if (e.keyCode === KEY_LEFT) {
        player.goLeft = true;
        player.goRight = false;
    }
}

function keyUpped() {
    if (player.goRight) {
        player.goRight = false;
    } else if (player.goLeft) {
        player.goLeft = false;
    }
}

function aiThink() {
    if (ball.x - ball.width / 4 < this.x) {
        this.goRight = false;
        this.goLeft = true;
    } else if (ball.x + ball.width + ball.width / 4 > this.x + this.width) {
        this.goRight = true;
        this.goLeft = false;
    }
}

window.onload = game.init.bind(game);
