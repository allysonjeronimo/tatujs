import Texture from "../engine/entity/Texture.js";
import GameComponent from '../engine/entity/GameComponent.js'

export default class Background extends GameComponent {

    constructor(settings) {
        super(settings)

        this.texture = new Texture(
            {
                file: 'images/back.jpg',
                width: this.renderer.getScreenSize().width,
                height: this.renderer.getScreenSize().height
            }
        )

        this.speed = 2
        this.startPosition = this.renderer.getScreenSize().width
        this.endPosition = -this.renderer.getScreenSize().width
        
        this.x1 = 0.0
        this.x2 = this.startPosition    
    }

    update(){
        this.x1 -= this.speed
        this.x2 -= this.speed

        this.x1 = this.checkPosition(this.x1)
        this.x2 = this.checkPosition(this.x2)
    }

    checkPosition(x){
        if(x <= this.endPosition){
            return this.startPosition
        }
        return x
    }

    draw(){
        this.renderer.drawTexture(this.texture, this.x1, 0)
        this.renderer.drawTexture(this.texture, this.x2, 0)
    }
}