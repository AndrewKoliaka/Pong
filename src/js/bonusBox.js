'use strict';

// BonusBox class
function BonusBox(x, y, type) {
    GameEntity.apply(this, [{
        x: x,
        y: y,
        color: color.BONUS_BOX
    }]);

    this.type = type || null;
    this.radius = 40;
    this.text = '';
    // remove bonus box in 20s if it won't be opened
    this.timer = setTimeout(this.remove.bind(this), 20000);
    this.effect = new Effect(type);
    switch (this.type) {
        case bonusBoxType.FAST_BALL:
            this.text = 'fast ball';
            break;
        case bonusBoxType.MORE_BALLS:
            this.text = 'more balls';
            break;
        case bonusBoxType.MOVEMENT_SPEED:
            this.text = 'extra speed';
            break;
        case bonusBoxType.BIG_PLAYER:
            this.text = 'big player';
    }
}

// inherited from GameEntity
BonusBox.prototype = Object.create(GameEntity.prototype);
BonusBox.prototype.constructor = BonusBox;

// removes itself
BonusBox.prototype.remove = function () {
    view.unRegister(this);
    clearTimeout(this.timer);
    game.bonusBoxes.removeElement(this);
};

// calls when ball kick the bonus 
BonusBox.prototype.open = function () {
    this.effect.resolve();
    this.remove();
};