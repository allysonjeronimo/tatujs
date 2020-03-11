import TypeUtil from '../util/TypeUtil.js'

export default class Component{
    
    constructor(){
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

    update(){

    }
}