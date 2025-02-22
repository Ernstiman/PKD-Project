import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { GameState, iNode,  NodeObject} from './types.js';
import { construct_inode, construct_node_object } from './contructors.js';
import { trap_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';


const i_node_array: Array<iNode>=[];
export function get_base_game_state() : GameState{
    const basic_graph: ListGraph = {

        adj: [
            list(1),
            list(2, 4),
            list(3, 1),
            list(4),
            list(0),

        ],
        size: 5
    };

    



    construct_inode(0,[construct_node_object(0, trap_draw_function)],100,500, i_node_array)
    construct_inode(1,[],300,500, i_node_array)
    construct_inode(2,[],500,500, i_node_array)
    construct_inode(3,[],700,500, i_node_array)
    construct_inode(4,[],900,600, i_node_array)

    generate_x_y(i_node_array);

    return {i_node_array: i_node_array, map_graph: basic_graph, current_node: undefined}
}

// module.exports = {i_node_array}