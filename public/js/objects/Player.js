import GameComponent from '../engine/core/GameComponent.js'
import Colors from '../engine/util/Colors.js'
import TextComponent from '../engine/core/TextComponent.js'

export default class Player extends GameComponent {

    constructor(settings) {
        super(settings)
        this.speed = 2
        this.score = 0

        let textSettings = {
            x: 10,
            y: 20, 
            color: Colors.WHITE, 
            font: 'Arial', 
            size: 16
        }

        this.textScore = new TextComponent(textSettings)
    }

    update() {
        super.update()
        let axis = this.input.getAxis()
        this.x += axis.x ? axis.x * this.speed : 0
    }

    onCollision(other) {
        this.color = Colors.RED
        //other.destroy() // doesn't works!
        this.score++
        // renderer always clear the canvas before draw
        // so this text never will be showed
        // this.textScore.drawText('Score: ' + this.score)
    }

    draw(){
        super.draw()
        this.textScore.drawText('Score: ' + this.score)
    }

}