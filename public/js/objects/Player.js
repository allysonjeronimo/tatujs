import GameComponent from '../engine/core/GameComponent.js'

export default class Player extends GameComponent {

    constructor(settings) {
        super(settings)
    }

    update() {
        super.update()
        let mousePosition = this.input.getMousePosition()
        this.x = mousePosition.x
        this.y = mousePosition.y
    }

    collisionWith(other) {
        if (super.collisionWith(other)) {
            console.log('Player collided with: ', other)
            this.game.stop()
        }
    }
}