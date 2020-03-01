export default function Renderer(game){

    let defaultColor = '#8be9fd'

    function clear(){
        game.getContext().clearRect(
            0, 
            0, 
            game.getCanvas().width, 
            game.getCanvas().height)
    }

    function draw(component){
        game.getContext().fillStyle = defaultColor
        game.getContext().fillRect(
            component.x, 
            component.y, 
            component.width, 
            component.height)
    }

    return {
        clear,
        draw
    }
}