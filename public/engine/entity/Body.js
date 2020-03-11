import Component from './Component.js'

export default class Body extends Component{

    constructor(settings){
        super(settings)
        this.validate(settings)
        this.width = settings.width
        this.height = settings.height 
        this.kinematic = settings.kinematic || false // not affected by physics when is true (gravity)
        this.detectCollision = settings.detectCollision || true
        this.gravity = settings.gravity || 0.05
        this.gravitySpeed = settings.gravitySpeed || 0
    }

    validate(settings){
        if(!settings.width || !settings.height){
            throw new Error('setting.width and settings.height are required!')
        }
    }

    getBounds(){
        return {
            top: this.parent.y,
            left: this.parent.x + this.width, // 
            bottom: this.parent.y + this.height,
            right: this.parent.x
        }
    }

    update(){
        super.update()
        // process physics
    }

    process(){
        
    }
    
}