import { trap_draw_function } from './draw_functions.js';
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
    return construct_node_object(0, trap_draw_function, (game_state, node, node_objects) => {
        game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 50, 50, "collect beavers", (game_state) => {
            game_state.player_collectables[0].count += node_objects.collectables[0].count;
            node_objects.collectables[0].count = 0;
        }));
    }, (game_state, node_object) => {
        node_object.collectables[0].count += 1;
    });
}
