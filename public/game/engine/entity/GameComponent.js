import Collection from '../util/Collection.js'
import Colors from '../util/Colors.js'
import Renderer from '../core/Renderer.js'
import Input from '../core/Input.js'
import Physics from '../core/Physics.js'

export default class GameComponent {

    /**
     * A base class for components
     * @param {Object} settings - {x, y, width, height, detectCollision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.visible
     * @param {Boolean} settings.detectCollision
     * @param {String} settings.color
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
        this.anchorX = settings.anchorX || 0.0
        this.anchorY = settings.anchorY || 0.0
        this.drawRectangle = false

        this.components = new Collection()

        this.renderer = new Renderer()
        this.input = new Input()
        this.physics = new Physics()
    }

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        this.drawRectangle = this.game.getSettings().debug
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
            if (this.visible){
                if(this.drawRectangle){
                    this.renderer.drawRect(this.getRectangle(), false, Colors.DEFAULT)
                }      
            }
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

    /**
     * Get the current rectangle from the game component.
     * Can used to check collision or render component on screen.
     * @param {*} toCollision By default is false
     */
    getRectangle(toCollision = false) {
        // To check collision it's needed a "absolute rectangle" with abslute positions
        // To render it's need positions, with and height. 
        let top = this.y
        let right = toCollision ? this.x + this.width : this.width
        let bottom = toCollision? this.y + this.height : this.height
        let left = this.x

        return {
            top,
            right,
            bottom,
            left
        }
    }

    log() {
        console.log('x:', this.x, 'y:', this.y)
        console.log('width:', this.width, 'height:', this.height)
        console.log('anchorX: ', this.anchorX, 'anchorY: ', this.anchorY)
        console.log('Rectangle: ', this.getRectangle())
    }
}