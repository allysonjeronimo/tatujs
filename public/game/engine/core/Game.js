
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

    // game objects to call update and draw
    let children = new Collection()
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

    function processCollisions(currentGameObject, children) {
        // if children is a collision object
        // children (exactly the specific children that was registered to collided with component)
        if (currentGameObject.detectCollision && children) {
            children.forEach(
                currentOther => {
                    // TIP: check collision just with objects that can move
                    if (currentGameObject._id != currentOther._id && physics.checkCollision(currentGameObject, currentOther)) {
                        // notify game object
                        currentGameObject.onCollision(currentOther)
                    }
                    // has children
                    if (currentOther.children.size()) {
                        processCollisions(currentGameObject, currentOther.children)
                    }
                }
            )
        }
    }

    function updateGame() {
        frameCount++
        children.forEach(
            currentGameObject => {
                currentGameObject.update(frameCount)
                // restrict targets (by some data structure based on collision matrix)
                processCollisions(currentGameObject, children)
            }
        )
        drawGame()
    }

    function drawGame() {

        renderer.clear()

        children.forEach(
            currentGameObject => currentGameObject.draw()
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

    this.addObject = function (gameObject) {
        children.add(gameObject)
        gameObject.init(this)
    }

    this.removeObject = function (gameObject) {
        children.remove(gameObject)
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

