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

player.move = function(){
    this.clear();
    if(this.goRight){
        this.x += 5;
    } else if(this.goLeft){
        this.x -= 5;
    }
    this.x = Math.max(Math.min(this.x, canvas.width - this.width), 0);
    this.draw();
};

robot.move = function () {
    robot.clear();
    if(ball.x < robot.x){
        robot.x -= 5;
    } else if(ball.x + ball.width > robot.x + robot.width){
        robot.x += 5;
    }
    robot.draw();
};