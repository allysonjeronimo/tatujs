import GameComponent from "./GameComponent";
import Texture from "./Texture";

export default class SpriteComponent extends GameComponent{

    constructor(settings){
        super(settings)

        this.texture = new Texture()
    }
}