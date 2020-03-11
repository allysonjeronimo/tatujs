import Colors from '../util/Colors.js'

export default class Text {

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
            outline: 0,
            outlineColor: Colors.BLACK,
            ...settings
        }
        
        this.x = settings.x
        this.y = settings.y
        this.color = settings.color
        this.font = settings.font
        this.size = settings.size
        this.align = settings.align
        this.outline = settings.outline
        this.outlineColor = settings.outlineColor
    }
}