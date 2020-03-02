import Renderer from './Renderer.js'
import Input from './Input.js'
import Collection from '../util/Collection.js'

export default class GameComponent {

    /**
     * @param {Object} settings - {x, y, width, height, collision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.collision
     * @param {String} settings.color
     */
    constructor(settings) {
        if (settings) {
            this.x = settings.x
            this.y = settings.y
            this.width = settings.width
            this.height = settings.height
            this.collision = settings.collision
            this.color = settings.color
        }

        this.components = new Collection()
    }

    addComponent(component) {
        component.parent = this
        component.init(this.game)
        this.components.add(component)
    }

    removeComponent(component) {
        if (this.parent && component._id === this._id) {
            this.parent.components.remove(component._id)
        }
        else {
            this.components.remove(component._id)
        }
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
        this.renderer = game.getRenderer()
        this.input = game.getInput()
    }

    update() {
        if (this.components.size()) {
            this.updateComponents()
        }
    }

    updateComponents() {
        this.components.forEach(
            c => c.update()
        )
    }

    draw() {
        if (this.components.size())
            this.drawComponents()
        else
            this.renderer.draw(this)
    }

    drawComponents() {
        this.components.forEach(
            c => c.draw()
        )
    }

    collisionWith(other) {
        if (!this.collision || !other.collision) return

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