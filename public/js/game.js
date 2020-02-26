/**
 * Lib do manager game main features
 * @param {*} width 
 * @param {*} height 
 */
export default function game(width = 480, height = 270) {

    // game components to call update and draw
    this.components = []

    init()

    function init() {
        // init general variables
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = width
        this.canvas.height = height

        document.body.insertBefore(
            this.canvas, document.body.childNodes[0])

        this.interval = setInterval(updateGame, 20)
    }


    function updateGame() {
        this.components.forEach(
            c => c.update()
        )

        drawGame()
    }

    function drawGame() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.components.forEach(
            c => c.draw()
        )
    }

    function addComponent(component) {
        component.id = this.components.length + 1
        this.components.push(component)
    }

    function removeComponent(component) {
        if (!component.id) return

        this.components.splice(component.id, 1)
    }
}

const game = {
    canvas: document.getElementById('content-game'),
    infoPanel: {
        playerPosition: document.getElementById('player-position'),
    },
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(updateGame, 20)
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    showDebugPanel: function () {
        this.infoPanel.playerPosition.innerHTML = `(${state.player.x},${state.player.y})`
    }
}