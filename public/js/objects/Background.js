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

        this.speed = 0.2
    }

    update(){
        this.x -= this.speed
    }

    // parallax
    draw(){
       // this.renderer.draw()
       // this.renderer.draw()
    }
}