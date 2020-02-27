export default function DomManager(){

    function createWithAttributes(parent, element, attrs){
        let created = document.createElement(element)

        for(let attr in attrs){
            created[attr] = attrs[attr]
        }

        if(parent){
            parent.appendChild(created)
        }

        return created
    }

    function create(parent, element, id){
        return createWithAttributes(parent, element, {id})
    }

    /**
     * 
     * @param {String} parent
     * @param {String} element
     * @param {String} content
     * @param {Object} attrs (id, name, etc)
     */
    function create(parent, element, content, attrs){

    }

    function createWithContent(parent, element, attrs, content){
        let created = createWithAttributes(parent, element, attrs)
        created.innerHTML = content
    }

    function insertBefore(parent, element){
        parent.insertBefore(
            element, parent.childNodes[0])
    }

    function getFirst(element){
        return document.querySelector(element)
    }

    return {
        getFirst,
        create,
        createWithAttributes,
        createWithContent
    }
   
}