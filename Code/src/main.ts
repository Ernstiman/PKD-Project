import { get_clicked_node_index } from './click.js';
import { draw } from './draw.js';
import { player_draw_function, reset_node_function } from './draw_functions.js';
import { get_base_game_state, } from './setup_game_state.js';
import { iNode } from './types.js';


let game_state=get_base_game_state()
let canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
const ctx = canvas?.getContext('2d');
addEventListener('click', function(e){
    const x = e.offsetX;
    const y = e.offsetY;
    
    let node_index = get_clicked_node_index(game_state.i_node_array, x, y);
    if(node_index !== undefined){
        
        for(let i = 0; i < game_state.i_node_array.length; i ++){
            let my_node = game_state.i_node_array[i];
            if(i === node_index){
                player_draw_function(ctx!, my_node.x, my_node.y)
            }
            else{
                reset_node_function(ctx!, my_node.x, my_node.y)}}
        }
    }
)

draw(game_state)    