// game object
// it is controller of the game
// program starts from init method

var game = {
    state: null,
    bonusBoxes: [],
    effects: [],
    objectsToMove: [],

    // method which calls recursively through all game life
    loop: function () {

        // check if any popus visible on screen won't move anything
        this.state = view.isPopupsOnScreen() ? gameState.PAUSE : gameState.PLAY;
        if (this.state === gameState.PLAY) {

            // add bonus boxes only in rare cases
            // (when random number equals 500)
            if (engine.getRandomNumber(1, 500) === 500 && this.bonusBoxes.length < 2) {
                this.addBonusBox();
            }

            this.objectsToMove.forEach(function (el) {
                el.move();

                if (el instanceof Ball) {
                    el.handleCollision();
                }
            });
        }

        if (this.state !== gameState.FINISHED) {
            window.requestAnimationFrame(this.loop.bind(this));
        }
    },

    // finishe game and start a new one in 2 seconds
    gameOver: function () {
        var self = this;
        this.state = gameState.FINISHED;
        view.drawScore(player1.score, player2.score);
        view.showPopup(popup.SCORE);
        this.effects.forEach(function (el) {
            el.remove();
        });
        this.bonusBoxes.forEach(function (el) {
            el.remove();
        });
        setTimeout(function () {
            view.hidePopup(popup.SCORE);
            self.start();
        }, 2000);
    },

    // create and add to view a new bonus box with random effect
    addBonusBox: function () {
        var type = null;
        switch (engine.getRandomNumber(1, 4)) {
            case 1:
                type = bonusBoxType.FAST_BALL;
                break;
            case 2:
                type = bonusBoxType.MORE_BALLS;
                break;
            case 3:
                type = bonusBoxType.MOVEMENT_SPEED;
                break;
            case 4:
                type = bonusBoxType.BIG_PLAYER;
        }
        var bonusBox = new BonusBox(engine.getRandomNumber(45, canvas.width - 45), engine.getRandomNumber(45, canvas.height - 45), type);
        this.bonusBoxes.push(bonusBox);
        view.register(bonusBox);
    },

    // calls only on start
    // init all game objects set base properties
    init: function () {
        var self = this;

        player1 = new Player({
            color: color.PLAYER_1,
            side: 'bottom',
            radius: 25
        });
        player2 = new Player({
            color: color.PLAYER_2,
            side: 'top',
            radius: 25
        });
        ball = new Ball({
            color: color.BALL
        });

        this.objectsToMove.push(player1, player2, ball)
        canvas = document.getElementsByTagName('canvas')[0];
        ctx = canvas.getContext('2d');
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';

        // event listeners
        window.addEventListener('keydown', keyPressed, false);
        window.addEventListener('keyup', keyUpped, false);

        document.getElementById('close-btn').addEventListener('click', function () {
            view.hidePopup(popup.ABOUT);
        }, false);

        document.getElementById('resume-btn').addEventListener('click', function () {
            view.togglePopup(popup.PAUSE);
        }, false);

        document.getElementById('about-btn').addEventListener('click', function () {
            view.togglePopup(popup.ABOUT);
        }, false);

        document.getElementById('pause-btn').addEventListener('click', function () {
            view.showPopup(popup.PAUSE);
        }, false);

        document.getElementById('reset-btn').addEventListener('click', function () {
            self.resetScore();
            view.resetScore();
        }, false);

        this.start();
    },

    // start a new game session
    start: function () {
        this.objectsToMove.length = 3;
        view.objects.length = 3;
        this.state = gameState.PLAY;
        this.effects = [];
        this.bonusBoxes = [];

        player1.y = (canvas.height - player1.radius * 3);
        player2.y = player2.radius * 2;
        player2.speed = player1.speed = 3.5;
        player1.radius = player2.radius = 25;

        ball.x = player1.x = player2.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.aX = ball.aY = 2;
        ball.speed = 3;
        ball.setRandomDirection();

        view.register(player1);
        view.register(player2);
        view.register(ball);
        view.drawObjects();
        view.drawScore(player1.score, player2.score);

        this.loop();
    },
    resetScore: function () {
        player1.score = 0;
        player2.score = 0;
    }
}