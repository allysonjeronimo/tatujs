import GameComponent from '../engine/entity/GameComponent.js'
import Colors from '../engine/util/Colors.js'

export default class Obstacle extends GameComponent {

    constructor(settings) {
        super(settings)
        this.speed = 1
    }

    update(){
        super.update()
        this.x -= this.speed
        this.checkToDestroy()
    }

    draw(){
        super.draw()
        this.renderer.drawRect(this.getRectangleDebug(), Colors.DEFAULT)    
    }

    checkToDestroy(){
        if(this.x < 0){
           this.destroy()
        }
    }

}