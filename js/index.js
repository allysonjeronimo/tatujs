let state = {}

/**
 * Lib Input
 */
const inputManager = {

    start: () => {

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
    },

    getAxis: () => {
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
}

const game = {
    canvas: document.getElementById('content-game'),
    infoPanel: {
        playerPosition: document.getElementById('player-position')
    },
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(updateGame, 20)
        inputManager.start()
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    showDebugPanel: function () {
        this.infoPanel.playerPosition.innerHTML = `(${state.player.x},${state.player.y})`
    }
}

function startGame() {
    game.start()
    state.player = new Component(30, 30, '#8be9fd', 10, 10)
}

function updateGame() {
    game.clear()
    state.player.update()
    state.player.draw()
    game.showDebugPanel()
}

function Component(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.speed = 2
    this.key = false

    this.updatePosition = function () {
        const axis = inputManager.getAxis()
        this.x += axis.x * this.speed
        this.y += axis.y * this.speed
    }

    this.update = function () {
        this.updatePosition()
    }

    this.draw = function () {
        game.context.fillStyle = color
        game.context.fillRect(this.x, this.y, this.width, this.height)
    }
}

startGame()