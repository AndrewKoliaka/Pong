describe('ball specs', function() {
    beforeEach(function() {
        game.init();
        ball.x = 50;
        ball.y = 50;
        ball.aX = 1;
        ball.aY = 1;
        ball.height = 10;
        ball.width = 10;
        ball.speedCounter = 0;
        for (var dir in ball.dirs) {
            ball.dirs[dir] = false;
        }
    });
    describe('moves', function() {
        it('should move top left', function() {
            ball.dirs.TL = true;
            ball.move();
            expect(ball.x).toEqual(49);
            expect(ball.y).toEqual(49);
        });

        it('should move top right', function() {
            ball.dirs.TR = true;
            ball.move();
            expect(ball.x).toEqual(51);
            expect(ball.y).toEqual(49);
        });

        it('should move bottom left', function() {
            ball.dirs.BL = true;
            ball.move();
            expect(ball.x).toEqual(49);
            expect(ball.y).toEqual(51);
        });

        it('should move bottom right ', function() {
            ball.dirs.BR = true;
            ball.move();
            expect(ball.x).toEqual(51);
            expect(ball.y).toEqual(51);
        });
    });

    describe('change direction', function() {
        it('should change direction when clash with side', function() {
            ball.dirs.TL = true;
            ball.changeDirection({});
            expect(ball.dirs.TR).toBeTruthy();
        });

        it('should change direction when clash with ai', function() {
            ball.dirs.TL = true;
            ball.changeDirection(ai);
            expect(ball.dirs.BL).toBeTruthy();

            ball.dirs.TR = true;
            ball.changeDirection(ai);
            expect(ball.dirs.BR).toBeTruthy();
        });

        it('should go with acceleration after clash with ai', function() {
            ball.dirs.TL = true;
            ai.goRight = true;
            ball.changeDirection(ai);
            expect(ball.dirs.BR).toBeTruthy();

            ball.dirs.TR = true;
            ai.goRight = false;
            ai.goLeft = true;
            ball.changeDirection(ai);
            expect(ball.dirs.BL).toBeTruthy();
        });

        it('should change direction when clash with player', function() {
            ball.dirs.BR = true;
            ball.changeDirection(player);
            expect(ball.dirs.TR).toBeTruthy();

            ball.dirs.BL = true;
            ball.changeDirection(player);
            expect(ball.dirs.TL).toBeTruthy();
        });

        it('should go with acceleration after clash with player', function() {
            ball.dirs.BR = true;
            player.goLeft = true;
            ball.changeDirection(player);
            expect(ball.dirs.TL).toBeTruthy();

            ball.dirs.BL = true;
            player.goRight = true;
            player.goLeft = false;
            ball.changeDirection(player);
            expect(ball.dirs.TR).toBeTruthy();
        });
    });

    it('should speed up', function() {
        ball.speedUp();
        expect(ball.aY).toBeGreaterThan(1);
    });

});
