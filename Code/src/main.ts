import {for_each, list, List} from './lib/list.js'; 
//import {ListGraph, } from '../lib/graphs';

type iNode = {
    index: number,
    nodeObjects: List<NodeObject>
    x: number,
    y: number,
};

const i_node_array: Array<iNode>=[];

function construct_inode(index: number, node_objects: List<NodeObject>, x: number, y: number) : void{
    i_node_array.push({index: index, nodeObjects: node_objects, x : x, y : y})
}
construct_inode(0,list(),100,500)
construct_inode(1,list(),300,500)
construct_inode(2,list(),500,500)
construct_inode(3,list(),700,500)
construct_inode(4,list(),900,600)


type NodeObject = {
    type: number
    id: number
    player_step_on_function: Function
    round_end_function: Function
    collectables: List<number>
    draw_function: Function
}

type ListGraph = {
    adj: Array<List<number>>, // Lists may not be sorted
    size: number
};



const basic_graph: ListGraph = {
    adj: [
        list(1),
        list(2),
        list(3),
        list(4),
        list(0),

    ],
    size: 5
};

function list_graph_draw(ctx: CanvasRenderingContext2D, list_graph: ListGraph){

     //Draw lines
     for(let i=0; i<list_graph.size; i++){

        let inode: iNode= i_node_array[i];
        let adj_nodes = list_graph.adj[i];

        for_each((adj_index)=>{

            let out_node=i_node_array[adj_index];

            ctx.beginPath(); 
            ctx.moveTo(inode.x, inode.y); // Start on node
            ctx.lineTo(out_node.x, out_node.y); // End on adj
            ctx.stroke(); // Render the line

        },adj_nodes)

    }

    //Draw Nodes
    for(let i=0; i<i_node_array.length; i++){
        let inode: iNode= i_node_array[i]
        ctx.beginPath();
        ctx.arc(inode.x, inode.y, 20, 0, 2 * Math.PI);
        ctx.stroke(); // Render the line
    }

   

}




function check_kords(x: number, y: number){
    for(let node of i_node_array){
        let dx = x - node.x;
        let dy = y - node.y;

        // console.log(Math.sqrt(dx) + Math.sqrt(dy))
        if(Math.sqrt(dx) + Math.sqrt(dy) <= Math.sqrt(20)){
            console.log("hej");

        }
        // else{console.log("hej")};
    }
}
const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

const ctx = canvas!.getContext("2d");


window.addEventListener('click', function(e){
    
    check_kords(e.x, e.y);
    

})

function draw(): void {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        //ctx.fillStyle = "rgb(200, 0, 0)";
       // ctx.fillRect(10, 10, 500, 50);

        list_graph_draw(ctx, basic_graph);
    }
}

draw()