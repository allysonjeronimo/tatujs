/**
 * Lib to manager user inputs
 */
export default function inputManager() {
    let inputKeys = []
    let mousePosition = {}
    let touchPosition = {}

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

    const DEVICES = {
        KEYBOARD: 0,
        MOUSE: 1,
        TOUCH: 2
    }

    Object.freeze(KEYS)
    Object.freeze(DEVICES)

    const keyDown = (e) => {
        if (inputKeys.indexOf(e.keyCode) === -1) {
            inputKeys.unshift(e.keyCode)
        }
    }

    const keyUp = (e) => {
        let index = inputKeys.indexOf(e.keyCode)
        inputKeys.splice(index, 1)
    }

    const mouseMove = (e) => {
        mousePosition = { x: e.pageX, y: e.pageY }
    }

    const touchMove = (e) => {
        touchPosition = {
            x: e.touches[0].screenX,
            y: e.touches[0].screenY
        }
    }

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchmove', touchMove)

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

    const getKeyboardAxis = () => {
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

    /**
     * Return a object with X and Y contained
     * the current input values from key arrows or W,D,S,A
     * The X values can be -1 (left), 0 (none) or 1 (right)
     * The Y values can be -1 (up), 0 (none) or 1 (down)
     */
    const getAxis = () => {
        return getKeyboardAxis()
    }

    const getMousePosition = (canvas) => {
        if (canvas) {
            let rect = canvas.getBoundingClientRect()
            return {
                x: mousePosition.x - rect.left,
                y: mousePosition.y - rect.top
            }
        }
        return mousePosition
    }

    const getTouchPosition = (canvas) => {
        if (canvas) {
            let rect = canvas.getBoundingClientRect()
            return {
                x: touchPosition.x - rect.left,
                y: touchPosition.y - rect.top
            }
        }
        return touchPosition
    }

    return {
        KEYS, 
        DEVICES, 
        getAxis, 
        getMousePosition, 
        getTouchPosition
    }
}



