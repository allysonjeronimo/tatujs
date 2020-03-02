import GameComponent from '../engine/core/GameComponent.js'
import Colors from '../engine/util/Colors.js'

export default class Player extends GameComponent {

    constructor(settings) {
        super(settings)
        this.speed = 2
    }

    update() {
        super.update()
        let axis = this.input.getAxis()
        this.x += axis.x ? axis.x * this.speed : 0
    }

    onCollision(other) {
        this.color = Colors.RED
    }

    onCollisionEnd(other){
        this.color = Colors.DEFAULT
    }

}