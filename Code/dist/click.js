import { remove_node_object } from './node_objects.js';
import { construct_node_object } from './contructors.js';
import { player_draw_function } from './draw_functions.js';
import { step_on_node } from './node_objects.js';
export function get_clicked_node_index(nodes, x, y) {
    for (let node of nodes) {
        let dx = Math.pow((x - node.x), 2);
        let dy = Math.pow((y - node.y), 2);
        if (dx + dy <= Math.pow(40, 2)) {
            return node.index;
        }
    }
    return undefined;
}
export function position_in_rectangle(x, y, x1, y1, x2, y2) {
    if (x > x1 && x < x2 && y > y1 && y < y2) {
        return true;
    }
    return false;
}
export function remove_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            arr.splice(i, 1);
        }
    }
}
export function find_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            return elem;
        }
    }
}
export function clicked_on_node(game_state, node_index) {
    for (let i = 0; i < game_state.i_node_array.length; i++) {
        let my_node = game_state.i_node_array[i];
        my_node.nodeObjects = remove_node_object(my_node.nodeObjects, 1);
        if (i === node_index) {
            game_state.current_node = node_index;
            my_node.nodeObjects.push(construct_node_object(1, player_draw_function, () => { }, () => { }));
            remove_id_arrray("collect", game_state.gui_rectangles);
            step_on_node(game_state, my_node);
        }
    }
}
