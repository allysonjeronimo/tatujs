// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
export default function MathUtil() {

    if(typeof MathUtil.instance === 'object')
        return MathUtil.instance

    this.isInteger = function(value) {
        if ((value === undefined) || (value === null)
            || (typeof value != 'number'))
            return false
        return value % 1 == 0
    }

    this.isNumber = function(value) {
        return typeof value === 'number'
    }

    /**
     * Return a number between min and max. If given 
     * number is float the max is exclusive.
     * 
     * @param {Number} min 
     * @param {Number} max 
     */
    this.random = function(min, max) {
        if (!this.isNumber(min) || !this.isNumber(max)) return

        if (this.isInteger(min) || this.isInteger(max))
            return Math.floor(Math.random() * (max - min + 1) + min)
        return Math.random() * (max - min + 1) + min
    }

    MathUtil.instance = this
}



