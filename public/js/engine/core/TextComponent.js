import Renderer from './Renderer.js'
import Colors from '../util/Colors.js'

export default class TextComponent {

    /**
     * @param {Object} settings
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {String} settings.color
     * @param {String} settings.font
     * @param {Number} settings.size
     */
    constructor(settings) {
        // default values
        settings = {
            x: 10, 
            y: 20, 
            color: Colors.WHITE, 
            font: 'Arial', 
            size: 16, 
            align: 'left',
            ...settings
        }
        
        this.x = settings.x
        this.y = settings.y
        this.color = settings.color
        this.font = settings.font
        this.size = settings.size
        this.align = settings.align
        this.name = this.constructor.name

        this.renderer = new Renderer()
    }

    drawText(text) {
        this.renderer.drawText(text, this)
    }
}