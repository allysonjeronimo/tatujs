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

        let top = this.y
        let right = this.x + this.width
        let bottom = this.y + this.height
        let left = this.x

        return {
            top,
            right,
            bottom,
            left
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

        let thisRectangle = this.getRectangle()
        let otherRectangle = other.getRectangle()

        if (thisRectangle.right > otherRectangle.left && thisRectangle.left < otherRectangle.right &&
            thisRectangle.bottom > otherRectangle.top && thisRectangle.top < otherRectangle.bottom) {
            return true
        }
        else {
            return false
        }
    }

}