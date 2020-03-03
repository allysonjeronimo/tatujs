import DomManager from '../util/DomManager.js'
import Colors from '../util/Colors.js'

export default function Renderer(settings) {

    if (typeof Renderer.instance === 'object')
        return Renderer.instance

    let canvas
    let context
    let dm = new DomManager()
    let width
    let height 

    init()

    function init() {
        width = settings.width ? settings.width : 800
        height = settings.height ? settings.height : 600
        initDOM()
    }

    function initDOM() {
        dm.create('div', { id: 'content' })
        canvas = dm.create('canvas', { id: 'content-game', width, height, parent: 'content' })
        context = canvas.getContext('2d')
    }

    this.clear = function () {
        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height)
    }

    this.draw = function (component) {
        context.fillStyle = component.color ? component.color : Colors.DEFAULT
        context.fillRect(
            component.x,
            component.y,
            component.width,
            component.height)
    }

    /**
     * @param {String} textValue A text to draw
     * @param {TextComponent} component A TextComponent with text settings
     */
    this.drawText = function(textValue, component){
        context.font = `${component.size}px ${component.font}`
        context.fillStyle = component.color ? component.color : Colors.DEFAULT 
        context.fillText(textValue, component.x, component.y)
    }

    this.getCanvas = function(){
        return canvas
    }

    this.getScreenSize = function(){
        return {width, height}
    }

    Renderer.instance = this
}


