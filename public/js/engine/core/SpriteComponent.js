import GameComponent from "./GameComponent.js";
import Path from '../util/Path.js'

// https://stackoverflow.com/questions/3129099/how-to-flip-images-horizontally-with-html5
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
        this.scaleX = settings.scaleX || 1
        this.scaleY = settings.scaleY || 1

        if(this.image)
            this.image.src = Path.ASSETS + settings.image
    }

    setImage(image){
        this.image.src = Path.ASSETS + image
    }

    /**
     * @param {Object} scale 
     * @param {Number} scale.x 
     * @param {Number} scale.y 
     */
    setScale(scale){
        this.scaleX = scale.x ? scale.x : 1
        this.scaleY = scale.y ? scale.y : 1
        console.log('X:' + this.scaleX, 'Y:' + this.scaleY)
    }

    flip(){
        this.scaleX = this.scaleX * -1
    }

    flop(){
        this.scaleY = this.scaleY * -1
    }

}