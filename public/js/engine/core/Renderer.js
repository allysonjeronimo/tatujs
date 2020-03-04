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

    // https://stackoverflow.com/questions/3129099/how-to-flip-images-horizontally-with-html5
    this.draw = function (component) {

        context.save()

        if (component.image) {
            // to use scale to flip, it's needed to change
            // the pivot before that
            context.scale(component.scaleX, component.scaleY)
            context.drawImage(
                component.image,
                component.x,
                component.y,
                component.width,
                component.height)
        } else {
            context.fillStyle = component.color
            context.fillRect(
                component.x,
                component.y,
                component.width,
                component.height)
        }

        context.restore()
    }

    this.drawRect = function (component) {
        context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = Colors.DEFAULT

        let rect = component.getRectangle()

        context.rect(
            rect.left,
            rect.top,
            component.width,
            component.height)

        context.stroke();
    }

    /**
     * @param {Text} component A Text component with text settings
     * @param {String} textValue A text to draw
     */
    this.drawText = function (component, textValue) {
        context.font = `${component.size}px ${component.font}`
        context.fillStyle = component.color
        context.textAlign = component.align

        if (component.outline) {
            context.lineWidth = component.outline
            context.strokeStyle = component.outlineColor
            context.strokeText(textValue, component.x, component.y)
        }

        context.fillText(textValue, component.x, component.y)
    }

    /**
     * @param {Number} pointA.x
     * @param {Number} pointA.y
     * @param {Number} pointB.x
     * @param {Number} pointB.y
     */
    this.drawLine = function (pointA, pointB) {

    }

    this.getCanvas = function () {
        return canvas
    }

    this.getScreenSize = function () {
        return { width, height }
    }

    Renderer.instance = this
}


