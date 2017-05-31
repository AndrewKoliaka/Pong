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