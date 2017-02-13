describe('racket suite', function() {
	var racket;
    beforeEach(function() {
        racket = new Racket();
        racket.x = 10;
        racket.y = 10;
    });

    it('should go right', function() {
    	racket.goRight = true;
    	racket.move();
    	expect(racket.x).toEqual(15);

    	racket.x = canvas.width - racket.width;
    	racket.move();
    	expect(racket.x).toEqual(canvas.width - racket.width);
    	expect(racket.y).toEqual(10);
    });

    it('should go left', function() {
    	racket.goLeft = true;
    	racket.move();
    	expect(racket.x).toEqual(5);

    	racket.x = 0;
    	racket.move();
    	expect(racket.x).toEqual(0);
    	expect(racket.y).toEqual(10);
    });
});
