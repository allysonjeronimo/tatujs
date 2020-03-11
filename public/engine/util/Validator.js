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
     * @param {Object.Boolean} settings.required
     */
    function validate(settings) {
        if (settings.required && !settings.value) {
            throw new Error(`${settings.name} is required! `)
        }
        if (settings.type && getClass(settings.type) != 'String') {
            throw new Error(`Value of settings.type must be a String!`)
        }
        if (settings.type && getClass(settings.value) != settings.type) {
            throw new Error(`${settings.name} must be a ${settings.type} but is a ${getClass(settings.value)}!  `)
        }
    }

    Validator.instance = this

    return {
        validate
    }
}


validator.validate({type: 'GameObject', name: 'settings.parent', value: new GameObject(), required: true})



