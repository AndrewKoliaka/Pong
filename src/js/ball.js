var ball = {
    x: null,
    y: null,
    width: 16,
    height: 16,
    aX: null,
    aY: null,
    speedCounter: 0,
    dirs: {
        TL: false, //top left
        TR: true, //top right
        BR: false, //bottom right
        BL: false //bottom left
    },
    move: function() {
        game.checkForClash();
        view.clearRect(this.x, this.y, this.width, this.height);
        if (this.dirs.TL) {
            this.x -= this.aX;
            this.y -= this.aY;
        } else if (this.dirs.TR) {
            this.x += this.aX;
            this.y -= this.aY;
        } else if (this.dirs.BR) {
            this.x += this.aX;
            this.y += this.aY;
        } else if (this.dirs.BL) {
            this.x -= this.aX;
            this.y += this.aY;
        }
        view.drawRect(this.x, this.y, this.width, this.height);
    },

    changeDirection: function(clashObject) {
        this.speedCounter++;
        switch (clashObject) {
            case player:
                if (this.dirs.BL) {
                    this.dirs.BL = false;
                    player.goRight ? this.dirs.TR = true : this.dirs.TL = true;
                } else if (this.dirs.BR) {
                    this.dirs.BR = false;
                    player.goLeft ? this.dirs.TL = true : this.dirs.TR = true;
                };
                break;
            case ai:
                if (this.dirs.TR) {
                    this.dirs.TR = false;
                    ai.goLeft ? this.dirs.BL = true : this.dirs.BR = true;
                } else if (this.dirs.TL) {
                    this.dirs.TL = false;
                    ai.goRight ? this.dirs.BR = true : this.dirs.BL = true;
                };
                break;
            default:
                if (this.dirs.TL) {
                    this.dirs.TL = false;
                    this.dirs.TR = true;
                } else if (this.dirs.BL) {
                    this.dirs.BL = false;
                    this.dirs.BR = true;
                } else if (this.dirs.TR) {
                    this.dirs.TR = false;
                    this.dirs.TL = true;
                } else {
                    this.dirs.BR = false;
                    this.dirs.BL = true;
                };
                break;
        }

        var c = this.speedCounter;
        if (c === 5 || c === 10 || c === 15 || c === 20 || (c > 20 && this.aY < 20)) {
            this.speedUp();
        }
    },
    speedUp: function() {
        this.aX += Math.floor(Math.random() * 2);
        this.aY += Math.ceil(Math.random() * 3);
    }
};
