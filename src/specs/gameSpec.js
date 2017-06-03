describe('game suite', function() {
    beforeAll(function() {
        spyOn(view, 'drawRect');
        spyOn(view, 'clearRect');
        spyOn(ball, 'changeDirection');
    });

    beforeEach(function() {
        game.restart();
    });

    it('should restart', function() {
        expect(ai instanceof Racket).toBeTruthy();
        expect(player instanceof Racket).toBeTruthy();
        expect(ball.speedCounter).toEqual(0);
        expect(view.drawRect).toHaveBeenCalledTimes(3);
        expect(view.clearRect).toHaveBeenCalled();
        expect(ball.dirs.TL).toBeFalsy();
        expect(ball.dirs.BL).toBeFalsy();
        expect(ball.dirs.BR).toBeFalsy();
        expect(player.goRight).toBeFalsy();
        expect(player.goLeft).toBeFalsy();
        expect(ai.goRight).toBeFalsy();
        expect(ai.goLeft).toBeFalsy();
        expect(ball.dirs.TR).toBeTruthy();
        expect(game.gameFinished).toBeFalsy();
    });

    it('should end game when ball.y > canvas.height || ball.y < 0', function() {
        spyOn(game, 'gameOver');

        ball.y = canvas.height + 10;
        game.handleCollision();
        expect(game.gameOver).toHaveBeenCalled();
        expect(ai.score).toEqual(1);
        ball.y = -10;
        game.handleCollision();
        expect(game.gameOver).toHaveBeenCalled();
        expect(player.score).toEqual(1);
    });

    it('should change ball direction when clash', function() {
        ball.x = canvas.width;
        game.handleCollision();
        expect(ball.changeDirection).toHaveBeenCalledWith({});
        ball.x = 0;
        expect(ball.changeDirection).toHaveBeenCalledWith({});
        //check for clash with player
        player.x = 30;
        player.y = 100;
        ball.x = 35;
        ball.y = 100 - ball.height;
        game.handleCollision();
        expect(ball.changeDirection).toHaveBeenCalledWith(player)
            //check for clash with ai
        ai.x = 30;
        ai.y = 10;
        ball.x = 35;
        ball.y = 15;
        game.handleCollision();
        expect(ball.changeDirection).toHaveBeenCalledWith(ai)
    });

    it('should game over', function() {
        game.gameOver();
        expect(game.gameFinished).toBeTruthy();
    });
});
