/**
 * Lib to manager use inputs
 */
export default function inputManager() {
    let inputKeys = []

    const KEYS = {
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        W: 87,
        D: 68,
        S: 83,
        A: 65
    }

    Object.freeze(KEYS)

    const keydown = (e) => {
        if (inputKeys.indexOf(e.keyCode) === -1) {
            inputKeys.unshift(e.keyCode)
        }
    }

    const keyup = (e) => {
        let index = inputKeys.indexOf(e.keyCode)
        inputKeys.splice(index, 1)
    }

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    const hasKey = (key) => {
        return inputKeys.indexOf(key) >= 0
    }

    const hasSomeKey = (...keys) => {

        if (!keys || !inputKeys) return

        const mappedToBooleans = k => inputKeys.indexOf(k) >= 0
        const reducedToSingleBoolean = (ac, c) => ac || c

        return keys
            .map(mappedToBooleans)
            .reduce(reducedToSingleBoolean)
    }

    const getAxis = () => {
        let x = 0
        let y = 0
        // left
        if (hasSomeKey(KEYS.ARROW_LEFT, KEYS.A)) {
            x = -1
        }
        // right
        if (hasSomeKey(KEYS.ARROW_RIGHT, KEYS.D)) {
            x = 1
        }
        // up
        if (hasSomeKey(KEYS.ARROW_UP, KEYS.W)) {
            y = -1
        }
        // down
        if (hasSomeKey(KEYS.ARROW_DOWN, KEYS.S)) {
            y = 1
        }

        return { x, y }
    }

    return {
        KEYS, getAxis
    }
}



