import GameComponent from "../entity/GameComponent.js";
import Path from '../util/Path.js'

export default class SpriteComponent extends GameComponent {

    /**
    * A base class for visual components based on Sprites
    * @extends GameComponent
    * @param {Object} settings - {x, y, width, height, detectCollision}
    * @param {Number} settings.x
    * @param {Number} settings.y 
    * @param {Number} settings.width
    * @param {Number} settings.height
    * @param {Boolean} settings.visible
    * @param {Boolean} settings.detectCollision
    * @param {String} settings.image
    * @param {Number} settings.anchorX (0.0, 0.5, 1.0)
    * @param {Number} settings.anchorY (0.0, 0.5, 1.0)
    */
    constructor(settings) {
        super(settings)

        this.image = settings.image ? new Image() : ''

        // to flip/flop effect
        this.scaleX = settings.scaleX || 1
        this.scaleY = settings.scaleY || 1

        if (this.image)
            this.image.src = Path.ASSETS + settings.image
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