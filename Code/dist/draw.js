import { is_adj_node } from './adj_nodes.js';
import { find_id_arrray } from './id_array.js';
import { for_each } from './lib/list.js';
import { get_detective_nodes_indexes } from './detective.js';
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export function draw(game_state) {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game_state.game_over) {
        draw_win_screen(ctx, game_state);
    }
    else if (game_state.not_win) {
        draw_game_over_screen(ctx, game_state);
    }
    else {
        for (let screen_id of game_state.active_screens) {
            let screen = find_id_arrray(screen_id, game_state.screens);
            if (screen !== undefined) {
                screen.draw_function(ctx, game_state);
            }
        }
    }
}
function applyOldMovieFilter(ctx, game_state) {
    if (!ctx || !canvas || game_state.game_over) {
        return;
    }
    // Get the image data from canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    ctx.lineWidth = 2;
    // Overlay film grain (noise)
    for (let i = 0; i < 4; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const intensity = Math.random() * 255;
        ctx.fillStyle = `rgba(${intensity}, ${intensity}, ${intensity}, 0.1)`;
        ctx.fillRect(x, y, 3, 3);
    }
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const intensity = Math.random() * 255;
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(x, y, Math.random() * 10, Math.random() * 10);
    }
    // Draw scratches (random thin lines)
    if (Math.random() > 0.5) {
        for (let i = 0; i < 1; i++) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
            ctx.beginPath();
            let x = Math.random() * canvas.width;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
    }
    // Apply vignette effect
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 4, canvas.width / 2, canvas.height / 2, canvas.width / 1.2);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Apply filter at random intervals for flickering effect
setInterval(() => {
    if (Math.random() > 0.8) {
        ctx.globalAlpha = 0.9 + Math.random() * 0.1; // Slight flicker
    }
    else {
        ctx.globalAlpha = 1;
    }
}, 200);
export function game_draw(ctx, game_state) {
    list_graph_draw(ctx, game_state);
    draw_gui_rectangles(ctx, game_state);
    draw_ui_elements(ctx, game_state);
    draw_inventory(ctx, game_state);
    applyOldMovieFilter(ctx, game_state);
}
function draw_inventory(ctx, game_state) {
    var _a;
    let x = 1600;
    let y = 150;
    for (let i = 0; i < game_state.player_inventory.length; i++) {
        let inventory_object = game_state.player_inventory[i];
        if (inventory_object !== undefined) {
            ctx.fillStyle = "black"; // Set text color
            ctx.font = "25px Georgia"; // Set font size and type
            ctx.textAlign = "center"; // Center the text horizontally
            ctx.textBaseline = "middle"; // Center the text vertically
            ctx.fillText((i + 1).toString(), inventory_object.box.x + 10, inventory_object.box.y - 15);
            inventory_object.node_object.draw_function(ctx, inventory_object.box.x + 25, inventory_object.box.y + 25, inventory_object.node_object);
            if (i === ((_a = game_state.selected_object) === null || _a === void 0 ? void 0 : _a.index)) {
                ctx.fillStyle = "rgba(173, 57, 25, 0.67)";
                ctx.fillRect(game_state.selected_object.box.x, game_state.selected_object.box.y, game_state.selected_object.box.width, game_state.selected_object.box.height);
                ctx.strokeRect(game_state.selected_object.box.x, game_state.selected_object.box.y, game_state.selected_object.box.width, game_state.selected_object.box.height);
            }
            draw_gui_rectangle(ctx, inventory_object.box);
            y += 50;
        }
    }
}
export function draw_ui_elements(ctx, game_state) {
    function current_round_text() {
        draw_default_text_style("Day: " + game_state.round.toString(), 100, 100, ctx, 40, 7);
    }
    function draw_player_collectables() {
        draw_default_text_style("Beavers: " +
            game_state.player_collectables[0].count.toString(), 400, 100, ctx, 40, 7);
        draw_default_text_style("Rabbits: " +
            game_state.player_collectables[1].count.toString(), 700, 100, ctx, 40, 7);
    }
    function draw_beaver_quota() {
        ctx.textAlign = "left";
        draw_default_text_style("Quota: " + game_state.shop_collectables[0].count.toString() + " remaining...", 1200, 100, ctx, 40, 7);
        draw_default_text_style("Days Left: " + game_state.days_to_quota.toString(), 1200, 160, ctx, 40, 7);
    }
    current_round_text();
    draw_player_collectables();
    draw_beaver_quota();
}
export function list_graph_draw(ctx, game_state) {
    let new_graph = game_state.map_graph;
    let new_array = game_state.i_node_array;
    // if(game_state.game_over){
    //     new_graph = {adj: [list(1), list()], size: 1}
    //     construct_inode(0, [], new_array[shop_index].x, new_array[shop_index].y, new_array);
    //     construct_inode(1, [], 450, 450, new_array);
    // }
    function draw_lines_and_arrows() {
        let detective_nodes = get_detective_nodes_indexes(game_state);
        for (let i = 0; i < new_graph.size; i++) {
            ctx.font = "45px Arial";
            let inode = new_array[i];
            let adj_nodes = new_graph.adj[i];
            ctx.strokeStyle = "black";
            for_each((adj_index) => {
                let out_node = new_array[adj_index];
                const headlen = 10; // Length of the arrowhead
                const angle = Math.atan2(out_node.y - inode.y, out_node.x - inode.x); // Direction of the line
                // Calculate the points of the triangle (arrowhead)
                const draw_x = (inode.x + out_node.x) / 2;
                const draw_y = (inode.y + out_node.y) / 2;
                const arrowX1 = draw_x - headlen * Math.cos(angle - Math.PI / 6);
                const arrowY1 = draw_y - headlen * Math.sin(angle - Math.PI / 6);
                const arrowX2 = draw_x - headlen * Math.cos(angle + Math.PI / 6);
                const arrowY2 = draw_y - headlen * Math.sin(angle + Math.PI / 6);
                function draw_arrow() {
                    ctx.moveTo(draw_x, draw_y);
                    ctx.lineTo(arrowX1, arrowY1);
                    ctx.moveTo(draw_x, draw_y);
                    ctx.lineTo(arrowX2, arrowY2);
                    ctx.stroke();
                }
                // Draw lines
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.moveTo(inode.x, inode.y);
                ctx.lineTo(out_node.x, out_node.y);
                ctx.stroke();
                // Only draw lines adjacent walkable lines and arrows green
                if (inode.index === game_state.current_node) {
                    let is_walkable = is_adj_node(game_state, adj_index);
                    if (is_walkable) {
                        ctx.strokeStyle = "rgb(46, 148, 63)";
                        draw_arrow();
                    }
                }
                if (detective_nodes.find((indx) => { return (indx === inode.index); })) {
                    ctx.strokeStyle = "rgb(182, 32, 29)";
                    draw_arrow();
                }
                // else draw them black
                draw_arrow();
            }, adj_nodes);
        }
    }
    function draw_nodes() {
        for (let i = 0; i < new_graph.size; i++) {
            let inode = new_array[i];
            const radius = 25;
            const start_angle = 0;
            const end_angle = 2 * Math.PI;
            ctx.beginPath();
            ctx.arc(inode.x, inode.y, radius, start_angle, end_angle);
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fill();
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }
    function draw_node_objects() {
        for (let i = 0; i < new_array.length; i++) {
            let inode = new_array[i];
            for (let i_node_object = 0; i_node_object < inode.nodeObjects.length; i_node_object++) {
                let node_object = inode.nodeObjects[i_node_object];
                node_object.draw_function(ctx, inode.x, inode.y, inode.nodeObjects[i_node_object]);
            }
        }
    }
    function draw_icon_animations() {
        for (let i = game_state.icon_animations.length - 1; i >= 0; i--) {
            let icon_animation = game_state.icon_animations[i];
            icon_animation.move_function(game_state, icon_animation, i);
            ctx.drawImage(icon_animation.image, icon_animation.x, icon_animation.y, icon_animation.size, icon_animation.size);
        }
    }
    draw_lines_and_arrows();
    draw_nodes();
    draw_node_objects();
    draw_icon_animations();
}
export function draw_gui_rectangles(ctx, game_state) {
    for (let rect of game_state.gui_rectangles) {
        draw_gui_rectangle(ctx, rect);
    }
}
export function draw_default_text_style(text, pos_x, pos_y, ctx, size, outline_width = 5) {
    ctx.font = "bold " + size.toString() + "px Arial ";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = outline_width;
    ctx.strokeText(text, pos_x, pos_y);
    ctx.fillStyle = 'white';
    ctx.fillText(text, pos_x, pos_y);
    ctx.lineWidth = 2;
}
export function draw_gui_rectangle(ctx, rect) {
    ctx.roundRect(rect.x, rect.y, rect.width, rect.height, 10);
    ctx.fillStyle = 'rgba(97, 95, 95, 0.3)';
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.roundRect(rect.x, rect.y, rect.width, rect.height, 10);
    ctx.stroke();
    ctx.lineWidth = 2;
    draw_default_text_style(rect.text, rect.x + rect.width / 2, rect.y + rect.height / 2, ctx, 25);
}
export function draw_shop_gui(ctx, game_state) {
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.37)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw_shop_block_item_blocks(ctx, game_state);
}
export function draw_shop_block_item_blocks(ctx, game_state) {
    let x = 700;
    let y = 700;
    for (let shop_block_item_block of game_state.shop_item_blocks) {
        shop_block_item_block.node_object.draw_function(ctx, shop_block_item_block.block.x + 50, shop_block_item_block.block.y - 50, shop_block_item_block.node_object);
        draw_gui_rectangle(ctx, shop_block_item_block.block);
    }
}
export function draw_game_over_screen(ctx, game_state) {
    const img = new Image();
    img.src = '../img/HOB-0.jpg';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the GIF;  // Continue to draw the image in sync with the animation
}
export function draw_win_screen(ctx, game_state) {
    const img = new Image();
    img.src = '../img/win_screen.jpg';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the GIF   
}
