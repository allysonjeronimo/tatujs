/**
 * Lib to manager use inputs
 */
function Input() {

    this.inputKeys = []

    const keydown = (e) => {
        if (this.inputKeys.indexOf(e.keyCode) === -1) {
            this.inputKeys.unshift(e.keyCode)
        }
    }

    const keyup = (e) => {
        let index = this.inputKeys.indexOf(e.keyCode)
        this.inputKeys.splice(index, 1)
    }

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    function getAxis() {
        let x = 0
        let y = 0
        // left
        if (this.inputKeys.indexOf(37) !== -1) {
            x = -1
        }
        // right
        if (this.inputKeys.indexOf(39) !== -1) {
            x = 1
        }
        // up
        if (this.inputKeys.indexOf(38) !== -1) {
            y = -1
        }
        // down
        if (this.inputKeys.indexOf(40) !== -1) {
            y = 1
        }

        return { x, y }
    }

    return {
        getAxis
    }
}