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
