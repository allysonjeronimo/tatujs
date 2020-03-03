import GameComponent from "./GameComponent.js";
import Path from '../util/Path.js'

export default class SpriteComponent extends GameComponent{

     /**
     * @param {Object} settings - {x, y, width, height, detectCollision}
     * @param {Number} settings.x
     * @param {Number} settings.y 
     * @param {Number} settings.width
     * @param {Number} settings.height
     * @param {Boolean} settings.visible
     * @param {Boolean} settings.detectCollision
     * @param {String} settings.image
     */
    constructor(settings){
        super(settings)

        this.image = settings.image ? new Image() : ''

        if(this.image)
            this.image.src = Path.ASSETS + settings.image
    }

    setImage(image){
        this.image.src = Path.ASSETS + image
    }
}