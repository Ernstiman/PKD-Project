import {for_each} from './lib/list.js'; 
import { GameState, iNode,  NodeObject} from './types.js';

const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
const ctx = canvas!.getContext("2d");

export function draw(game_state: GameState): void {
    
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);

        list_graph_draw(ctx, game_state);
    }

export function list_graph_draw(ctx: CanvasRenderingContext2D, game_state: GameState){

    //Draw lines
    
    for(let i=0; i<game_state.map_graph.size; i++){

       let inode: iNode= game_state.i_node_array[i];
       let adj_nodes = game_state.map_graph.adj[i];

       for_each((adj_index)=>{

           let out_node=game_state.i_node_array[adj_index];

           ctx.beginPath(); 
           ctx.moveTo(inode.x, inode.y); // Start on node
           ctx.lineTo(out_node.x, out_node.y); // End on adj
           ctx.stroke(); // Render the line
           
           const headlen = 10; // Length of the arrowhead
           const angle = Math.atan2(out_node.y - inode.y, out_node.x - inode.x); // Direction of the line

    // Calculate the points of the triangle (arrowhead)
           const draw_x = (inode.x + out_node.x) / 2;
           const draw_y = (inode.y + out_node.y) / 2;
           const arrowX1 = draw_x - headlen * Math.cos(angle - Math.PI / 6);
           const arrowY1 = draw_y - headlen * Math.sin(angle - Math.PI / 6);
           const arrowX2 = draw_x - headlen * Math.cos(angle + Math.PI / 6);
           const arrowY2 = draw_y - headlen * Math.sin(angle + Math.PI / 6);

           ctx.beginPath();
            
           ctx.moveTo(draw_x, draw_y);
           ctx.lineTo(arrowX1, arrowY1);
           ctx.moveTo(draw_x, draw_y);
           ctx.lineTo(arrowX2, arrowY2);
           ctx.stroke();
       },adj_nodes)

   }

   //Draw Nodes
   for(let i=0; i<game_state.map_graph.size; i++){
       let inode: iNode= game_state.i_node_array[i]
       ctx.beginPath();
       ctx.arc(inode.x, inode.y, 20, 0, 2 * Math.PI);
       
       ctx.fillStyle = "white";
       ctx.fill();

       ctx.strokeStyle = "black";
       ctx.lineWidth = 2;

       ctx.stroke(); // Render the line
   }

   //Draw Node Objects
   for(let i=0; i<game_state.i_node_array.length; i++){
       let inode: iNode= game_state.i_node_array[i]
       for(let i_node_object=0; i_node_object<inode.nodeObjects.length; i_node_object++){
           let node_object=inode.nodeObjects[i_node_object]
           node_object.draw_function(ctx, inode.x, inode.y)
       }
   }

}