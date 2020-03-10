import Colors from '../engine/util/Colors.js'
import Text from '../engine/entity/Text.js'
import Texture from '../engine/entity/Texture.js'
import GameObject from '../engine/entity/GameObject.js'
import Audio from '../engine/entity/Audio.js'

export default class Player extends GameObject {

    constructor(settings) {
        // init component
        super({
            width: 40,
            height: 40,
            detectCollision: true
        })
        // init texture
        this.texture = new Texture({
            file: 'images/ship.png', 
            width: 40, 
            height: 40}
        )

        this.speed = 2
        this.score = 0
        this.x = this.renderer.getScreenSize().width / 2
        this.y = this.renderer.getScreenSize().height / 2

        this.textScore = new Text(
            { outline: 4, outlineColor: Colors.BLACK, color: Colors.YELLOW }
        )

        this.audio = new Audio({file: 'audio/effect.wav'})
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
        this.texture.setFlip(axis.x < 0)
    }

    onCollision(other) {
        other.destroy()
        this.score++
        this.audio.play()
    }

    draw() {
        super.draw()
        this.renderer.drawTexture(this.texture, this.x, this.y)
        this.renderer.drawText(this.textScore, 'Score: ' + this.score)
    }

}