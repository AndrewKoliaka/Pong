var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d');

 const KEY_RIGHT = 39,
    KEY_LEFT = 37;
var stop = false;

window.onload = function () {
    ctx.font = '15px Arial';
    init();
    window.addEventListener('keydown', downKey, false);
    window.addEventListener('keyup', upKey, false);
};

function downKey(e){
    if(e.keyCode === KEY_RIGHT){
        player.goLeft = false;
        player.goRight = true;
    } else if(e.keyCode === KEY_LEFT){
        player.goLeft = true;
        player.goRight = false;
    }
}
function upKey(){
    if(player.goRight){
        player.goRight = false;
    } else if(player.goLeft){
        player.goLeft = false;
    }
}

Object.prototype.draw = function(){
    ctx.fillRect(this.x , this.y , this.width, this.height);
};
Object.prototype.clear = function () {
    ctx.clearRect(this.x , this.y , this.width, this.height);
};

function loop(){
    player.move();
    robot.move();
    ball.move();
    if(stop){
        return;
    }
    window.requestAnimationFrame(loop, canvas);
}
function drawScore(){
    ctx.clearRect(10,canvas.height - 23,('player: ' + player.score + ' robot: ' + robot.score).toString().length*10,15 );
    ctx.fillText('player: ' + player.score + ' robot: ' + robot.score, 10, canvas.height - 10);
}

function init(){
    drawScore();
    stop = false;
    player.clear();
    robot.clear();
    ball.clear();
    player.goLeft = player.goRight = false;
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height * 3);
    robot.x = (canvas.width - robot.width) / 2;
    robot.y = robot.height * 2;
    ball.x = Math.floor(Math.random() * (canvas.width - ball.width));
    ball.y = canvas.height / 2 - ball.height / 2;
    ball.aX = 4;
    ball.aY = 5;
    ball.counter = 0;
    for(var d in ball.directions){
        if(ball.directions[d])
            ball.directions[d] = false;
    }
    ball.directions.TR = true;
    player.draw();
    robot.draw();
    ball.draw();
    window.requestAnimationFrame(loop, canvas);
}