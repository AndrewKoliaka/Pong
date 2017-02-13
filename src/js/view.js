var view = {
    drawRect: function(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    },
    clearRect: function(x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    },
    drawScore: function(playerScore, aiScore) {
        ctx.clearRect(10, canvas.height - 23, ('player: ' + playerScore + ' robot: ' + aiScore).toString().length * 10, 15);
        ctx.fillText('player: ' + playerScore + ' robot: ' + aiScore, 10, canvas.height - 10);
    }
}
