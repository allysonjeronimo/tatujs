// Draw Neon Lines: https://codepen.io/agar3s/pen/pJpoya
export default function DomManager() {

    if (typeof DomManager.instance === 'object')
        return DomManager.instance

    /**
     * @param {String} element
     * @param {Object} settings (id, name, parent, content, class, etc)
     */
    this.create = function (element, settings) {
        // create element
        let created = document.createElement(element)
        // define parent
        if (settings.parent) {
            let parentElement = this.get('#' + settings.parent)
            if (parentElement) {
                parentElement.appendChild(created)
            }
            delete settings.parent
        }
        else {
            // body is the parent
            let body = this.get('body')
            body.appendChild(created)
        }

        // content
        if (settings.content) {
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
    this.get = function (query) {
        return document.querySelector(query)
    }

    this.setContent = function (id, content) {
        let element = this.get('#' + id)
        element.innerHTML = content
    }

    this.setStyle = function (query, rules) {
        let element = this.get(query)
        if (element) {
            // rules
            for (let property in rules) {
                element.style[property] = rules[property]
            }
        }
    }

    DomManager.instance = this
}