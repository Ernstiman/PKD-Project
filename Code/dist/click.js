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
