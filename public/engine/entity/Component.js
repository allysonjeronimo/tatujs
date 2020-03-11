import TypeUtil from '../util/TypeUtil.js'

export default class Component{
    
    /**
     * @param {Object} settings 
     * @param {Boolean} settings.update
     * @param {Boolean} settings.draw
     */
    constructor(settings){
        this.update = settings.update || false // the component must has a update function
        this.draw = settings.draw || false // the component must has a draw function
        this.active = true
        this.type = TypeUtil.getTypeName(this)
        this.parent = null
        this.transform = null
    }

    setParent(gameObject){
        this.parent = gameObject
        this.transform = this.parent.transform
    }

    getParent(){
        return this.parent
    }
}