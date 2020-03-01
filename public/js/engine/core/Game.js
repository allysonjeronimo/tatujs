
import DomManager from '../util/dom-manager.js'

/**
 * Lib do manager game main features
 * @param {*} width 
 * @param {*} height 
 */
export default function Game(width = 480, height = 270) {

    // game components to call update and draw
    let components = []
    let canvas
    let context
    let interval
    let frameCount
    let dm = DomManager()

    init()

    function initDOM() {
        
        dm.create('div', {id: 'content'})
        canvas = dm.create('canvas', {id: 'content-game', width, height, parent: 'content'})
        dm.create('div', {id:'info-panel', parent:'content'})
        dm.create('p', {id:'component-position', parent:'info-panel'})
        context = canvas.getContext('2d')
    }

    function init() {
        // init general variables
        initDOM()

        interval = setInterval(updateGame, 20)// 20
        frameCount = 0
    }

    function stop() {
        clearInterval(interval)
    }
    
    function checkCollisions(component) {
        components.forEach(
            current => {
                if (component.id != current.id &&
                    component.collisionWith(current)) {
                }
            }
        )
    } 

    function everyInterval(n){
        if((frameCount / n) % 1 == 0){
            return true
        }
        return false
    }

    function updateGame() {
        frameCount++
        components.forEach(
            c => {
                c.update(frameCount)
                // check collisions?
                checkCollisions(c)
            }
        )
        drawGame()
        
    }

    function showPosition(component){
        dm.setContent(
            'component-position', 
            `Position: (${component.x}, ${component.y})`)
    }

    function drawGame() {

        // temp
        context.clearRect(0, 0, canvas.width, canvas.height)

        components.forEach(
            c => c.draw()
        )
    }

    function addComponent(component) {
        // check if exists before add
        component.id = components.length
        component.init(this)
        components.push(component)
    }

    function removeComponent(component) {
        if (!component.id) return

        components.splice(component.id, 1)
    }

    function getContext() {
        return context
    }

    function getCanvas() {
        return canvas
    }

    /**
     * @returns {width, height}
     */
    function getScreenSize(){
        return {width, height}
    }

    return {
        addComponent,
        removeComponent,
        getCanvas,
        getContext,
        stop,
        everyInterval,
        getScreenSize,
        showPosition
    }
}

