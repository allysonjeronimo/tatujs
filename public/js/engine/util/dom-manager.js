export default function DomManager(){


    /**
     * @param {String} element
     * @param {String} parent
     * @param {String} content
     * @param {Object} attrs (id, name, etc)
     */
    function create(element, parent, content, attrs){
        // create element
        let created = document.createElement(element)
        // define parent
        if(parent){
            parent.appendChild(created)
        }
        // content
        created.innerHTML = content
        // attrs
        for(let attr in attrs){
            created[attr] = attrs[attr]
        }

        return created
    }

    function getFirst(element){
        return document.querySelector(element)
    }

    function insertBefore(element, parent){
        parent.insertBefore(
            element, parent.childNodes[0])
    }

    return {
        insertBefore,
        getFirst,
        create
    }
   
}