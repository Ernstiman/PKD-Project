import { is_adj_node } from './adj_nodes.js';
import { for_each } from './lib/list.js';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export function draw(game_state) {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    list_graph_draw(ctx, game_state);
    draw_buttons(ctx, game_state);
}
export function list_graph_draw(ctx, game_state) {
    //Draw lines
    for (let i = 0; i < game_state.map_graph.size; i++) {
        let inode = game_state.i_node_array[i];
        let adj_nodes = game_state.map_graph.adj[i];
        for_each((adj_index) => {
            let out_node = game_state.i_node_array[adj_index];
            const headlen = 10; // Length of the arrowhead
            const angle = Math.atan2(out_node.y - inode.y, out_node.x - inode.x); // Direction of the line
            // Calculate the points of the triangle (arrowhead)
            const draw_x = (inode.x + out_node.x) / 2;
            const draw_y = (inode.y + out_node.y) / 2;
            const arrowX1 = draw_x - headlen * Math.cos(angle - Math.PI / 6);
            const arrowY1 = draw_y - headlen * Math.sin(angle - Math.PI / 6);
            const arrowX2 = draw_x - headlen * Math.cos(angle + Math.PI / 6);
            const arrowY2 = draw_y - headlen * Math.sin(angle + Math.PI / 6);
            ctx.strokeStyle = "black";
            if (inode.index === game_state.current_node) {
                let is_walkable = is_adj_node(game_state, adj_index);
                ctx.strokeStyle = is_walkable ? "green" : "red";
                ctx.beginPath();
                ctx.moveTo(draw_x, draw_y);
                ctx.lineTo(arrowX1, arrowY1);
                ctx.moveTo(draw_x, draw_y);
                ctx.lineTo(arrowX2, arrowY2);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(inode.x, inode.y); // Start on node
            ctx.lineTo(out_node.x, out_node.y); // End on adj
            ctx.stroke(); // Render the line
        }, adj_nodes);
    }
    //Draw Nodes
    for (let i = 0; i < game_state.map_graph.size; i++) {
        let inode = game_state.i_node_array[i];
        const radius = 20;
        const start_angle = 0;
        const end_angle = 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(inode.x, inode.y, radius, start_angle, end_angle);
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
            let node_object = inode.nodeObjects[i_node_object];
            node_object.draw_function(ctx, inode.x, inode.y);
        }
    }
}
export function draw_buttons(ctx, game_state) {
    const start_x = 1675;
    const start_y = 200;
    const trap_button = {
        x: start_x,
        y: start_y,
        width: 150,
        height: 80,
        text: "PLACE TRAP"
    };
    ctx.fillStyle = "black";
    ctx.fillRect(trap_button.x, trap_button.y, trap_button.width, trap_button.height);
    ctx.fillStyle = "white"; // Text color
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trap_button.text, trap_button.x + trap_button.width / 2, trap_button.y + trap_button.height / 2);
}
