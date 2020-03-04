import SpriteComponent from '../engine/entity/SpriteComponent.js'
import Colors from '../engine/util/Colors.js'
import Text from '../engine/entity/Text.js'

export default class Player extends SpriteComponent {

    constructor(settings) {
        super({
            x: 10,
            y: 170,
            width: 30,
            height: 30,
            detectCollision: true,
            image: 'ship.png'
        })

        this.speed = 2
        this.score = 0
        this.toRight = true;
        this.x = this.renderer.getScreenSize().width / 2
        this.y = this.renderer.getScreenSize().height / 2

        this.textScore = new Text(
            { outline: 3, outlineColor: Colors.BLACK, color: Colors.YELLOW }
        )
    }

    update() {
        super.update()
        this.move()
        this.checkBounds()
    }

    checkBounds() {
        let screenSize = this.renderer.getScreenSize()

        if (this.x < 0)
            this.x = 0
        if (this.x > screenSize.width - this.width)
            this.x = screenSize.width - this.width

        if(this.y < 0)
            this.y = 0
        if(this.y > screenSize.height - this.height)
            this.y = screenSize.height - this.height
    }

    move() {
        let axis = this.input.getAxis()
        this.x += axis.x ? axis.x * this.speed : 0
        this.y += axis.y ? axis.y * this.speed : 0
        this.checkFlip(axis)
    }

    checkFlip(axis){
        if(axis.x > 0 && !this.toRight){
            this.setScale({x:1})
            this.toRight = true
        }
        if(axis.x < 0 && this.toRight){
            this.setScale({x:-1})
            this.toRight = false
        }
    }

    onCollision(other) {
        other.destroy()
        this.score++
    }

    draw() {
        super.draw()
        this.renderer.drawText(this.textScore, 'Score: ' + this.score)
    }

}