export default class Component{
    
    /**
     * @param {Object} settings
     * @param {GameObject} settings.parent
     */
    constructor(settings){
        // validations
        
        if(!settings){
            throw new Error('Settings is required! (settings = {})')
        }
        if(!settings.parent){
            throw new Error('A parent GameObject is required! (settings.parent)')
        }

        this.parent = settings.parent
        this.active = true
    }

    execute(){}

}