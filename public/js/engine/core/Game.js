
import DomManager from '../util/DomManager.js'
import Collection from '../util/Collection.js'

/**
 * Lib do manager game main features
 * @param {*} width 
 * @param {*} height 
 */
export default function Game(width = 480, height = 270) {

    if(typeof Game.instance === 'object')
        return Game.instance

    // game components to call update and draw
    let components = new Collection()
    let canvas
    let context
    let interval
    let frameCount
    let dm = new DomManager()

    init()

    function initDOM() {
        dm.create('div', { id: 'content' })
        canvas = dm.create('canvas', { id: 'content-game', width, height, parent: 'content' })
        dm.create('div', { id: 'info-panel', parent: 'content' })
        dm.create('p', { id: 'component-position', parent: 'info-panel' })
        context = canvas.getContext('2d')
    }

    function init() {
        // init general variables
        initDOM()

        interval = setInterval(updateGame, 20)// 20
        frameCount = 0
    }

    function processCollisions(component, components) {
        if (component.collision && components) {
            components.forEach(
                current => {
                    if (current.id != component.id && current.collision) {
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

        // temp
        context.clearRect(0, 0, canvas.width, canvas.height)

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

    this.showPosition = function(component) {
        dm.setContent(
            'component-position',
            `Position: (${component.x}, ${component.y})`)
    }

    this.addComponent = function(component) {
        components.add(component)
        component.init(this)
    }

    this.removeComponent = function(component) {
        components.remove(component)
    }

    // renderer
    this.getContext = function() {
        return context
    }

    this.getCanvas = function(){
        return canvas
    }

    this.getScreenSize = function() {
        return { width, height }
    }

    Game.instance = this
}

