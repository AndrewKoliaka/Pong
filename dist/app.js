function Ball(props) {
    props = props || {};
    GameEntity.apply(this, arguments);

    this.aX = props.aX || 0;
    this.aY = props.aY || 0;
    this.speedCounter = props.speedCounter || 0;

    props.direction ? this.setDirection(props.direction) : this.setDirection('TR')
}

Ball.prototype = Object.create(GameEntity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.move = function () {
    if (this.goLeft) {
        this.x -= this.aX;
    }
    if (this.goRight) {
        this.x += this.aX;
    }
    if (this.goUp) {
        this.y -= this.aY;
    }
    if (this.goDown) {
        this.y += this.aY;
    }
}

Ball.prototype.changeDirection = function (clashObject) {
    this.speedCounter++;
    switch (clashObject) {
        case player1: // bottom player
            if (player1.isMoving) {
                this.speedUp();
            }
            if (this.x > player1.x && this.y < player1.y) {
                if (Math.abs(player1.x - this.x) <= 5 && player1.goUp) {
                    this.setDirectionSingle(direction.UP);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.RIGHT);
                }
            } else if (this.x < player1.x && this.y < player1.y) {
                if (Math.abs(player1.x - this.x) <= 5 && player1.goUp) {
                    this.setDirectionSingle(direction.UP);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.LEFT);
                }
            } else if (this.x < player1.x && this.y > player1.y) {
                if (Math.abs(player1.y - this.y) <= 5 && player1.goLeft) {
                    this.setDirectionSingle(direction.LEFT);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.LEFT);
                }
            } else {
                if (Math.abs(player1.y - this.y) <= 5 && player1.goRight) {
                    this.setDirectionSingle(direction.RIGHT);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.RIGHT);
                }
            }
            break;
        case player2: // top player
            if (player2.isMoving) {
                this.speedUp();
            }
            if (this.x > player2.x && this.y < player2.y) {
                if (Math.abs(player2.y - this.y) <= 5 && player2.goRight) {
                    this.setDirectionSingle(direction.RIGHT);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.RIGHT);
                }
            } else if (this.x < player2.x && this.y < player2.y) {
                if (Math.abs(player2.y - this.y) <= 5 && player2.goLeft) {
                    this.setDirectionSingle(direction.LEFT);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.LEFT);
                }
            } else if (this.x < player2.x && this.y > player2.y) {
                if (Math.abs(player2.x - this.x) <= 5 && player2.goDown) {
                    this.setDirectionSingle(direction.DOWN);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.LEFT);
                }
            } else {
                if (Math.abs(player2.x - this.x) <= 5 && player2.goDown) {
                    this.setDirectionSingle(direction.DOWN);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.RIGHT);
                }
            }

            break;
        default: // border
            if (this.goUp) {
                if (this.goLeft) {
                    this.setDirection(direction.RIGHT);
                } else {
                    this.setDirection(direction.LEFT);
                }
            } else if (this.goDown) {
                if (this.goLeft) {
                    this.setDirection(direction.RIGHT);
                } else {
                    this.setDirection(direction.LEFT);
                }
            } else if (this.goRight) {
                this.setDirectionSingle(direction.LEFT);
            } else {
                this.setDirectionSingle(direction.RIGHT);
            }
            break;
    }

    // var c = this.speedCounter;
    // if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
    //     this.speedUp();
    // }
}

Ball.prototype.speedUp = function () {
    this.aX += Math.floor(Math.random() * 2);
    this.aY += Math.ceil(Math.random() * 2);
}

// var ball = {
//     x: null,
//     y: null,
//     width: 16,
//     height: 16,
//     aX: null,
//     aY: null,
//     speedCounter: 0,
//     dirs: {
//         TL: false, //top left
//         TR: true, //top right
//         BR: false, //bottom right
//         BL: false //bottom left
//     },
//     move: function () {
//         game.checkForClash();
//         view.clearRect(this.x, this.y, this.width, this.height);
//         if (this.dirs.TL) {
//             this.x -= this.aX;
//             this.y -= this.aY;
//         } else if (this.dirs.TR) {
//             this.x += this.aX;
//             this.y -= this.aY;
//         } else if (this.dirs.BR) {
//             this.x += this.aX;
//             this.y += this.aY;
//         } else if (this.dirs.BL) {
//             this.x -= this.aX;
//             this.y += this.aY;
//         }
//         view.drawRect(this.x, this.y, this.width, this.height);
//     },

//     changeDirection: function (clashObject) {
//         this.speedCounter++;
//         switch (clashObject) {
//             case player:
//                 if (this.dirs.BL) {
//                     this.dirs.BL = false;
//                     player.goRight ? this.dirs.TR = true : this.dirs.TL = true;
//                 } else if (this.dirs.BR) {
//                     this.dirs.BR = false;
//                     player.goLeft ? this.dirs.TL = true : this.dirs.TR = true;
//                 };
//                 break;
//             case ai:
//                 if (this.dirs.TR) {
//                     this.dirs.TR = false;
//                     ai.goLeft ? this.dirs.BL = true : this.dirs.BR = true;
//                 } else if (this.dirs.TL) {
//                     this.dirs.TL = false;
//                     ai.goRight ? this.dirs.BR = true : this.dirs.BL = true;
//                 };
//                 break;
//             default:
//                 if (this.dirs.TL) {
//                     this.dirs.TL = false;
//                     this.dirs.TR = true;
//                 } else if (this.dirs.BL) {
//                     this.dirs.BL = false;
//                     this.dirs.BR = true;
//                 } else if (this.dirs.TR) {
//                     this.dirs.TR = false;
//                     this.dirs.TL = true;
//                 } else {
//                     this.dirs.BR = false;
//                     this.dirs.BL = true;
//                 };
//                 break;
//         }

//         var c = this.speedCounter;
//         if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
//             this.speedUp();
//         }
//     },
//     speedUp: function () {
//         this.aX += Math.floor(Math.random() * 2);
//         this.aY += Math.ceil(Math.random() * 3);
//     }
// };
var game = {
    gameFinished: false,
    state: null,
    checkForClash: function () {

        function isBallInsidePlayer(playerObj) {
            var FLEXURE = 25;
            return Math.pow((playerObj.x - ball.x), 2) + Math.pow((playerObj.y - ball.y), 2) <=
                Math.pow(playerObj.radius, 2) + Math.pow(ball.radius, 2) + Math.pow(FLEXURE, 2);
        }
        // console.log(ball.dirs);
        if (ball.y + ball.radius > canvas.height) {
            player2.score++;
            // ball.changeDirection({});
            this.gameOver();
            console.log('top player win');
            return;
        } else if (ball.y - ball.radius < 0) {
            player1.score++;
            // ball.changeDirection({});
            this.gameOver();
            console.log('bottom player win');
            return;
        }

        if (isBallInsidePlayer(player1)) {
            ball.changeDirection(player1);
        } else if (isBallInsidePlayer(player2)) {
            ball.changeDirection(player2);
        } else if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
            console.log('clash with border');
            ball.changeDirection({});
        }

        // if (ball.y + ball.height > player.y + player.height || ball.y < player2.y - player2.height)
        //     return;
        // if (ball.x + ball.width >= canvas.width || ball.x <= 0) {
        //     ball.changeDirection({});
        // } else if (ball.y + ball.height + ball.aY / 2 >= player.y && ball.x + ball.width > player.x && ball.x < player.x + player.width) {
        //     ball.changeDirection(player);
        // } else if (ball.y - ball.aY / 2 <= player2.y + player2.height && ball.x + ball.width > player2.x && ball.x < player2.x + player2.width) {
        //     ball.changeDirection(player2);
        // }
    },

    loop: function () {
        if (this.gameFinished || this.state === 'stopped') {
            return;
        }
        player1.move();
        player2.move();
        ball.move();

        this.checkForClash();
        window.requestAnimationFrame(this.loop.bind(this));
    },
    gameOver: function () {
        this.gameFinished = true;
        setTimeout(this.start.bind(this), 2000);
        view.drawScore(player1.score, player2.score);
    },
    init: function () {
        player1 = new Player({
            color: 'red',
            side: 'bottom',
            radius: 25
        });
        player2 = new Player({
            color: 'green',
            side: 'top',
            radius: 25
        });
        ball = new Ball({
            color: 'black'
        });
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '15px Arial';
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);
        this.start();
    },
    start: function () {
        this.gameFinished = false;
        this.state = 'play'
        player1.y = (canvas.height - player1.radius * 3);


        player2.y = player2.radius * 2

        // player.x = (canvas.width - player.width) / 2;
        // player.y = (canvas.height - player.height * 3);
        // player2.x = (canvas.width - player2.width) / 2;
        // player2.y = player2.height * 2;
        // player.goRight = false;
        // player.goLeft = false;
        // player2.goRight = false;
        // player2.goLeft = false;
        ball.x = player1.x = player2.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.aX = 1;
        ball.aY = 1;
        ball.speedCounter = 0;
        ball.setDirection(direction.DOWN);
        // ball.setDirection(direction.RIGHT);

        // ball = new Ball({
        //     x: Math.floor(Math.random() * (canvas.width - 16)),
        //     y: canvas.height / 2 - 16 / 2,
        //     aX: 4,
        //     aY: 5,
        //     speedCounter: 0,
        //     direction: 'TR'
        // });
        // ball.x = Math.floor(Math.random() * (canvas.width - ball.width));
        // ball.y = canvas.height / 2 - ball.height / 2;
        // ball.aX = 4;
        // ball.aY = 5;
        // ball.speedCounter = 0;
        // for (var d in ball.dirs) {
        //     ball.dirs[d] = false;
        // }
        // ball.dirs.TR = true;

        // view.clearRect(0, 0, canvas.width, canvas.height);

        // view.drawObject(player1);
        // view.drawObject(player2);
        // view.drawObject(ball);

        view.register(player1);
        view.register(player2);
        view.register(ball);
        view.drawObjects();
        view.drawScore(player1.score, player2.score);
        // view.clearRect(0, 0, canvas.width, canvas.height);
        // view.drawRect(player.x, player.y, player.width, player.height);
        // view.drawRect(player2.x, player2.y, player2.width, player2.height);
        // view.drawRect(ball.x, ball.y, ball.width, ball.height);
        // view.drawScore(player.score, player2.score);
        window.requestAnimationFrame(this.loop.bind(this));
    },
    stop: function () {
        this.state = 'stopped';
    }
}
function GameEntity(props) {
    props = props || {};
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.radius = props.radius || 10;
    this.color = props.color || 'black';
    this.goLeft = false;
    this.goRight = false;
    this.goUp = false;
    this.goDown = false;
}

GameEntity.prototype.setDirection = function (dir) {
    switch (dir) {
        case direction.UP:
            this.goDown = false;
            this.goUp = true;
            break;
        case direction.DOWN:
            this.goDown = true;
            this.goUp = false;
            break;
        case direction.RIGHT:
            this.goLeft = false;
            this.goRight = true;
            break;
        case direction.LEFT:
            this.goLeft = true;
            this.goRight = false;
            break;
    }
}

GameEntity.prototype.setDirectionSingle = function (dir) {
    this.goLeft = this.goRight = this.goDown = this.goUp = false;
    switch (dir) {
        case direction.DOWN:
            this.goDown = true;
            break;
        case direction.UP:
            this.goUp = true;
            break;
        case direction.LEFT:
            this.goLeft = true;
            break;
        case direction.RIGHT:
            this.goRight = true;
            break;
    }
}
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
function Player(props) {
    props = props || {};
    GameEntity.apply(this, arguments);
    this.side = props.side || 'top';
    this.speed = props.speed || 2;
    this.score = 0;
}

Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function () {
    view.clearCanvas();
    if (this.goLeft && this.x - this.radius > 0) {
        this.x -= this.speed;
    }
    if (this.goRight && this.x + this.radius < canvas.width) {
        this.x += this.speed;
    }
    if (this.goUp) {
        if (this.side === 'top' && this.y - this.radius > 0) {
            this.y -= this.speed;
        } else if (this.side === 'bottom' && this.y - this.radius > canvas.height / 2) {
            this.y -= this.speed;
        }
    }
    if (this.goDown) {
        if (this.side === 'top' && this.y + this.radius < canvas.height / 2) {
            this.y += this.speed;
        } else if (this.side === 'bottom' && this.y + this.radius < canvas.height) {
            this.y += this.speed;
        }
    }
    view.drawObjects();
}

Player.prototype.isMoving = function () {
    return this.goLeft || this.goRight || this.goDown || this.goUp;
}
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

var view = {
    objects: [],
    register: function (gameObject) {
        this.objects.push(gameObject);
    },
    drawObjects: function () {
        this.clearCanvas();
        this.objects.forEach(function (el, index) {
            this.drawObject(el);
        }, this);
    },
    clearObject: function (gameObject) {
        ctx.beginPath();
        ctx.arc(gameObject.x, gameObject.y, gameObject.radius + 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    },

    drawRect: function (x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    },
    drawObject: function (gameObject) {
        ctx.beginPath();
        ctx.arc(gameObject.x, gameObject.y, gameObject.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = gameObject.color;
        ctx.fill();
    },
    clearCanvas: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    clearRect: function (x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    },
    drawScore: function (player1Score, player2Score) {
        document.getElementById('score-player1').textContent = player1Score;
        document.getElementById('score-player2').textContent = player2Score;
    }
}