import { is_adj_node } from './adj_nodes.js';
import { shop_item_block_click_on } from './click.js';
import { find_id_arrray } from './id_array.js';
import {for_each} from './lib/list.js'; 
import { GameState, iNode,  NodeObject, GuiRectangle} from './types.js';
import { play_music, stop_music } from "./music.js";

export const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
export const ctx = canvas!.getContext("2d");

export function draw(game_state: GameState): void {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        for (let screen_id of game_state.active_screens){
            let screen = find_id_arrray(screen_id, game_state.screens);
            if(screen !== undefined){
                screen.draw_function(ctx, game_state)
            }
            
        }
    }

export function game_draw(ctx: CanvasRenderingContext2D,game_state: GameState){
    list_graph_draw(ctx, game_state);
    draw_gui_rectangles(ctx, game_state);
    draw_ui_elements(ctx, game_state);
    draw_inventory(ctx, game_state);
}


function draw_inventory(ctx: CanvasRenderingContext2D, game_state: GameState){
    let x=1600
    let y=150
    for(let i=0;i<game_state.player_inventory.length;i++){
        let inventory_object = game_state.player_inventory[i];
        if (inventory_object !== undefined) {
        
            inventory_object.node_object.draw_function(ctx, inventory_object.box.x + 25, inventory_object.box.y + 25, inventory_object.node_object)
            if(i === game_state.selected_object?.index){

                ctx.fillStyle = "rgba(255, 255, 255, 0.34)";

                ctx.fillRect(game_state.selected_object.box.x, game_state.selected_object.box.y, game_state.selected_object.box.width, game_state.selected_object.box.height);
                ctx.strokeStyle = "green";
                ctx.lineWidth = 2;
                ctx.strokeRect(game_state.selected_object.box.x, game_state.selected_object.box.y, game_state.selected_object.box.width, game_state.selected_object.box.height);

            }
            draw_gui_rectangle(ctx, inventory_object.box);
            y+=50
        }
    }
}

export function draw_ui_elements(ctx: CanvasRenderingContext2D, game_state: GameState) {
    function current_round_text() {
        ctx.fillStyle = "black";      // Set text color
        ctx.font ="45px Georgia";      // Set font size and type
        ctx.textAlign = "center";     // Center the text horizontally
        ctx.textBaseline = "middle";  // Center the text vertically
        ctx.fillText("Day: "+game_state.round.toString(), 100, 100);
    }

    function draw_player_collectables() {
        ctx.font = "45px Georgia";
        ctx.fillText("Beavers: " + 
        game_state.player_collectables[0].count.toString(), 400, 100);

        ctx.fillText("Rabbits: " + 
        game_state.player_collectables[1].count.toString(), 700, 100);
        
    }

    function draw_beaver_quota() {
        console.log(game_state.shop_collectables[0].count)
        ctx.font = "45px Georgia";
        ctx.fillText("Quota: " + 
        game_state.shop_collectables[0].count.toString() + " remaining...", 1200, 100);
        ctx.fillText("Days Left: " + game_state.days_to_quota.toString(), 1085, 160)
        
    }

    current_round_text();
    draw_player_collectables();
    draw_beaver_quota();
}

export function list_graph_draw(ctx: CanvasRenderingContext2D, game_state: GameState){

    function draw_lines_and_arrows(): void {
        for(let i = 0; i < game_state.map_graph.size; i++){
            ctx.font = "45px Arial";
            let inode: iNode = game_state.i_node_array[i];
            let adj_nodes = game_state.map_graph.adj[i];
            ctx.strokeStyle = "black";
            for_each((adj_index)=>{
     
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
     
                // Draw lines
                ctx.beginPath(); 
                ctx.moveTo(inode.x, inode.y); 
                ctx.lineTo(out_node.x, out_node.y); 
                ctx.stroke(); 
                

                // Only draw lines adjacent walkable lines and arrows green
                if (inode.index === game_state.current_node) {
                    let is_walkable = is_adj_node(game_state, adj_index);
                    if (is_walkable) {
                        ctx.strokeStyle =  "rgb(46, 148, 63)";
                        ctx.moveTo(draw_x, draw_y);
                        ctx.lineTo(arrowX1, arrowY1);
                        ctx.moveTo(draw_x, draw_y);
                        ctx.lineTo(arrowX2, arrowY2);
                        ctx.stroke();
                        
                    }
                } 
                
                // else draw them black
                ctx.moveTo(draw_x, draw_y);
                ctx.lineTo(arrowX1, arrowY1);
                ctx.moveTo(draw_x, draw_y);
                ctx.lineTo(arrowX2, arrowY2);
                ctx.stroke();
                

            }, adj_nodes)
        }
    }

    function draw_nodes() {
        for(let i = 0; i < game_state.map_graph.size; i++){
            let inode: iNode = game_state.i_node_array[i]
            const radius = 20;
            const start_angle = 0;
            const end_angle = 2 * Math.PI;
    
            ctx.beginPath();
            ctx.arc(inode.x, inode.y, radius, start_angle, end_angle);
           
            ctx.fillStyle = "white";
            ctx.fill();
    
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
    
            ctx.stroke();
        }
    }

    function draw_node_objects() {
        for(let i = 0; i < game_state.i_node_array.length; i++) {
            let inode: iNode = game_state.i_node_array[i]
            for(let i_node_object = 0; i_node_object<inode.nodeObjects.length; i_node_object++) {
                let node_object = inode.nodeObjects[i_node_object]
                node_object.draw_function(ctx, inode.x, inode.y, inode.nodeObjects[i_node_object])
            }
        }
    }


    draw_lines_and_arrows();
    draw_nodes();
    draw_node_objects();
}

export function draw_gui_rectangles(ctx: CanvasRenderingContext2D, game_state: GameState) {

    for (let rect of game_state.gui_rectangles){
        draw_gui_rectangle(ctx, rect);
    }
}

export function draw_gui_rectangle(ctx: CanvasRenderingContext2D, rect: GuiRectangle){

    ctx.fillStyle = "rgba(255, 255, 255, 0.34)";

    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);


    ctx.fillStyle = "black"; // Text color
    ctx.font = "20px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rect.text, rect.x + rect.width / 2, rect.y + rect.height / 2);

}

export function draw_shop_gui(ctx: CanvasRenderingContext2D, game_state: GameState){
    ctx.fillStyle = "rgba(0, 0, 0, 0.37)";
    ctx.fillRect(0, 0, canvas!.width, canvas!.height)
    draw_shop_block_item_blocks(ctx, game_state);
    
}

export function draw_shop_block_item_blocks(ctx: CanvasRenderingContext2D, game_state: GameState){
    let x = 700;
    let y = 700;
    for(let shop_block_item_block of game_state.shop_item_blocks){

        shop_block_item_block.node_object.draw_function(ctx,shop_block_item_block.block.x + 50, shop_block_item_block.block.y - 50, shop_block_item_block.node_object);
        draw_gui_rectangle(ctx, shop_block_item_block.block);
    }}

    export function draw_game_over_screen(ctx: CanvasRenderingContext2D, game_state: GameState){
    
        const img = new Image();
        img.src = '../img/HOB-0.jpg'
        img.onload = () => {
            function draw() {
                ctx.clearRect(0, 0, canvas!.width, canvas!.height);  // Clear the canvas
                ctx.drawImage(img, 0, 0, canvas!.width, canvas!.height);  // Draw the GIF
                requestAnimationFrame(draw);  // Continue to draw the image in sync with the animation
              }
              
              draw();
        }
        play_music(game_state.songs[2]);
    }
