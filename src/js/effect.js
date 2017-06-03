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
            this.ballSpeedBeforeAcceleration = {
                aX: ball.aX,
                aY: ball.aY
            }
            ball.aX += 2;
            ball.aY += 2;
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
            ball.aX = this.ballSpeedBeforeAcceleration.aX;
            ball.aY = this.ballSpeedBeforeAcceleration.aY;
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