function getTypeName(obj) {
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

export default {
    getTypeName
}
