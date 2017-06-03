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