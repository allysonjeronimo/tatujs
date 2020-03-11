function Validator() {
    if (typeof Validator.instance === 'object')
        return Validator.instance

    function getClass(obj) {
        if (typeof (obj) === "undefined") return "undefined";
        if (obj === null) return "Null";
        var res = Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
        if (res === "Object") {
            res = obj.constructor.name;
            if (typeof (res) != 'string' || res.length == 0) {
                if (obj instanceof jQuery) return "jQuery";// jQuery build stranges Objects
                if (obj instanceof Array) return "Array";// Array prototype is very sneaky
                return "Object";
            }
        }
        return res;
    }

    /**
     * @param {Object} settings 
     * @param {Object.String} settings.type
     * @param {Object.*} settings.value
     * @param {Object.String} settings.name
     * @param {Object.boolean} settings.required
     */
    function validate(settings) {
        if (settings.required && !settings.value) {
            throw new Error(`${settings.name} is required! `)
        }
        if (settings.type && getClass(settings.type) === 'String') {
            throw new Error(`Value of settings.type must be a String! and not ${typeof settings.type}`)
        }
        if (settings.type && !settings.value instanceof settings.type) {
            throw new Error(`${settings.name} must be a ${settings.type} instance! `)
        }
        console.log('ok!')
    }

    Validator.instance = this

    return {
        validate,
        getClass
    }
}

const validator = new Validator()

let x = 10

validator.validate(
    {
        type: 'Boolean',
        name: 'x',
        value: x,
        required: true
    })

// let type = 'Boolean'
// console.log(type && validator.getClass(type) === 'String')


