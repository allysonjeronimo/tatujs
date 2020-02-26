
/**
 * Lib do manager game main features
 * @param {*} width 
 * @param {*} height 
 */
export default function Game(width = 480, height = 270) {

    // game components to call update and draw
    let components = []
    let canvas
    let context

    init()

    function initDOM() {
        // create div content
        let content = document.createElement('div')
        content.id = 'content'

        // create canvas
        canvas = document.createElement('canvas')
        canvas.id = 'content-game'

        // create info panel
        let infoPanel = document.createElement('div')
        infoPanel.id = 'info-panel'

        // create p and added to info-panel
        let p = document.createElement('p')
        p.id = 'player-position'
        p.innerHTML = "Player Position: <span id='player-position-value'>(0,0)</span>"

        infoPanel.appendChild(p)

        // add canvas to content
        content.appendChild(canvas)
        content.appendChild(infoPanel)

        context = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        // add content inside page body
        document.body.insertBefore(
            content, document.body.childNodes[0])

    }

    function init() {
        // init general variables
        initDOM()

        setInterval(updateGame, 20)
    }


    function updateGame() {
        components.forEach(
            c => c.update()
        )

        drawGame()
    }

    function drawGame() {

        // temp
        context.clearRect(0, 0, canvas.width, canvas.height)

        components.forEach(
            c => c.draw()
        )
    }

    function addComponent(component) {
        // check if exists before add
        component.id = components.length + 1
        component.init(this)
        components.push(component)
    }

    function removeComponent(component) {
        if (!component.id) return

        components.splice(component.id, 1)
    }

    function getContext(){
        return context
    }

    function getCanvas(){
        return canvas
    }

    return {
        addComponent,
        removeComponent,
        getCanvas,
        getContext
    }
}

