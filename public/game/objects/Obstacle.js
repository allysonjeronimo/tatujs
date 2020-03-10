import GameObject from '../engine/entity/GameObject.js'
import Colors from '../engine/util/Colors.js'

export default class Obstacle extends GameObject {

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
        this.renderer.drawRect(this.getRectangle(), Colors.DEFAULT)    
    }

    checkToDestroy(){
        if(this.x < 0){
           this.destroy()
        }
    }

}