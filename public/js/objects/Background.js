import Texture from "../engine/entity/Texture.js";
import GameComponent from '../engine/entity/GameComponent.js'

export default class Background extends GameComponent {

    constructor(settings) {
        super(settings)

        this.texture = new Texture(
            {
                file: 'back.jpg',
                width: this.renderer.getScreenSize().width,
                height: this.renderer.getScreenSize().height
            }
        )

        this.speed = 2
        this.startPosition = this.renderer.getScreenSize().width
        this.endPosition = -this.renderer.getScreenSize().width
        
        this.background1Position = 0.0
        this.background2Position = this.startPosition    
    }

    update(){
        this.background1Position -= this.speed
        this.background2Position -= this.speed

        this.background1Position = this.checkPosition(this.background1Position)
        this.background2Position = this.checkPosition(this.background2Position)

    }

    checkPosition(x){
        if(x <= this.endPosition){
            return this.startPosition
        }
        return x
    }

    draw(){
        this.renderer.drawTexture(this.texture, this.background1Position, 0)
        this.renderer.drawTexture(this.texture, this.background2Position, 0)
    }
}