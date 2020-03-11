import GameObject from '../../engine/entity/GameObject.js'
import Collection from '../../engine/util/Collection.js'
import Body from '../../engine/entity/Body.js'

export default class TestBodyComponent extends GameObject{

    constructor(settings){
        super(settings)

        this.components = new Collection()
        this.components.add(new Body({parent: this, width: 30, height: 30}))
    }
}