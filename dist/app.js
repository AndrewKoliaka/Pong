// game object
// it is controller of the game
// program starts from init method

var game = {
    state: null,
    bonusBoxes: [],
    objectsToMove: [],

    // method which calls recursively through all game life
    loop: function () {

        // check if any popus visible on screen won't move anything
        this.state = view.isPopupsOnScreen() ? gameState.PAUSE : gameState.PLAY;
        if (this.state === gameState.PLAY) {

            // add bonus boxes only in rare cases
            // (when random number equals 500)
            if (engine.getRandomNumber(1, 500) === 500 && this.bonusBoxes.length < 2) {
                this.addBonusBox();
            }

            this.objectsToMove.forEach(function (el) {
                el.move();

                if (el instanceof Ball) {
                    el.handleCollision();
                }
            });
        }

        if (this.state !== gameState.FINISHED) {
            window.requestAnimationFrame(this.loop.bind(this));
        }
    },

    // finishe game and start a new one in 2 seconds
    gameOver: function () {
        var self = this;
        this.state = gameState.FINISHED;
        view.drawScore(player1.score, player2.score);
        view.showPopup(popup.SCORE);
        setTimeout(function () {
            view.hidePopup(popup.SCORE);
            self.start();
        }, 2000);
    },

    // create and add to view a new bonus box with random effect
    addBonusBox: function () {
        var type = null;
        switch (engine.getRandomNumber(1, 3)) {
            case 1:
                type = bonusBoxType.FAST_BALL;
                break;
            case 2:
                type = bonusBoxType.MORE_BALLS;
                break;
            case 3:
                type = bonusBoxType.MOVEMENT_SPEED;
                break;
        }
        var bonusBox = new BonusBox(engine.getRandomNumber(45, canvas.width - 45), engine.getRandomNumber(45, canvas.height - 45), type);
        this.bonusBoxes.push(bonusBox);
        view.register(bonusBox);
    },

    // calls only on start
    // init all game objects set base properties
    init: function () {
        var self = this;

        player1 = new Player({
            color: color.PLAYER_1,
            side: 'bottom',
            radius: 25
        });
        player2 = new Player({
            color: color.PLAYER_2,
            side: 'top',
            radius: 25
        });
        ball = new Ball({
            color: color.BALL
        });

        this.objectsToMove.push(player1, player2, ball)
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';

        // event listeners
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);

        document.getElementById('close-btn').addEventListener('click', function () {
            view.hidePopup(popup.ABOUT);
        }, false);

        document.getElementById('resume-btn').addEventListener('click', function () {
            view.togglePopup(popup.PAUSE);
        }, false);

        document.getElementById('about-btn').addEventListener('click', function () {
            view.togglePopup(popup.ABOUT);
        }, false);

        document.getElementById('pause-btn').addEventListener('click', function () {
            view.showPopup(popup.PAUSE);
        }, false);

        document.getElementById('reset-btn').addEventListener('click', function () {
            self.resetScore();
            view.resetScore();
        }, false);

        this.start();
    },

    // start a new game session
    start: function () {
        this.objectsToMove.length = 3;
        view.objects.length = 3;
        this.bonusBoxes = [];
        this.state = gameState.PLAY;

        player1.y = (canvas.height - player1.radius * 3);
        player2.y = player2.radius * 2;
        player2.speed = player1.speed = 3.5;

        ball.x = player1.x = player2.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.aX = ball.aY = 2;
        ball.speed = 3;
        ball.setRandomDirection();

        view.register(player1);
        view.register(player2);
        view.register(ball);
        view.drawObjects();
        view.drawScore(player1.score, player2.score);

        this.loop();
    },
    resetScore: function () {
        player1.score = 0;
        player2.score = 0;
    }
}
// base class for all entities in the game
function GameEntity(props) {
    props = props || {};
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.color = props.color || 'black';
    this.radius = props.radius || 10;
    this.speed = props.speed || 0;
}
// object which does all calculations
var engine = {
    // return angle between player center and ball center
    getCollisionAngle: function (ball, player) {
        var res = Math.atan2(player.y - ball.y, ball.x - player.x) * (180 / Math.PI);
        if (res < 0) {
            res += 360;
        }
        return res;
    },

    // cos of angle in radians
    getCos: function (angle) {
        return Math.cos(angle * Math.PI / 180).toFixed(3);
    },

    // sin of angle in radians
    getSin: function (angle) {
        return Math.sin(angle * Math.PI / 180).toFixed(3);
    },

    // degrees by cos value in radians 
    getAngleByCos: function (cos) {
        return Math.round(Math.acos(cos) * 180 / Math.PI);
    },

    // degrees by sin value in radians
    getAngleBySin: function (sin) {
        return Math.round(Math.asin(sin) * 180 / Math.PI);
    },

    // calculates x coordinate of point on circle with center in (0;0);
    // (distance that the ball will fly to the next cycle of game.loop)
    // 0: x coordinate of center of circle
    // radius: radius of circle
    // angle: angle for move
    getBallAX(radius, angle) {
        return 0 + radius * this.getCos(angle);
    },

    // calculates INVERSE y coordinate of point on circle with center in (0;0);
    getBallAY(radius, angle) {
        return -(0 + radius * this.getSin(angle));
    },

    // return random number between min and max
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}
// BonusBox class
function BonusBox(x, y, type) {
    GameEntity.apply(this, [{
        x: x,
        y: y,
        color: color.BONUS_BOX
    }]);

    this.type = type || null;
    this.radius = 40;
    this.text = '';
    // remove bonus box in 20s if it won't be opened
    this.timer = setTimeout(this.remove.bind(this), 20000);
    this.effect = new Effect(type);
    switch (this.type) {
        case bonusBoxType.FAST_BALL:
            this.text = 'fast ball';
            break;
        case bonusBoxType.MORE_BALLS:
            this.text = 'more balls';
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            this.text = 'extra speed';
            break;
    }
}

// inherited from GameEntity
BonusBox.prototype = Object.create(GameEntity.prototype);
BonusBox.prototype.constructor = BonusBox;

// removes itself
BonusBox.prototype.remove = function () {
    view.unRegister(this);
    clearTimeout(this.timer);
    game.bonusBoxes.removeElement(this);
}

// calls when ball kick the bonus 
BonusBox.prototype.open = function () {
    this.effect.resolve();
    this.remove();
}
// Effect class
function Effect(type) {
    this.type = type || null;
    this.extraBall = null;
    this.timer = null;
    this.acceleratedPlayer = null;
    this.ballSpeedBeforeAcceleration = null;
}

// occurs after bonus box become opened
Effect.prototype.resolve = function () {

    // set effect duration to 30s 
    this.timer = setTimeout(this.remove.bind(this), 30000);
    switch (this.type) {
        case bonusBoxType.FAST_BALL:
            this.ballSpeedBeforeAcceleration = ball.speed;
            ball.speed += 2;
            break;
        case bonusBoxType.MORE_BALLS:
            this.extraBall = new Ball({
                x: canvas.width / 2,
                y: canvas.height / 2,
                speed: 3
            });
            this.extraBall.setRandomDirection();
            view.register(this.extraBall);
            game.objectsToMove.push(this.extraBall);
            console.log(game.objectsToMove);
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            this.acceleratedPlayer = ball.lastTouchPlayer;
            if (this.acceleratedPlayer) {
                this.acceleratedPlayer.speed += 3;
            }
            break;
    }
}

Effect.prototype.remove = function () {
    switch (this.type) {
        case bonusBoxType.FAST_BALL:
            ball.speed = this.ballSpeedBeforeAcceleration;
            break;
        case bonusBoxType.MORE_BALLS:
            view.unRegister(this.extraBall);
            game.objectsToMove.removeElement(this.extraBall);
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            if (this.acceleratedPlayer) {
                this.acceleratedPlayer.speed -= 3;
            }
            break;
    }
    clearTimeout(this.timer);
}
// Player class
function Player(props) {
    props = props || {};
    GameEntity.apply(this, arguments);
    this.side = props.side || 'top';
    this.score = 0;
    this.goLeft = false;
    this.goRight = false;
    this.goUp = false;
    this.goDown = false;
}

// inherited from GameEntity
Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function () {
    if (this.goLeft && this.x - this.radius - this.speed >= 0) {
        this.x -= this.speed;
    }
    if (this.goRight && this.x + this.radius + this.speed <= canvas.width) {
        this.x += this.speed;
    }
    if (this.goUp) {
        if ((this.side === 'top' && this.y - this.radius - this.speed >= 0) ||
            (this.side === 'bottom' && this.y - this.radius - this.speed >= canvas.height / 2)) {
            this.y -= this.speed;
        }
    }
    if (this.goDown) {
        if ((this.side === 'top' && this.y + this.radius + this.speed <= canvas.height / 2) ||
            (this.side === 'bottom' && this.y + this.radius + this.speed <= canvas.height)) {
            this.y += this.speed;
        }
    }
    view.drawObjects();
}

// detect if player is moving
Player.prototype.isMoving = function () {
    return this.goLeft || this.goRight || this.goDown || this.goUp;
}

// set direction for player platform
Player.prototype.setDirection = function (dir) {
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
var player1Scores = Array.prototype.slice.call(document.getElementsByClassName('score-player1')),
    player2Scores = Array.prototype.slice.call(document.getElementsByClassName('score-player2'));

// responible for drawing objects in canvas and interface
var view = {
    objects: [],
    register: function (gameObject) {
        if (this.objects.indexOf(gameObject) === -1) {
            this.objects.push(gameObject);
        }
    },
    unRegister: function (gameObject) {
        var index = this.objects.indexOf(gameObject);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    },
    drawObjects: function () {
        this.clearCanvas();
        this.drawCenterLine();
        this.objects.forEach(function (el) {
            this.drawObject(el);
        }, this);
    },
    drawCenterLine: function () {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    },
    drawBonus: function (bonus) {
        ctx.beginPath();
        ctx.fillStyle = bonus.color;
        ctx.arc(bonus.x, bonus.y, bonus.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = 'black';
        var words = bonus.text.split(' ');
        ctx.fillText(words[0], bonus.x, bonus.y - 5);
        ctx.fillText(words[1], bonus.x, bonus.y + 17);

    },
    drawObject: function (gameObject) {
        ctx.fillStyle = gameObject.color;
        if (gameObject instanceof BonusBox) {
            this.drawBonus(gameObject);
        } else {
            ctx.beginPath();
            ctx.arc(gameObject.x, gameObject.y, gameObject.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    },
    clearCanvas: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawScore: function (player1Score, player2Score) {
        player1Scores.forEach(function (el) {
            el.textContent = player1Score;
        });
        player2Scores.forEach(function (el) {
            el.textContent = player2Score;
        });
    },
    showPopup: function (popup) {
        popup.classList.remove('none');
    },
    hidePopup: function (popup) {
        popup.classList.add('none');
    },
    togglePopup: function (popup) {
        popup.classList.toggle('none');
    },

    // check if on the screen visible popups
    isPopupsOnScreen: function () {
        var res = false;
        for (var el in popup) {
            if (window.getComputedStyle(popup[el]).display !== 'none') {
                res = true;
                break;
            }
        }
        return res;
    },
    resetScore: function () {
        this.drawScore(0, 0);
    }
}
// Ball class
function Ball(props) {
    props = props || {};
    GameEntity.apply(this, arguments);
    this.aX = props.aX || 0;
    this.aY = props.aY || 0;
    this.lastTouchPlayer = null;
}

// inherited from GameEntity class
Ball.prototype = Object.create(GameEntity.prototype);
Ball.prototype.constructor = Ball;

// move the ball
Ball.prototype.move = function () {
    this.x += this.aX;
    this.y += this.aY;
}

// set direction of ball based on random angle
Ball.prototype.setRandomDirection = function () {
    var randomAngle = engine.getRandomNumber(1, 360);
    this.aX = engine.getBallAX(this.speed, randomAngle);
    this.aY = engine.getBallAY(this.speed, randomAngle);
}

// this method is caused during each cycle passage
// handles all possible collisions with ball
Ball.prototype.handleCollision = function () {
    var clashedObject = this.getCollisionObject();

    switch (clashedObject.type) {
        case collisionObject.BORDER_RIGHT:
            this.aX = -this.aX;
            this.x = canvas.width - this.radius;
            break;
        case collisionObject.BORDER_LEFT:
            this.aX = -this.aX;
            this.x = this.radius;
            break;
        case collisionObject.BONUS_BOX:
            clashedObject.payload.open();
            break;
        case collisionObject.PLAYER:
            var player = clashedObject.payload;
            this.lastTouchPlayer = player;
            var angle = engine.getCollisionAngle(this, player);
            this.aX = engine.getBallAX(this.speed, angle);
            this.aY = engine.getBallAY(this.speed, angle);
            if (player.isMoving()) {
                this.speedUp();
            }
            break;
        case collisionObject.OPPONENT_SIDE:
            clashedObject.payload === player1 ? player1.score++ : player2.score++;
            game.gameOver();
            break;
    }
}

// check if ball got clash with something
// and if true detect it collision object and type
Ball.prototype.getCollisionObject = function () {
    var type = null, // collision type
        payload = null; // collision object

    var self = this;

    // detects if ball is inside of circle
    function isBallInsideCircle(circleObject) {
        var FLEXURE = 25;
        return Math.pow((circleObject.x - this.x), 2) + Math.pow((circleObject.y - this.y), 2) <=
            Math.pow(circleObject.radius, 2) + Math.pow(this.radius, 2) + Math.pow(FLEXURE, 2);
    }

    // if opponet side (goal)
    if (this.y > canvas.height || this.y < 0) {
        type = collisionObject.OPPONENT_SIDE;
        payload = this.y < 0 ? player1 : player2;

        // if player1 platform
    } else if (isBallInsideCircle.call(this, player1)) {
        type = collisionObject.PLAYER;
        payload = player1;

        // if player2 platform
    } else if (isBallInsideCircle.call(this, player2)) {
        type = collisionObject.PLAYER;
        payload = player2;

        // if bonus box
    } else if (game.bonusBoxes.some(function (el) {
            return isBallInsideCircle.call(self, el);
        })) {
        type = collisionObject.BONUS_BOX;
        payload = game.bonusBoxes.find(function (el) {
            return isBallInsideCircle.call(self, el);
        })

        // if right border
    } else if (this.x + this.radius >= canvas.width) {
        type = collisionObject.BORDER_RIGHT;

        // if left border
    } else if (this.x - this.radius <= 0) {
        type = collisionObject.BORDER_LEFT;
    }

    return {
        type: type,
        payload: payload
    }
}

Ball.prototype.speedUp = function () {
    this.speed += 0.3;
}
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