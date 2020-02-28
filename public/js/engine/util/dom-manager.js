export default class DomManager {

    constructor(element, attrs) {
        this.domElement = 
            element ? 
            this.create(element, attrs) : 
            this.getBody()
    }

    getBody() {
        return document.querySelector('body')
    }

    create(element, attrs) {
        // create element
        let created = document.createElement(element)
        // define parent
        if (parent) {
            parent.appendChild(created)
        }
        // content
        created.innerHTML = content
        // attrs
        for (let attr in attrs) {
            created[attr] = attrs[attr]
        }

        return created
    }

}



export default function DomManager() {

    /**
     * @param {String} element
     * @param {String} parent
     * @param {String} content
     * @param {Object} attrs (id, name, etc)
     */
    function create(element, parent, content, attrs) {
        // create element
        let created = document.createElement(element)
        // define parent
        if (parent) {
            parent.appendChild(created)
        }
        // content
        created.innerHTML = content
        // attrs
        for (let attr in attrs) {
            created[attr] = attrs[attr]
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

    function insertBefore(element, parent) {
        parent.insertBefore(
            element, parent.childNodes[0])
    }


    return {
        create,
        get
    }

}