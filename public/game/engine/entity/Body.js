export default class Body{

    constructor(settings){
        this.parent = settings.parent
        this.width = settings.width || parent.width
        this.height = settings.height || parent.height

        // validate here (parent is required)
        if(!this.parent)
            throw new Error('A parent GameObject is required!')
    }

    getBounds(){
        return {
            top: this.parent.y,
            left: this.parent.x + this.width,
            bottom: this.parent.y + this.height,
            right: this.parent.x
        }
    }
    
}