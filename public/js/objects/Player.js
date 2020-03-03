import GameComponent from '../engine/core/GameComponent.js'
import Colors from '../engine/util/Colors.js'
import TextComponent from '../engine/core/TextComponent.js'

export default class Player extends GameComponent {

    constructor(settings) {
        super({
            x: 10,
            y: 170,
            width: 30,
            height: 30,
            detectCollision: true
        })

        this.speed = 2
        this.score = 0

        this.textScore = new TextComponent(
            { outline: 3, outlineColor: Colors.BLACK, color: Colors.YELLOW }
        )
    }

    update() {
        super.update()
        this.move()
        this.checkBounds()
    }

    checkBounds() {
        let screenWidth = this.renderer.getScreenSize().width

        if (this.x < 0)
            this.x = 0
        if (this.x > screenWidth - this.width)
            this.x = screenWidth - this.width
    }

    move() {
        let axis = this.input.getAxis()
        this.x += axis.x ? axis.x * this.speed : 0
    }

    onCollision(other) {
        //this.color = Colors.RED
        other.destroy()
        this.score++
    }

    draw() {
        super.draw()
        this.textScore.drawText('Score: ' + this.score)
    }

}