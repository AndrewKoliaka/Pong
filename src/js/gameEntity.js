'use strict';

// base class for all entities in the game
function GameEntity(props) {
    props = props || {};
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.color = props.color || 'black';
    this.radius = props.radius || 10;
    this.speed = props.speed || 0;
}