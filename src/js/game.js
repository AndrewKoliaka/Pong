var game = {
    gameFinished: false,
    checkForClash: function() {

        if (ball.y + ball.height > canvas.height) {
            ai.score++;
            this.gameOver();
            return;
        } else if (ball.y < 0) {
            player.score++;
            this.gameOver();
            return;
        }

        if (ball.y + ball.height > player.y + player.height || ball.y < ai.y - ai.height)
            return;
        if (ball.x + ball.width >= canvas.width || ball.x <= 0) {
            ball.changeDirection({});
        } else if (ball.y + ball.height + ball.aY / 2 >= player.y && ball.x + ball.width > player.x && ball.x < player.x + player.width) {
            ball.changeDirection(player);
        } else if (ball.y - ball.aY / 2 <= ai.y + ai.height && ball.x + ball.width > ai.x && ball.x < ai.x + ai.width) {
            ball.changeDirection(ai);
        }
    },

    loop: function() {
        if (this.gameFinished) {
            return;
        }
        player.move();
        aiThink.apply(ai);
        ai.move();
        ball.move();
        window.requestAnimationFrame(this.loop.bind(this));
    },
    gameOver: function() {
        this.gameFinished = true;
        setTimeout(this.restart.bind(this), 2000);
        view.drawScore(player.score, ai.score);
    },
    init: function() {
        ai = new Racket(6);
        player = new Racket(5);
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '15px Arial';
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);
        this.restart();
    },
    restart: function() {
        this.gameFinished = false;
        player.x = (canvas.width - player.width) / 2;
        player.y = (canvas.height - player.height * 3);
        ai.x = (canvas.width - ai.width) / 2;
        ai.y = ai.height * 2;
        player.goRight = false;
        player.goLeft = false;
        ai.goRight = false;
        ai.goLeft = false;
        ball.x = Math.floor(Math.random() * (canvas.width - ball.width));
        ball.y = canvas.height / 2 - ball.height / 2;
        ball.aX = 4;
        ball.aY = 5;
        ball.speedCounter = 0;
        for (var d in ball.dirs) {
            ball.dirs[d] = false;
        }
        ball.dirs.TR = true;
        view.clearRect(0, 0, canvas.width, canvas.height);
        view.drawRect(player.x, player.y, player.width, player.height);
        view.drawRect(ai.x, ai.y, ai.width, ai.height);
        view.drawRect(ball.x, ball.y, ball.width, ball.height);
        view.drawScore(player.score, ai.score);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
