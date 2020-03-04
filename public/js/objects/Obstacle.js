import GameComponent from '../engine/core/GameComponent.js'

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

    checkToDestroy(){
        if(this.x < 0){
           this.destroy()
        }
    }

    draw(){
        super.draw()
        this.renderer.drawRect(this)
    }
}