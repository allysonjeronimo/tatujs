export default function DomManager() {

    /**
     * @param {String} element
     * @param {Object} settings (id, name, parent, content, class, etc)
     */
    function create(element, settings) {
        // create element
        let created = document.createElement(element)
        // define parent
        if (settings.parent) {
            let parentElement = get('#' + settings.parent)
            if(parentElement){
                parentElement.appendChild(created)
            }
            delete settings.parent
        }
        else{
            // body is the parent
            let body = get('body')
            body.appendChild(created)
        }

        // content
        if(settings.content){
            created.innerHTML = settings.content
            delete settings.content
        }

        // attrs
        for (let attr in settings) {
            created[attr] = settings[attr]
        }

        return created
    }

    /**
     * 
     * @param {String} query - #id, .class or element name
     */
    function get(query) {
        return document.querySelector(query)
    }

    return {
        create,
        get
    }

}