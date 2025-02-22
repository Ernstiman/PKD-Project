import { is_adj_node } from './adj_nodes.js';
import { get_clicked_node_index } from './click.js';
import { construct_node_object } from './contructors.js';
import { draw, list_graph_draw } from './draw.js';
import { player_draw_function} from './draw_functions.js';
import { remove_node_object } from './node_objects.js';
import { get_base_game_state, } from './setup_game_state.js';
import { iNode } from './types.js';


let game_state=get_base_game_state()
draw(game_state);

addEventListener('click', function(e){
    const x: number = e.offsetX;
    const y: number = e.offsetY;
    
    let node_index = get_clicked_node_index(game_state.i_node_array, x, y);
    
    if(node_index !== undefined && is_adj_node(game_state, node_index)){
        for(let i = 0; i < game_state.i_node_array.length; i ++){
            let my_node: iNode = game_state.i_node_array[i];
            my_node.nodeObjects = remove_node_object(my_node.nodeObjects, 1);
            if(i === node_index){
                game_state.current_node = node_index;
                my_node.nodeObjects.push(construct_node_object(1, player_draw_function)) 
            }
        }
        draw(game_state);   
        }
    }
)

   