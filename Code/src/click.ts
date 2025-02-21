
import { draw } from './draw.js';
import { player_draw_function, reset_node_function } from './draw_functions.js';
import { get_base_game_state, } from './setup_game_state.js';
import { iNode } from './types.js';

export function get_clicked_node_index(nodes: Array<iNode>, x: number, y: number){
    let i = 0;
    for (let node of nodes){
        let dx = (x - node.x) ** 2;
        let dy = (y - node.y) ** 2;
        if(dx + dy <= 20**2){
            return i;
        }
        i ++
    }
    return undefined;
}