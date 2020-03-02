import Renderer from './Renderer.js'
import Input from './Input.js'
import Collection from '../util/Collection.js'

export default class GameComponent {

    /**
     * @param {Object} settings - {x, y, width, height, detectCollision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.detectCollision
     * @param {String} settings.color
     * @param {String} settings.tag
     */
    constructor(settings) {
        if (settings) {
            this.x = settings.x
            this.y = settings.y
            this.width = settings.width
            this.height = settings.height
            this.detectCollision = settings.detectCollision
            this.color = settings.color
            this.name = this.constructor.name
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

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        this.renderer = game.getRenderer()
        this.input = game.getInput()
        this.physics = game.getPhysics()
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

    onCollision(other){}
}