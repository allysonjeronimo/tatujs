import DomManager from '../util/DomManager.js'
import Path from '../util/Path.js'

// https://www.w3schools.com/jsref/dom_obj_audio.asp
export default class Audio{

    /**
     * @param {Object} settings
     * @param {String} settings.file
     * @param {Boolean} settings.loop
     */
    constructor(settings){
        this.audio = new DomManager().create('audio', {preload: 'auto', controls: 'none'})
        this.audio.src = Path.ASSETS + settings.file
        this.audio.loop = settings.loop || false
        this.audio.style.display = 'none'
    }

    play(){
        this.audio.play()
    }

    stop(){
        this.audio.stop()
    }


}