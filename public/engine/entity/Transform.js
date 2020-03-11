import Component from './Component.js'
import Vector from '../util/Vector.js'

export default class Transform extends Component{

    constructor(settings){
        super(settings)
        this.validate(settings)
        this.position = settings.position || new Vector()
        this.scale = settings.scale || new Vector()
        this.rotation = settings.rotation || new Vector()
    }

    validate(settings){
        let templateMessage = `# must be a # instance`
        if(settings.position && !this.position instanceof Vector){
            throw new Error('settings.position must be a Vector instance')
        }
        if(settings.scale && !this.scale instanceof Vector){
            throw new Error('settings.scale must be a Vector instance')
        }
        if(settings.rotation && !this.rotation instanceof Vector){
            throw new Error('settings.rotation must be a Vector instance')
        }
    }

}