import Component from './Component.js'
import Vector from '../util/Vector.js'

export default class Transform extends Component{

    /**
     * @param {Object} settings
     * @param {Vector} settings.position 
     * @param {Vector} settings.scale 
     * @param {Vector} settings.rotation 
     */
    constructor(settings){
        super(settings)
        // default values
        this.position = settings.position || new Vector()
        this.scale = settings.scale || new Vector()
        this.rotation = settings.rotation || new Vector()
    }

    // other functions to manipulate transform

}