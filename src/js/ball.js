function Ball(props) {
    props = props || {};
    GameEntity.apply(this, arguments);

    this.aX = props.aX || 0;
    this.aY = props.aY || 0;
    this.speedCounter = props.speedCounter || 0;

    props.direction ? this.setDirection(props.direction) : this.setDirection('TR')
}

Ball.prototype = Object.create(GameEntity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.move = function () {
    if (this.goLeft) {
        this.x -= this.aX;
    }
    if (this.goRight) {
        this.x += this.aX;
    }
    if (this.goUp) {
        this.y -= this.aY;
    }
    if (this.goDown) {
        this.y += this.aY;
    }
}

Ball.prototype.changeDirection = function (clashObject) {
    this.speedCounter++;
    switch (clashObject) {
        case player1: // bottom player
            if (player1.isMoving) {
                this.speedUp();
            }
            if (this.x > player1.x && this.y < player1.y) {
                if (Math.abs(player1.x - this.x) <= 5 && player1.goUp) {
                    this.setDirectionSingle(direction.UP);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.RIGHT);
                }
            } else if (this.x < player1.x && this.y < player1.y) {
                if (Math.abs(player1.x - this.x) <= 5 && player1.goUp) {
                    this.setDirectionSingle(direction.UP);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.LEFT);
                }
            } else if (this.x < player1.x && this.y > player1.y) {
                if (Math.abs(player1.y - this.y) <= 5 && player1.goLeft) {
                    this.setDirectionSingle(direction.LEFT);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.LEFT);
                }
            } else {
                if (Math.abs(player1.y - this.y) <= 5 && player1.goRight) {
                    this.setDirectionSingle(direction.RIGHT);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.RIGHT);
                }
            }
            break;
        case player2: // top player
            if (player2.isMoving) {
                this.speedUp();
            }
            if (this.x > player2.x && this.y < player2.y) {
                if (Math.abs(player2.y - this.y) <= 5 && player2.goRight) {
                    this.setDirectionSingle(direction.RIGHT);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.RIGHT);
                }
            } else if (this.x < player2.x && this.y < player2.y) {
                if (Math.abs(player2.y - this.y) <= 5 && player2.goLeft) {
                    this.setDirectionSingle(direction.LEFT);
                } else {
                    this.setDirection(direction.UP);
                    this.setDirection(direction.LEFT);
                }
            } else if (this.x < player2.x && this.y > player2.y) {
                if (Math.abs(player2.x - this.x) <= 5 && player2.goDown) {
                    this.setDirectionSingle(direction.DOWN);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.LEFT);
                }
            } else {
                if (Math.abs(player2.x - this.x) <= 5 && player2.goDown) {
                    this.setDirectionSingle(direction.DOWN);
                } else {
                    this.setDirection(direction.DOWN);
                    this.setDirection(direction.RIGHT);
                }
            }

            break;
        default: // border
            if (this.goUp) {
                if (this.goLeft) {
                    this.setDirection(direction.RIGHT);
                } else {
                    this.setDirection(direction.LEFT);
                }
            } else if (this.goDown) {
                if (this.goLeft) {
                    this.setDirection(direction.RIGHT);
                } else {
                    this.setDirection(direction.LEFT);
                }
            } else if (this.goRight) {
                this.setDirectionSingle(direction.LEFT);
            } else {
                this.setDirectionSingle(direction.RIGHT);
            }
            break;
    }

    // var c = this.speedCounter;
    // if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
    //     this.speedUp();
    // }
}

Ball.prototype.speedUp = function () {
    this.aX += Math.floor(Math.random() * 2);
    this.aY += Math.ceil(Math.random() * 2);
}

// var ball = {
//     x: null,
//     y: null,
//     width: 16,
//     height: 16,
//     aX: null,
//     aY: null,
//     speedCounter: 0,
//     dirs: {
//         TL: false, //top left
//         TR: true, //top right
//         BR: false, //bottom right
//         BL: false //bottom left
//     },
//     move: function () {
//         game.checkForClash();
//         view.clearRect(this.x, this.y, this.width, this.height);
//         if (this.dirs.TL) {
//             this.x -= this.aX;
//             this.y -= this.aY;
//         } else if (this.dirs.TR) {
//             this.x += this.aX;
//             this.y -= this.aY;
//         } else if (this.dirs.BR) {
//             this.x += this.aX;
//             this.y += this.aY;
//         } else if (this.dirs.BL) {
//             this.x -= this.aX;
//             this.y += this.aY;
//         }
//         view.drawRect(this.x, this.y, this.width, this.height);
//     },

//     changeDirection: function (clashObject) {
//         this.speedCounter++;
//         switch (clashObject) {
//             case player:
//                 if (this.dirs.BL) {
//                     this.dirs.BL = false;
//                     player.goRight ? this.dirs.TR = true : this.dirs.TL = true;
//                 } else if (this.dirs.BR) {
//                     this.dirs.BR = false;
//                     player.goLeft ? this.dirs.TL = true : this.dirs.TR = true;
//                 };
//                 break;
//             case ai:
//                 if (this.dirs.TR) {
//                     this.dirs.TR = false;
//                     ai.goLeft ? this.dirs.BL = true : this.dirs.BR = true;
//                 } else if (this.dirs.TL) {
//                     this.dirs.TL = false;
//                     ai.goRight ? this.dirs.BR = true : this.dirs.BL = true;
//                 };
//                 break;
//             default:
//                 if (this.dirs.TL) {
//                     this.dirs.TL = false;
//                     this.dirs.TR = true;
//                 } else if (this.dirs.BL) {
//                     this.dirs.BL = false;
//                     this.dirs.BR = true;
//                 } else if (this.dirs.TR) {
//                     this.dirs.TR = false;
//                     this.dirs.TL = true;
//                 } else {
//                     this.dirs.BR = false;
//                     this.dirs.BL = true;
//                 };
//                 break;
//         }

//         var c = this.speedCounter;
//         if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
//             this.speedUp();
//         }
//     },
//     speedUp: function () {
//         this.aX += Math.floor(Math.random() * 2);
//         this.aY += Math.ceil(Math.random() * 3);
//     }
// };