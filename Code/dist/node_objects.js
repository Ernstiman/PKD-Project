/**
 * Creates a copy of a array without a specific node_object type
 * @param node_objects The array that we want to copy
 * @param type The type that we don't want in the copy
 * @returns A new array with object_types
 */
export function remove_node_object(node_objects, type) {
    const return_array = [];
    for (let node_object of node_objects) {
        if (node_object.type !== type) {
            return_array.push(node_object);
        }
    }
    return return_array;
}
/**
 * Runs all the player_step_on functions for a nodes node_objects
 * @param game_state the state of the game
 * @param node the node that the player steps to
 */
export function step_on_node(game_state, node) {
    for (let i = 0; i < node.nodeObjects.length; i++) {
        node.nodeObjects[i].player_step_on_function(game_state, node, node.nodeObjects[i]);
    }
}
/**
 * Runs the round_end_function for a nodes node_objects
 * @param game_state The state of the game
 * @param node The selected node
 */
export function node_activate_round_end(game_state, node) {
    for (let i = 0; i < node.nodeObjects.length; i++) {
        node.nodeObjects[i].round_end_function(game_state, node.nodeObjects[i], node);
    }
}
