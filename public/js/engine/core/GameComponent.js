import Collection from '../util/Collection.js'
import Colors from '../util/Colors.js'
import Renderer from '../core/Renderer.js'
import Input from '../core/Input.js'
import Physics from '../core/Physics.js'

export default class GameComponent {

    /**
     * @param {Object} settings - {x, y, width, height, detectCollision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.visible
     * @param {Boolean} settings.detectCollision
     * @param {String} settings.color
     * @param {Number} settings.anchorX (0.0, 0.5 or 1.0)
     * @param {Number} settings.anchorY (0.0, 0.5 or 1.0)
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

        this.components = new Collection()
     
        this.renderer = new Renderer()
        this.input = new Input()
        this.physics = new Physics()
    }

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        // this.renderer = game.getRenderer()
        // this.input = game.getInput()
        // this.physics = game.getPhysics()
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

    getRectangle(){
        
        let right
        let left
        let top
        let bottom

        // define left and right
        if(this.anchorX === 0.0){
            right = this.x + this.width
            left = this.x
        }
        else if(this.anchorX === 0.5){
            right = this.x + this.width / 2
            left = this.x - this.width / 2
        }
        else if(this.anchorX === 1.0){
            right = this.x
            left = this.x - this.width
        }

        // define top and bottom
        if(this.anchorY === 0.0){
            top = this.y
            bottom = this.y + this.height
        }
        else if(this.anchorY === 0.5){
            top = this.y + this.height / 2
            bottom = this.y - this.height / 2
        }
        else if(this.anchorY === 1.0){
            top = this.y + this.height
            bottom = this.y
        }
    
        return {
            top,
            right,
            bottom,
            left
        }
    }

    log(){
        // draw rectangle
        console.log('x:', this.x, 'y:', this.y)
        console.log('width:', this.width, 'height:', this.height)
        console.log('anchoX: ', this.anchorX, 'anchorY: ', this.anchorY)
        console.log('Rectangle: ', this.getRectangle())
    }
}