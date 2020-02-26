export default function Renderer(game){

    function clear(){
        game.getContext().clearRect(
            0, 
            0, 
            game.getCanvas().width, 
            game.getCanvas().height)
    }

    function draw(component){
        game.getContext().fillStyle = component.color
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