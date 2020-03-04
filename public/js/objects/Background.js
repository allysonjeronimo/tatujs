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
    }

    // parallax
}