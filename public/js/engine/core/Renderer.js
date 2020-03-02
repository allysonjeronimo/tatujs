import DomManager from '../util/DomManager.js'

export default function Renderer(settings) {

    if (typeof Renderer.instance === 'object')
        return Renderer.instance

    let canvas
    let context
    let dm = new DomManager()
    let width
    let height 

    Renderer.COLORS = {
        RED: 'red',
        BLUE: 'blue',
        GREEN: 'green',
        BLACK: 'black',
        WHITE: 'white',
        DEFAULT: '#8be9fd'
    }

    Object.freeze(Renderer.COLORS)

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
        context.fillStyle = component.color ? component.color : Renderer.COLORS.DEFAULT
        context.fillRect(
            component.x,
            component.y,
            component.width,
            component.height)
    }

    this.getCanvas = function(){
        return canvas
    }

    this.getScreenSize = function(){
        return {width, height}
    }

    Renderer.instance = this
}


