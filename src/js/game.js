var game = {
    gameFinished: false,
    state: null,
    checkForClash: function () {

        function isBallInsidePlayer(playerObj) {
            var FLEXURE = 25;
            return Math.pow((playerObj.x - ball.x), 2) + Math.pow((playerObj.y - ball.y), 2) <=
                Math.pow(playerObj.radius, 2) + Math.pow(ball.radius, 2) + Math.pow(FLEXURE, 2);
        }
        // console.log(ball.dirs);
        if (ball.y + ball.radius > canvas.height) {
            player2.score++;
            // ball.changeDirection({});
            this.gameOver();
            console.log('top player win');
            return;
        } else if (ball.y - ball.radius < 0) {
            player1.score++;
            // ball.changeDirection({});
            this.gameOver();
            console.log('bottom player win');
            return;
        }

        if (isBallInsidePlayer(player1)) {
            ball.changeDirection(player1);
        } else if (isBallInsidePlayer(player2)) {
            ball.changeDirection(player2);
        } else if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
            console.log('clash with border');
            ball.changeDirection({});
        }

        // if (ball.y + ball.height > player.y + player.height || ball.y < player2.y - player2.height)
        //     return;
        // if (ball.x + ball.width >= canvas.width || ball.x <= 0) {
        //     ball.changeDirection({});
        // } else if (ball.y + ball.height + ball.aY / 2 >= player.y && ball.x + ball.width > player.x && ball.x < player.x + player.width) {
        //     ball.changeDirection(player);
        // } else if (ball.y - ball.aY / 2 <= player2.y + player2.height && ball.x + ball.width > player2.x && ball.x < player2.x + player2.width) {
        //     ball.changeDirection(player2);
        // }
    },

    loop: function () {
        if (this.gameFinished || this.state === 'stopped') {
            return;
        }
        player1.move();
        player2.move();
        ball.move();

        this.checkForClash();
        window.requestAnimationFrame(this.loop.bind(this));
    },
    gameOver: function () {
        this.gameFinished = true;
        setTimeout(this.start.bind(this), 2000);
        view.drawScore(player1.score, player2.score);
    },
    init: function () {
        player1 = new Player({
            color: 'red',
            side: 'bottom',
            radius: 25
        });
        player2 = new Player({
            color: 'green',
            side: 'top',
            radius: 25
        });
        ball = new Ball({
            color: 'black'
        });
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '15px Arial';
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);
        this.start();
    },
    start: function () {
        this.gameFinished = false;
        this.state = 'play'
        player1.y = (canvas.height - player1.radius * 3);


        player2.y = player2.radius * 2

        // player.x = (canvas.width - player.width) / 2;
        // player.y = (canvas.height - player.height * 3);
        // player2.x = (canvas.width - player2.width) / 2;
        // player2.y = player2.height * 2;
        // player.goRight = false;
        // player.goLeft = false;
        // player2.goRight = false;
        // player2.goLeft = false;
        ball.x = player1.x = player2.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.aX = 1;
        ball.aY = 1;
        ball.speedCounter = 0;
        ball.setDirection(direction.DOWN);
        // ball.setDirection(direction.RIGHT);

        // ball = new Ball({
        //     x: Math.floor(Math.random() * (canvas.width - 16)),
        //     y: canvas.height / 2 - 16 / 2,
        //     aX: 4,
        //     aY: 5,
        //     speedCounter: 0,
        //     direction: 'TR'
        // });
        // ball.x = Math.floor(Math.random() * (canvas.width - ball.width));
        // ball.y = canvas.height / 2 - ball.height / 2;
        // ball.aX = 4;
        // ball.aY = 5;
        // ball.speedCounter = 0;
        // for (var d in ball.dirs) {
        //     ball.dirs[d] = false;
        // }
        // ball.dirs.TR = true;

        // view.clearRect(0, 0, canvas.width, canvas.height);

        // view.drawObject(player1);
        // view.drawObject(player2);
        // view.drawObject(ball);

        view.register(player1);
        view.register(player2);
        view.register(ball);
        view.drawObjects();
        view.drawScore(player1.score, player2.score);
        // view.clearRect(0, 0, canvas.width, canvas.height);
        // view.drawRect(player.x, player.y, player.width, player.height);
        // view.drawRect(player2.x, player2.y, player2.width, player2.height);
        // view.drawRect(ball.x, ball.y, ball.width, ball.height);
        // view.drawScore(player.score, player2.score);
        window.requestAnimationFrame(this.loop.bind(this));
    },
    stop: function () {
        this.state = 'stopped';
    }
}