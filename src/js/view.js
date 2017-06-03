'use strict';

var player1Scores = Array.prototype.slice.call(document.getElementsByClassName('score-player1')),
    player2Scores = Array.prototype.slice.call(document.getElementsByClassName('score-player2'));

// responible for drawing objects in canvas and interface
var view = {
    objects: [],
    register: function (gameObject) {
        if (this.objects.indexOf(gameObject) === -1) {
            this.objects.push(gameObject);
        }
    },
    unRegister: function (gameObject) {
        var index = this.objects.indexOf(gameObject);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    },
    drawObjects: function () {
        this.clearCanvas();
        this.drawCenterLine();
        this.objects.forEach(function (el) {
            this.drawObject(el);
        }, this);
    },
    drawCenterLine: function () {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    },
    drawBonus: function (bonus) {
        ctx.beginPath();
        ctx.fillStyle = bonus.color;
        ctx.arc(bonus.x, bonus.y, bonus.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = 'black';
        var words = bonus.text.split(' ');
        ctx.fillText(words[0], bonus.x, bonus.y - 5);
        ctx.fillText(words[1], bonus.x, bonus.y + 17);

    },
    drawObject: function (gameObject) {
        ctx.fillStyle = gameObject.color;
        if (gameObject instanceof BonusBox) {
            this.drawBonus(gameObject);
        } else {
            ctx.beginPath();
            ctx.arc(gameObject.x, gameObject.y, gameObject.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    },
    clearCanvas: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawScore: function (player1Score, player2Score) {
        player1Scores.forEach(function (el) {
            el.textContent = player1Score;
        });
        player2Scores.forEach(function (el) {
            el.textContent = player2Score;
        });
    },
    showPopup: function (popup) {
        popup.classList.remove('none');
    },
    hidePopup: function (popup) {
        popup.classList.add('none');
    },
    togglePopup: function (popup) {
        popup.classList.toggle('none');
    },

    // check if on the screen visible popups
    isPopupsOnScreen: function () {
        var res = false;
        for (var el in popup) {
            if (window.getComputedStyle(popup[el]).display !== 'none') {
                res = true;
                break;
            }
        }
        return res;
    },
    resetScore: function () {
        this.drawScore(0, 0);
    }
};