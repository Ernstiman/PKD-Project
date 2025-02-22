import { list } from './lib/list.js';
import { construct_inode, construct_node_object } from './contructors.js';
import { trap_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';
const i_node_array = [];
export function get_base_game_state() {
    const basic_graph = {
        adj: [
            list(1),
            list(2, 4),
            list(3, 1),
            list(4),
            list(5),
            list(6),
            list(7, 2),
            list(0),
        ],
        size: 8
    };
    for (let i = 0; i < basic_graph.size; i++) {
        if (i !== 0) {
            construct_inode(i, [], 0, 0, i_node_array);
        }
        else {
            construct_inode(i, [construct_node_object(0, trap_draw_function)], 0, 0, i_node_array);
        }
    }
    // construct_inode(0,[construct_node_object(0, trap_draw_function)],100,500, i_node_array)
    // construct_inode(1,[],300,500, i_node_array)
    // construct_inode(2,[],500,500, i_node_array)
    // construct_inode(3,[],700,500, i_node_array)
    // construct_inode(4,[],900,600, i_node_array)
    generate_x_y(i_node_array);
    return { i_node_array: i_node_array, map_graph: basic_graph, current_node: undefined };
}
// module.exports = {i_node_array}
