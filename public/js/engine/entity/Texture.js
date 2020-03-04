import Path from '../util/Path.js'

export default class Texture {

    /**
     * @param {Object} settings
     * @param {String} settings.file
     * @param {Number} settings.width
     * @param {Number} settings.height
     */
    constructor(settings) {

        this.image = settings.file ? new Image() : ''

        if (this.image)
            this.image.src = Path.ASSETS + settings.file

        // default width and height

        this.width = settings.width  
        this.height = settings.height

        // to flip/flop effect
        this.scaleX = 1
        this.scaleY = 1

        // anchor point
        this.anchorX = 0.0
        this.anchorY = 0.0
    }

    setImage(image) {
        this.image.src = Path.ASSETS + image
    }

    /**
     * @param {Object} scale 
     * @param {Number} scale.x 
     * @param {Number} scale.y 
     */
    setScale(scale) {
        this.scaleX = scale.x ? scale.x : this.scaleX
        this.scaleY = scale.y ? scale.y : this.scaleY
    }

    flip() {
        this.scaleX = this.scaleX * -1
    }

    flop() {
        this.scaleY = this.scaleY * -1
    }
}