/**
 * A item collection with generated ids
 */
export default function Collection() {

    let items = {}

    const nextId = function (item) {
        let keys = Object.keys(items)
        let length = keys.length
        let index = length == 0 ? 0 : parseInt(keys[length - 1].split('-')[1]) + 1
        return `${item.name ? item.name : 'Default'}-${index}`
    }

    this.add = function (item) {
        item._id = nextId(item)
        console.log('Generated ID: ' + item._id)
        items[item._id] = item
    }

    this.get = function (id) {
        return items[id]
    }

    this.remove = function (item) {
        delete items[item._id]
    }

    this.size = function () {
        return Object.keys(items).length
    }

    this.all = function () {
        return items
    }

    this.forEach = function(callBack){
        Object.values(items).forEach(callBack)
    }

}