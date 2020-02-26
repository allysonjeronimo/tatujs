export default function Renderer(game){

    function clear(){
        game.getContext().clearRect(
            0, 
            0, 
            game.getCanvas().width, 
            game.getCanvas().height)
    }

    function draw(x, y, width, height, color = 'black'){
        game.getContext().fillStyle = color
        game.getContext().fillRect(x, y, width, height)
    }

    return {
        clear,
        draw
    }
}