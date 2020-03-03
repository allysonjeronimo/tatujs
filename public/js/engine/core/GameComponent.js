import Renderer from './Renderer.js'
import Input from './Input.js'
import Collection from '../util/Collection.js'
import Colors from '../util/Colors.js'

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
    constructor(settings = {}) {
        // default values
        this.x = settings.x || 0
        this.y = settings.y || 0
        this.width = settings.width || 30
        this.height = settings.height || 30
        this.visible = settings.visible === false ? false : true
        this.detectCollision = settings.detectCollision || false
        this.color = settings.color || Colors.DEFAULT
        this.name = this.constructor.name

        this.components = new Collection()
    }

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        this.renderer = game.getRenderer()
        this.input = game.getInput()
        this.physics = game.getPhysics()
    }


    addComponent(component) {
        component.parent = this
        component.init(this.game)
        this.components.add(component)
    }

    removeComponent(component) {
        if (this.parent && this._id === component._id) {
            this.parent.components.remove(component)
        }
        else {
            this.components.remove(component)
        }
    }

    destroy() {
        this.removeComponent(this)
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
        if (this.components.size()) {
            this.drawComponents()
        }
        else {
            if (this.visible)
                this.renderer.draw(this)
        }
    }

    drawComponents() {
        this.components.forEach(
            c => c.draw()
        )
    }

    onCollision(other) { }

    onCollisionStart(other) { }

    onCollisionEnd(other) { }

    doLater(callback, milliseconds) {
        setTimeout(callback, milliseconds)
    }
}