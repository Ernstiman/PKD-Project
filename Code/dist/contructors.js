import { trap_draw_function } from './draw_functions.js';
import { trap_step_on } from './step_on_functions.js';
import { trap_round_end } from './round_end_functions.js';
let global_node_object_id = 0;
export function get_node_object_id() {
    global_node_object_id = global_node_object_id + 1;
    return global_node_object_id;
}
export function construct_inode(index, node_objects, x, y, i_node_array) {
    i_node_array.push({ index: index, nodeObjects: node_objects, x: x, y: y });
}
export function construct_node_object(type, draw_function, player_step_on_function, round_end_function) {
    return {
        type: type,
        id: get_node_object_id(),
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [{ name: "beaver", count: 0 }],
        draw_function: draw_function,
    };
}
export function construct_collectable(name, count) {
    return { name: name, count: count };
}
export function construct_rectangle(id, x, y, width, height, text, click_on_function) {
    return { id, x, y, width, height, text, click_on_function };
}
export function test_trap_constructor() {
    return construct_node_object(0, trap_draw_function, trap_step_on, trap_round_end);
}
export function construct_shop_item_block(cost, node_object, block) {
    return { cost: cost, node_object: node_object, block: block };
}
