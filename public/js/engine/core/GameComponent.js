import Renderer from './Renderer.js'
import InputManager from './InputManager.js'

export default class GameComponent {

    /**
     * @param {Object} settings - {x, y, width, height, collision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.collision
     */
    constructor(settings) {
        if (settings) {
            this.x = settings.x
            this.y = settings.y
            this.width = settings.width
            this.height = settings.height
            this.collision = settings.collision
        }

        this.components = {}
    }

    generateId(){
        let keys = Object.keys(this.components)
        let length = keys.length
        return length == 0 ? 0 : parseInt(keys[length-1])+1
    }

    addComponent(component) {
        component.id = this.generateId()
        component.parent = this
        component.init(this.game)
        this.components[component.id] = component
    }

    removeComponent(component) {
        if (this.parent && component.id === this.id) {
            delete this.parent.components[component.id]
        }
        else{
            delete this.components[component.id]    
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
        // use singleton
        this.renderer = Renderer(this.game)
        this.input = InputManager(this.game)
    }

    update() {
        if (Object.keys(this.components).length) {
            this.updateComponents()
        }
    }

    updateComponents() {
        for (let i in this.components) {
            this.components[i].update()
        }
    }

    draw() {
        if (Object.keys(this.components).length) {
            this.drawComponents()
        }
        else {
            this.renderer.draw(this)
        }
    }

    drawComponents() {
        for (let i in this.components) {
            this.components[i].draw()
        }
    }

    collisionWith(other) {
        if (!this.collision) return

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