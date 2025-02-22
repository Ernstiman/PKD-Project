export function remove_node_object(node_objects, type) {
    const return_array = [];
    for (let node_object of node_objects) {
        if (node_object.type !== type) {
            return_array.push(node_object);
        }
    }
    return return_array;
}
