
import Collection from '../util/Collection.js'
import Renderer from './Renderer.js'
import Input from './Input.js'
import Physics from './Physics.js'

/**
 * Lib do manager game main features
 * @param {Object} settings {input, renderer}
 * @param {Object} settings.renderer 
 * @param {Number} settings.renderer.width 
 * @param {Number} settings.renderer.height 
 * @param {Object} settings.input
 * @param {Object} settings.physics
 */
export default function Game(
    settings = {
        renderer: { width: 800, height: 600 },
        input : {},
        physics: {},
        debug: false
    }){

    if (typeof Game.instance === 'object')
        return Game.instance

    // game components to call update and draw
    let components = new Collection()
    let interval
    let frameCount
    let renderer = new Renderer(settings.renderer)
    let input = new Input({ ...settings.input, clientRect: renderer.getCanvas().getBoundingClientRect() })
    let physics = new Physics(settings.physics)
    let debug = settings.debug

    init()

    function init() {
        interval = setInterval(updateGame, 20)
        frameCount = 0
    }

    function processCollisions(component, components) {
        // if components is a collision object
        // components (exactly the specific components that was registered to collided with component)
        if (component.detectCollision && components) {
            components.forEach(
                current => {
                    // TIP: check collision just with objects that can move
                    if (component._id != current._id && physics.checkCollision(component, current)) {
                        // notify component
                        component.onCollision(current)
                    }
                    // has children
                    if (current.components.size()) {
                        processCollisions(component, current.components)
                    }
                }
            )
        }
    }

    function updateGame() {
        frameCount++
        components.forEach(
            c => {
                c.update(frameCount)
                // restrict targets (by some data structure based on collision matrix)
                processCollisions(c, components)
            }
        )
        drawGame()
    }

    function drawGame() {

        renderer.clear()

        components.forEach(
            c => c.draw()
        )
    }

    this.stop = function () {
        clearInterval(interval)
    }

    this.everyInterval = function (n) {
        if ((frameCount / n) % 1 == 0) {
            return true
        }
        return false
    }

    this.addComponent = function (component) {
        components.add(component)
        component.init(this)
    }

    this.removeComponent = function (component) {
        components.remove(component)
    }

    this.getInput = function () {
        return input
    }

    this.getRenderer = function () {
        return renderer
    }

    this.getPhysics = function(){
        return physics
    }

    this.getSettings = function(){
        return settings
    }

    Game.instance = this
}

