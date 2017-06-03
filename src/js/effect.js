'use strict';

// Effect class
function Effect(type) {
    this.type = type || null;
    this.extraBall = null;
    this.timer = null;
    this.acceleratedPlayer = null;
    this.ballSpeedBeforeAcceleration = null;
    this.increasedPlayer = null;
}

// occurs after bonus box become opened
Effect.prototype.resolve = function () {

    game.effects.push(this);

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
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            if (ball.lastTouchPlayer) {
                this.acceleratedPlayer = ball.lastTouchPlayer;
                this.acceleratedPlayer.speed += 3;
            }
            break;
        case bonusBoxType.BIG_PLAYER:
            if (ball.lastTouchPlayer) {
                this.increasedPlayer = ball.lastTouchPlayer;
                this.increasedPlayer.radius += 10;
            }
            break;
    }
};

// removes applied effect
Effect.prototype.remove = function () {

    game.effects.removeElement(this);

    switch (this.type) {
        case bonusBoxType.FAST_BALL:
            if (this.ballSpeedBeforeAcceleration) {
                ball.speed = this.ballSpeedBeforeAcceleration;
            }
            break;
        case bonusBoxType.MORE_BALLS:
            if (this.extraBall) {
                view.unRegister(this.extraBall);
                game.objectsToMove.removeElement(this.extraBall);
            }
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            if (this.acceleratedPlayer) {
                this.acceleratedPlayer.speed -= 3;
            }
            break;
        case bonusBoxType.BIG_PLAYER:
            if (this.increasedPlayer) {
                this.increasedPlayer.radius -= 10;
            }
            break;
    }
    clearTimeout(this.timer);
};