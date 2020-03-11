import Component from './Component.js'

export default class Body extends Component{

    /**
     * @param {Object} settings 
     * @param {Number} settings.width
     * @param {Number} settings.height
     */
    constructor(settings){
        super()
        this.validate(settings)
        // width and height are used to check collisions
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
            top: this.transform.y,
            left: this.transform.x + this.width, // 
            bottom: this.transform.y + this.height,
            right: this.transform.x
        }
    }

    update(){
        super.update()
    }

    process(){
        
    }
    
}