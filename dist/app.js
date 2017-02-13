var game = {
    gameFinished: false,
    checkForClash: function() {

        if (ball.y + ball.height > canvas.height) {
            ai.score++;
            this.gameOver();
            return;
        } else if (ball.y < 0) {
            player.score++;
            this.gameOver();
            return;
        }

        if (ball.y + ball.height > player.y + player.height || ball.y < ai.y - ai.height)
            return;
        if (ball.x + ball.width >= canvas.width || ball.x <= 0) {
            ball.changeDirection({});
        } else if (ball.y + ball.height + ball.aY / 2 >= player.y && ball.x + ball.width > player.x && ball.x < player.x + player.width) {
            ball.changeDirection(player);
        } else if (ball.y - ball.aY / 2 <= ai.y + ai.height && ball.x + ball.width > ai.x && ball.x < ai.x + ai.width) {
            ball.changeDirection(ai);
        }
    },

    loop: function() {
        if (this.gameFinished) {
            return;
        }
        player.move();
        aiThink.apply(ai);
        ai.move();
        ball.move();
        window.requestAnimationFrame(this.loop.bind(this));
    },
    gameOver: function() {
        this.gameFinished = true;
        setTimeout(this.restart.bind(this), 2000);
        view.drawScore(player.score, ai.score);
    },
    init: function() {
        ai = new Racket(6);
        player = new Racket(5);
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '15px Arial';
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);
        this.restart();
    },
    restart: function() {
        this.gameFinished = false;
        player.x = (canvas.width - player.width) / 2;
        player.y = (canvas.height - player.height * 3);
        ai.x = (canvas.width - ai.width) / 2;
        ai.y = ai.height * 2;
        player.goRight = false;
        player.goLeft = false;
        ai.goRight = false;
        ai.goLeft = false;
        ball.x = Math.floor(Math.random() * (canvas.width - ball.width));
        ball.y = canvas.height / 2 - ball.height / 2;
        ball.aX = 4;
        ball.aY = 5;
        ball.speedCounter = 0;
        for (var d in ball.dirs) {
            ball.dirs[d] = false;
        }
        ball.dirs.TR = true;
        view.clearRect(0, 0, canvas.width, canvas.height);
        view.drawRect(player.x, player.y, player.width, player.height);
        view.drawRect(ai.x, ai.y, ai.width, ai.height);
        view.drawRect(ball.x, ball.y, ball.width, ball.height);
        view.drawScore(player.score, ai.score);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}

var view = {
    drawRect: function(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    },
    clearRect: function(x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    },
    drawScore: function(playerScore, aiScore) {
        ctx.clearRect(10, canvas.height - 23, ('player: ' + playerScore + ' robot: ' + aiScore).toString().length * 10, 15);
        ctx.fillText('player: ' + playerScore + ' robot: ' + aiScore, 10, canvas.height - 10);
    }
}

var ball = {
    x: null,
    y: null,
    width: 16,
    height: 16,
    aX: null,
    aY: null,
    speedCounter: 0,
    dirs: {
        TL: false, //top left
        TR: true, //top right
        BR: false, //bottom right
        BL: false //bottom left
    },
    move: function() {
        game.checkForClash();
        view.clearRect(this.x, this.y, this.width, this.height);
        if (this.dirs.TL) {
            this.x -= this.aX;
            this.y -= this.aY;
        } else if (this.dirs.TR) {
            this.x += this.aX;
            this.y -= this.aY;
        } else if (this.dirs.BR) {
            this.x += this.aX;
            this.y += this.aY;
        } else if (this.dirs.BL) {
            this.x -= this.aX;
            this.y += this.aY;
        }
        view.drawRect(this.x, this.y, this.width, this.height);
    },

    changeDirection: function(clashObject) {
        this.speedCounter++;
        switch (clashObject) {
            case player:
                if (this.dirs.BL) {
                    this.dirs.BL = false;
                    player.goRight ? this.dirs.TR = true : this.dirs.TL = true;
                } else if (this.dirs.BR) {
                    this.dirs.BR = false;
                    player.goLeft ? this.dirs.TL = true : this.dirs.TR = true;
                };
                break;
            case ai:
                if (this.dirs.TR) {
                    this.dirs.TR = false;
                    ai.goLeft ? this.dirs.BL = true : this.dirs.BR = true;
                } else if (this.dirs.TL) {
                    this.dirs.TL = false;
                    ai.goRight ? this.dirs.BR = true : this.dirs.BL = true;
                };
                break;
            default:
                if (this.dirs.TL) {
                    this.dirs.TL = false;
                    this.dirs.TR = true;
                } else if (this.dirs.BL) {
                    this.dirs.BL = false;
                    this.dirs.BR = true;
                } else if (this.dirs.TR) {
                    this.dirs.TR = false;
                    this.dirs.TL = true;
                } else {
                    this.dirs.BR = false;
                    this.dirs.BL = true;
                };
                break;
        }

        var c = this.speedCounter;
        if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
            this.speedUp();
        }
    },
    speedUp: function() {
        this.aX += Math.floor(Math.random() * 2);
        this.aY += Math.ceil(Math.random() * 3);
    }
};

function Racket(speed) {
    var RACKET_WIDTH = 100,
        RACKET_HEIGHT = 12;
    this.x = 0;
    this.y = 0;
    this.width = RACKET_WIDTH;
    this.height = RACKET_HEIGHT;
    this.goRight = false;
    this.goLeft = false;
    this.score = 0;
    this.speed = speed || 5;
};

Racket.prototype.move = function() {
    view.clearRect(this.x, this.y, this.width, this.height);
    if (this.goRight) {
        this.x += this.speed;
    } else if (this.goLeft) {
        this.x -= this.speed;
    }
    this.x = Math.max(Math.min(this.x, canvas.width - this.width), 0);
    view.drawRect(this.x, this.y, this.width, this.height);
};

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
