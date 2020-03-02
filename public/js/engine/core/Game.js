
import Collection from '../util/Collection.js'
import Renderer from './Renderer.js'
import Input from './Input.js'

/**
 * Lib do manager game main features
 * @param {Object} settings {input, renderer}
 * @param {Object} settings.renderer 
 * @param {Number} settings.renderer.width 
 * @param {Number} settings.renderer.height 
 * @param {Object} settings.input
 */
export default function Game(settings = {
    renderer: { width: 800, height: 600 },
    input : {}
    }) {

    if (typeof Game.instance === 'object')
        return Game.instance

    // game components to call update and draw
    let components = new Collection()
    let interval
    let frameCount
    let renderer = new Renderer(settings.renderer)
    let input = new Input({ ...settings.input, clientRect: renderer.getCanvas().getBoundingClientRect() })

    init()

    function init() {
        interval = setInterval(updateGame, 20)
        frameCount = 0
    }

    function processCollisions(component, components) {
        if (component.collision && components) {
            components.forEach(
                current => {
                    if (current._id != component._id && current.collision) {
                        console.log('check collision between: ', component, current)
                        component.collisionWith(current)
                    }
                    // has children
                    if (current.components) {
                        processCollisions(component, current.children)
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
                // processCollisions(c, components)
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

    Game.instance = this
}

