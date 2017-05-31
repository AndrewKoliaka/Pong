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