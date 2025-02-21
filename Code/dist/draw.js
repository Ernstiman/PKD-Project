import { for_each } from './lib/list.js';
export function draw(game_state) {
    const canvas = document.getElementById("canvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        list_graph_draw(ctx, game_state);
    }
}
export function list_graph_draw(ctx, game_state) {
    //Draw lines
    for (let i = 0; i < game_state.map_graph.size; i++) {
        let inode = game_state.i_node_array[i];
        let adj_nodes = game_state.map_graph.adj[i];
        for_each((adj_index) => {
            let out_node = game_state.i_node_array[adj_index];
            ctx.beginPath();
            ctx.moveTo(inode.x, inode.y); // Start on node
            ctx.lineTo(out_node.x, out_node.y); // End on adj
            ctx.stroke(); // Render the line
        }, adj_nodes);
    }
    //Draw Nodes
    for (let i = 0; i < game_state.map_graph.size; i++) {
        let inode = game_state.i_node_array[i];
        ctx.beginPath();
        ctx.arc(inode.x, inode.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke(); // Render the line
    }
    //Draw Node Objects
    for (let i = 0; i < game_state.i_node_array.length; i++) {
        let inode = game_state.i_node_array[i];
        for (let i_node_object = 0; i_node_object < inode.nodeObjects.length; i_node_object++) {
            let node_object = inode.nodeObjects[i];
            node_object.draw_function(ctx, inode.x, inode.y);
        }
    }
}
