import GameComponent from '../engine/core/GameComponent.js'

export default class Player extends GameComponent{

    constructor(x, y, width, height, speed, color){
        super(x, y, width, height, speed, color, true)
    }

    update(){
        let mousePosition = this.input.getMousePosition()
        this.x = mousePosition.x
        this.y = mousePosition.y
    }

    collisionWith(other){
        if(super.collisionWith(other)){

        }
    }
}