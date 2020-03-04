import DomManager from '../util/DomManager.js'
import Colors from '../util/Colors.js'

// https://stackoverflow.com/questions/3129099/how-to-flip-images-horizontally-with-html5
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

    // this.draw = function (component) {

    //     context.save()

    //     if (component.texture) {
    //         // to use scale to flip, it's needed to change
    //         // the pivot before that
    //         context.scale(component.scaleX, component.scaleY)

    //         if (component.texture.width) {

    //             context.drawImage(
    //                 component.texture.image,
    //                 component.x,
    //                 component.y,
    //                 component.texture.width,
    //                 component.texture.height)
    //         }
    //         else {
    //             context.drawImage(
    //                 component.texture.image,
    //                 component.x,
    //                 component.y)
    //         }

    //     } else {
    //         context.fillStyle = component.color
    //         context.fillRect(
    //             component.x,
    //             component.y,
    //             component.width,
    //             component.height)
    //     }

    //     context.restore()
    // }

    /**
     */
    this.drawTexture = function (texture, x, y) {

        context.save()

        // Set the origin to the center of the image
        context.translate(x + texture.width / 2, y + texture.height / 2)

        // Flip/flop the canvas

        let flipScale = texture.flip ? -1 : 1
        let flopScale = texture.flop ? -1 : 1

        context.scale(flipScale, flopScale)

        // Draw the image    
        context.drawImage(texture.image, -texture.width / 2, -texture.height / 2, texture.width, texture.height)

        context.restore()
    }

    this.drawRect = function (rect, color, outlineColor) {
        
        if(color || outlineColor)
            context.beginPath();

        if (color) {
            context.fillStyle = color
            context.fillRect(
                rect.left,
                rect.top,
                rect.right,
                rect.bottom)
        }

        if (outlineColor) {
            context.lineWidth = "2";
            context.strokeStyle = outlineColor
            context.rect(
                rect.left,
                rect.top,
                rect.right,
                rect.bottom)
            context.stroke();
        }
    }

    /**
     * @param {Text} text A Text with settings
     * @param {String} value A string to draw
     */
    this.drawText = function (text, value) {
        context.font = `${text.size}px ${text.font}`
        context.fillStyle = text.color
        context.textAlign = text.align

        if (text.outline) {
            context.lineWidth = text.outline
            context.strokeStyle = text.outlineColor
            context.strokeText(value, text.x, text.y)
        }

        context.fillText(value, text.x, text.y)
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


