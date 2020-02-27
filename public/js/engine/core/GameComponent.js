import Renderer from './Renderer.js'
import InputManager from './InputManager.js'

export default class GameComponent {

    constructor(x, y, width, height, speed, color, checkCollision = false) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.color = color
        
        this.originalColor = this.color
        this.collidedColor = 'red'

        this.checkCollision = checkCollision

        this.top = this.y
        this.right = this.x + this.width
        this.bottom = this.y + this.height
        this.left = this.x
    }

    getRectangle = () => {
        return {
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height,
            left: this.x
        }
    }

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        this.renderer = Renderer(this.game)
        this.input = InputManager(this.game)
    }

    draw() {
        this.renderer.draw(this)
    }

    collisionWith(other) {
        if (!this.checkCollision) return

        if (this.x + this.width > other.x && this.x < other.x + other.width &&
            this.y + this.height > other.y && this.y < other.y + other.height) {
            this.color = this.collidedColor
            return true
        }
        else {
            this.color = this.originalColor
            return false
        }
    }

}