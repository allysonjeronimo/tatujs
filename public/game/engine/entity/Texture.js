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

        this.flip = false
        this.flop = false
    }

    setImage(image) {
        this.image.src = Path.ASSETS + image
    }

    setFlip(flip = false) {
        this.flip = flip
    }

    setFlop(flop = false) {
        this.flop = flop
    }
}