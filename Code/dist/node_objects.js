export function remove_node_object(node_objects, type) {
    const return_array = [];
    for (let node_object of node_objects) {
        if (node_object.type !== type) {
            return_array.push(node_object);
        }
    }
    return return_array;
}
export function step_on_node(game_state, node) {
    for (let i = 0; i < node.nodeObjects.length; i++) {
        node.nodeObjects[i].player_step_on_function(game_state, node);
    }
}
