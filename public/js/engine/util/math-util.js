// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// singleton

export default function MathUtil() {

    function isInteger(value) {
        if ((value === undefined) || (value === null)
            || (typeof value != 'number'))
            return false
        return value % 1 == 0
    }

    function isNumber(value) {
        return typeof value === 'number'
    }

    /**
     * Return a number between min and max. If given 
     * number is float the max is exclusive.
     * 
     * @param {Number} min 
     * @param {Number} max 
     */
    function random(min, max) {

        if (!isNumber(min) || !isNumber(max)) return

        if (isInteger(min) || isInteger(max))
            return Math.floor(Math.random() * (max - min + 1) + min)
        return Math.random() * (max - min + 1) + min
    }

    return {
        random,
        isInteger,
        isNumber
    }
}



