export default function Renderer(game){

    if(typeof Renderer.instance === 'object')
        return Renderer.instance

    Renderer.COLORS = {
        RED: 'red',
        BLUE: 'blue',
        GREEN: 'green',
        BLACK: 'black',
        WHITE: 'white',
        DEFAULT: '#8be9fd'
    }

    Object.freeze(Renderer.COLORS)

    this.clear = function (){
        game.getContext().clearRect(
            0, 
            0, 
            game.getCanvas().width, 
            game.getCanvas().height)
    }

    this.draw = function(component){
        game.getContext().fillStyle = component.color ? component.color : Renderer.COLORS.DEFAULT
        game.getContext().fillRect(
            component.x, 
            component.y, 
            component.width, 
            component.height)
    }

    Renderer.instance = this
}


