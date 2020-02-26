export default function GameComponent(x, y, width, height, color){

    let state = {
        x: x, 
        y: y, 
        width: width, 
        height: height, 
        color: color
    }

    let myRenderer

    let setRenderer = function(renderer){
        myRenderer = renderer
    }

    let update = function(){
        console.log('Updated')
    }

    let draw = function () {
        console.log('Draw')
        myRenderer.draw(
            state.x, 
            state.y, 
            state.width, 
            state.height, 
            state.color)
    }

    return {
        setRenderer,
        update,
        draw
    }

}