var ball = {
  x : null,
    y : null,
    width : 16,
    height : 16,
  aX : null,
  aY : null,
  collisionCounter : 0,
  directions : {
    TL : false, //top left
    TR : true, //top right
    BR : false, //bottom right
    BL : false  //bottom left
  },
  move : function(){
    this.checkEncounter();
    this.clear();
    if(this.directions.TL){
      this.x -= this.aX;
      this.y -= this.aY;
    } else if(this.directions.TR){
      this.x += this.aX;
      this.y -= this.aY;
    } else if(this.directions.BR){
      this.x += this.aX;
      this.y += this.aY;
    } else if(this.directions.BL){
      this.x -= this.aX;
      this.y += this.aY;
    }
    this.draw();
  },
  checkEncounter : function () {
    if(this.y + this.height > canvas.height){
      robot.score++;
      gameOver();
      return;
    } else if(this.y < 0){
      player.score++;
      gameOver();
      return;
    }
    function gameOver(){
      setTimeout(init, 2000);
      stop = true;
      drawScore();
    }
    if(this.y + this.height > player.y + player.height || this.y < robot.y - robot.height)
      return;
    if(this.x + this.width >= canvas.width || this.x <= 0) {
      this.changeDirection("side");
    } else if(this.y + this.height + this.aY / 2 >= player.y && this.x + this.width > player.x && this.x < player.x + player.width){
      this.changeDirection('player');
    } else if(this.y - this.aY / 2 <= robot.y + robot.height && this.x + this.width > robot.x && this.x < robot.x + robot.width){
      this.changeDirection('robot');
    }
  },
  changeDirection : function (object) {
    this.collisionCounter++;
    var way = this.directions;
      if(object === 'player'){
         if(way.BL){
           way.BL = false;
           player.goRight ? way.TR = true : way.TL = true;
         } else if(way.BR){
           way.BR = false;
           player.goLeft ? way.TL = true : way.TR = true;
         }
      } else if(object === 'robot'){
        if(way.TR){
          way.TR = false;
          robot.goLeft ? way.BL = true : way.BR = true;
        } else if(way.TL){
          way.TL = false;
          robot.goRight ? way.BR = true : way.BL = true;
        }
      } else{
        if(way.TL){
          way.TL = false;
          way.TR = true;
        } else if(way.BL){
          way.BL = false;
          way.BR = true;
        } else if(way.TR){
          way.TR = false;
          way.TL = true;
        } else {
          way.BR = false;
          way.BL = true;
        }
      }
    this.speedUp();
  },
  speedUp : function(){
    if(this.collisionCounter === 5 || this.collisionCounter === 10)
      this.aX += Math.floor(Math.random() * 2);
      this.aY += Math.floor(Math.random() * 2);
  }
};