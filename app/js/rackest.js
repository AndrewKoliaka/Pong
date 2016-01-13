var Racket = function () {
    const racketWidth = 100, racketHeight = 12;
    this.x = null;
    this.y = null;
    this.width = racketWidth;
    this.height = racketHeight;
    this.goRight = false;
    this.goLeft = false;
    this.score = 0;
};

var robot = new Racket(),
    player = new Racket();
player.MOVE_POINT = 5;
player.move = function(){
    this.clear();
    if(this.goRight){
        this.x += this.MOVE_POINT;
    } else if(this.goLeft){
        this.x -= this.MOVE_POINT;
    }
    this.x = Math.max(Math.min(this.x, canvas.width - this.width), 0);
    this.draw();
};

robot.MOVE_POINT = 7;
robot.move = function () {
    robot.clear();
    if(ball.x - ball.width /4 < this.x){
        this.x -= this.MOVE_POINT;
    } else if(ball.x + ball.width + ball.width /4 > this.x + this.width){
        this.x += this.MOVE_POINT;
    }
    this.x = Math.max(Math.min(this.x, canvas.width - this.width), 0);
    this.draw();
};