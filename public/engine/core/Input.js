/**
 * Lib to manager user inputs
 */
export default function Input(settings) {

    if(typeof Input.instance === 'object')
        return Input.instance

    let inputKeys = []
    let mousePosition = {}
    let touchPosition = {}
    let clientRect = settings.clientRect

    Input.KEYS = {
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        W: 87,
        D: 68,
        S: 83,
        A: 65
    }

    Input.DEVICES = {
        KEYBOARD: 0,
        MOUSE: 1,
        TOUCH: 2
    }

    Object.freeze(Input.KEYS)
    Object.freeze(Input.DEVICES)

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
        if (hasSomeKey(Input.KEYS.ARROW_LEFT, Input.KEYS.A)) {
            x = -1
        }
        // right
        if (hasSomeKey(Input.KEYS.ARROW_RIGHT, Input.KEYS.D)) {
            x = 1
        }
        // up
        if (hasSomeKey(Input.KEYS.ARROW_UP, Input.KEYS.W)) {
            y = -1
        }
        // down
        if (hasSomeKey(Input.KEYS.ARROW_DOWN, Input.KEYS.S)) {
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
    this.getAxis = () => {
        return getKeyboardAxis()
    }

    this.getMousePosition = () => {
        return {
            x: mousePosition.x - clientRect.left,
            y: mousePosition.y - clientRect.top
        }
    }

    this.getTouchPosition = () => {
        return {
            x: touchPosition.x - clientRect.left,
            y: touchPosition.y - clientRect.top
        }
    }

    Input.instance = this
}



