var view = {
    objects: [],
    register: function (gameObject) {
        this.objects.push(gameObject);
    },
    drawObjects: function () {
        this.clearCanvas();
        this.objects.forEach(function (el, index) {
            this.drawObject(el);
        }, this);
    },
    clearObject: function (gameObject) {
        ctx.beginPath();
        ctx.arc(gameObject.x, gameObject.y, gameObject.radius + 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    },

    drawRect: function (x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    },
    drawObject: function (gameObject) {
        ctx.beginPath();
        ctx.arc(gameObject.x, gameObject.y, gameObject.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = gameObject.color;
        ctx.fill();
    },
    clearCanvas: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    clearRect: function (x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    },
    drawScore: function (player1Score, player2Score) {
        document.getElementById('score-player1').textContent = player1Score;
        document.getElementById('score-player2').textContent = player2Score;
    }
}