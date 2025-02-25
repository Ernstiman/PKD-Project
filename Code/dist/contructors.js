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
        collectables: [],
        draw_function: draw_function,
    };
}
