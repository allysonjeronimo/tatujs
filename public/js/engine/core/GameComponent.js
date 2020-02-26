import Renderer from './Renderer.js'
import InputManager from './InputManager.js'

export default class GameComponent {

    constructor(x, y, width, height, speed, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.color = color
    }

    // called by game when this component
    // is added to game
    init(game){
        this.game = game
        this.renderer = Renderer(this.game)
        this.input = InputManager(this.game)
    }

    draw(){
        this.renderer.draw(this)
    }

}