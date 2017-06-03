// object which does all calculations
var engine = {
    // return angle between player center and ball center
    getCollisionAngle: function (ball, player) {
        var res = Math.atan2(player.y - ball.y, ball.x - player.x) * (180 / Math.PI);
        if (res < 0) {
            res += 360;
        }
        return res;
    },

    // cos of angle in radians
    getCos: function (angle) {
        return Math.cos(angle * Math.PI / 180).toFixed(3);
    },

    // sin of angle in radians
    getSin: function (angle) {
        return Math.sin(angle * Math.PI / 180).toFixed(3);
    },

    // degrees by cos value in radians 
    getAngleByCos: function (cos) {
        return Math.round(Math.acos(cos) * 180 / Math.PI);
    },

    // degrees by sin value in radians
    getAngleBySin: function (sin) {
        return Math.round(Math.asin(sin) * 180 / Math.PI);
    },

    // calculates x coordinate of point on circle with center in (0;0);
    // (distance that the ball will fly to the next cycle of game.loop)
    // 0: x coordinate of center of circle
    // radius: radius of circle
    // angle: angle for move
    getBallAX(radius, angle) {
        return 0 + radius * this.getCos(angle);
    },

    // calculates INVERSE y coordinate of point on circle with center in (0;0);
    getBallAY(radius, angle) {
        return -(0 + radius * this.getSin(angle));
    },

    // return random number between min and max
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}