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