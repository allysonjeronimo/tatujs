import Collection from '../util/Collection.js'
import Colors from '../util/Colors.js'
import Renderer from '../core/Renderer.js'
import Input from '../core/Input.js'
import Physics from '../core/Physics.js'
import Transform from './Transform.js'

export default class GameObject {

    /**
     * A base class for GameObject
     * @param {Array} components
     * 
     **/
    constructor(components) {

        this.active = true
        this.name = this.constructor.name

        this.children = new Collection()

        this.components = new Collection()

        this.renderer = new Renderer()
        this.input = new Input()
        this.physics = new Physics()

        this.initComponents(components)
    }

    initComponents(components){

        // default component
        this.transform = new Transform()
        this.addComponent(this.transform)

        if(components){
            components.forEach(
                component => this.addComponent(component)
            )
        }
    }

    // called by game when this component
    // is added to game
    init(game) {
        this.game = game
        this.debug = this.game.getSettings().debug
    }

    addChild(gameObject) {
        gameObject.parent = this
        gameObject.init(this.game)
        this.children.add(gameObject)
    }

    removeChild(gameObject) {
        if (this.parent && this._id === gameObject._id) {
            this.parent.children.remove(gameObject)
        }
        else {
            this.children.remove(gameObject)
        }
    }

    addComponent(component){
        if(!this.getComponent(component.type)){
            component.setParent(this)
            this.components.add(component)
        }
        else{
            throw new Error(`Component ${component.type} is already exists!`)
        }
    }

    removeComponent(component){
        this.components.remove(component)
    }

    getComponent(type){
        return this.components.toArray.find(component => component.type === type)
    }

    destroy() {
        this.removeChild(this)
    }

    update() {
        
        this.updateComponents()

        if (this.children.size()) {
            this.updateChildren()
        }
    }

    updateComponents(){
        // categorize components between (hasUpdate and hasDraw)
        if(this.components.size()){
            this.components.forEach(
                component => {
                    if(component.active && component.hasUpdate){
                        try{
                            component.update()
                        }catch(e){
                            console.log('Error: ' + e.message)
                            throw new Error(`Component ${component._id} doens't have a update method!`)
                        } 
                    }   
                }
            )
        }
    }

    updateChildren() {
        this.children.forEach(
            c => {
                c.update()
            }
        )
    }

    draw() {
        if (this.children.size()) {
            this.drawChildren()
        }
        else {
            this.drawComponents()
        }
    }

    drawComponents(){

        if(this.components.size()){
            this.components.forEach(
                component => {
                    if(component.active && component.hasDraw){
                        try{
                            component.draw()
                        }catch(e){
                            console.log('Error: ' + e.message)
                            throw new Error(`Component ${component._id} doens't have a draw method!`)
                        } 
                    }   
                }
            )
        }

    }

    drawChildren() {
        this.children.forEach(
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