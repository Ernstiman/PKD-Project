
import { construct_detective, construct_inode, construct_node_object, construct_wolf } from './contructors.js';
import { canvas } from './draw.js';
import { shop_draw_function, draw_daughter } from './draw_functions.js';
import { remove_id_arrray } from './id_array.js';
import { ListGraph } from './lib/graphs.js';
import { build_list, for_each, list, list_ref, map, length as list_length, pair, List, append } from './lib/list.js';
import { shop_step_on } from './step_on_functions.js';
import { GameState, iNode,  NodeObject} from './types.js';


/**
 * Creates a daughter node and a connection to it from the shop.
 * @param graph the graph to connect the new node to
 * @param i_node_array the array of iNodes to the graph
 * @param shop_index the index of the shop node in the iNode
 * @param game_state the current game state
*/
export function create_daughter_node(graph: ListGraph, i_node_array: Array<iNode>, shop_index: number, game_state: GameState) : void{
    graph.adj[graph.size] = list()

    construct_inode(graph.size, [construct_node_object(3, draw_daughter, () => {remove_id_arrray("place_object",game_state.gui_rectangles)},() => {}, 0,)], canvas!.width / 2, canvas!.height / 2,i_node_array);
    graph.size += 1;
    
    let new_list = append(graph.adj[shop_index], list(graph.size - 1));
    graph.adj[shop_index] = new_list;
}   


/**
 * Creates the connections for a node in the first layer of a circle step
 * @param circle_size the amount of steps in the circle being generated
 * @param node the index of the node to create connections for 
 * @param layer the layer in the circle being worked on
 * @param layers_per_circle_step_array the amount of layers in this circle step
 * @param circle_step the circle step we are on
 * @return a new list with the connections of the node
*/
function build_first_layer_connections(circle_size: number, node: number, layer: number, layers_per_circle_step_array: Array<number>, circle_step: number): List<number>{
    
    let xs: List<number>

    if (Math.random() < 0.5){
        //Connect to the first node at the next circle step and the next node
        xs=list(node + layers_per_circle_step_array[circle_step], node + 1)
    }else{
        //Connect to the next node
        xs=list(node + 1)
    }

    //We also have a chance to connect any node in the next circle step
    if (Math.random() < 0.4){
        xs=pair(node + layers_per_circle_step_array[circle_step] - layer + Math.floor(Math.random() * layers_per_circle_step_array[(circle_step + 1) % circle_size]), xs)
    }

    return xs
}


/**
 * Creates the connections for a node in the middle layer of a circle step
 * @param circle_size the amount of steps in the circle being generated
 * @param node the index of the node to create connections for 
 * @param layer the layer in the circle being worked on
 * @param layers_per_circle_step_array the amount of layers in this circle step
 * @param circle_step the circle step we are on
 * @return a new list with the connections of the node
*/
function build_middle_layer_connections(circle_size: number, node: number, layer: number, layers_per_circle_step_array: Array<number>, circle_step: number): List<number>{
    
    let xs: List<number> = list(node+1)
    
    let max_random_connections=2

    //A small chance to connect to any of the next circle steps node max_random_connections amount of times.
    for(let i=0; i < max_random_connections; i++){
        if (Math.random() < 0.1){
            xs = pair(node + layers_per_circle_step_array[circle_step] - layer + Math.min(Math.floor(layers_per_circle_step_array[(circle_step + 1) % circle_size]-1), layer), xs)
        }
    }

    return xs
}

/**
 * Creates the connections for a node in the last layer of a circle step
 * @param circle_size the amount of steps in the circle being generated
 * @param node the index of the node to create connections for 
 * @param layer the layer in the circle being worked on
 * @param layers_per_circle_step_array the amount of layers in this circle step
 * @param circle_step the circle step we are on
 * @return a new list with the connections of the node
*/
function build_last_layer_connections(circle_size: number, node: number, layer: number, layers_per_circle_step_array: Array<number>, circle_step: number): List<number>{
    
    let xs: List<number>

    if (Math.random() < 0.5){
        //Connect to the last node in the next circle step and the next node
        xs = list(node + layers_per_circle_step_array[circle_step] - layer + Math.floor(layers_per_circle_step_array[(circle_step + 1) % circle_size] - 1), node + 1)
    }else{
        //Connect to the next node
        xs = list(node + 1)
    }

    return xs
}

/**
 * Generates a random graph suited for gameplay and an array of iNode records. 
 * @precondition page is not empty
 * @param graph an empty list graph where the 
 * @param page the URL of the next page to visit
 * @return An updated browser history with 'page' as the current page and
 *     no forward pages stored.
*/
function build_connections(circle_size: number, layers: number, node: number, layer: number, circle_step: number, layers_per_circle_step_array: Array<number>) : List<number>{
    //The list of connections to be created
    let xs: List<number>

    //If we are in the first layer 
    if (layer===0){
        xs = build_first_layer_connections(circle_size, node, layer, layers_per_circle_step_array, circle_step)
    }
    //If we are in the last layer
    else if (layers_per_circle_step_array[circle_step] - 1 === layer){ 
        xs = build_last_layer_connections(circle_size, node, layer, layers_per_circle_step_array, circle_step)
    //If we are in any layer inbetween
    }else{
        xs = build_middle_layer_connections(circle_size, node, layer, layers_per_circle_step_array, circle_step)
    }

    return xs
    
}

/**
 * Generates an array filled with random integers
 * @precondition page is not empty
 * @param length the length of the array being created
 * @param max generates a number between 0 and max for each element
 * @return An array with random integers between 0 and max
*/
function generate_array_with_random_integers(length: number, max: number) : Array<number>{

    let arr = []

    for (let i = 0; i < length; i++) {
        arr[i] = Math.floor(1+Math.random()*(max))
    }

    return arr
}


function construct_node_on_circle_step_layer(layer: number, circle_size: number, circle_step: number, node: number, i_node_array: Array<iNode>) : void{

    //On the first node place a shop
    if (layer===0 && circle_step===0){
        construct_inode(node,[construct_node_object(99, shop_draw_function,  shop_step_on, ()=>{})], 0, 0, i_node_array);
    }else{
        //In about the middle of all the circle steps place a detective
        if (layer===0 && circle_step===Math.floor(circle_size/2)){
            construct_inode(node,[construct_detective(1)], 0, 0, i_node_array);
        }else{
        //In all other cases just create a normal node. 
            construct_inode(node,[], 0, 0, i_node_array);
        }
    }
}

/**
 * Generates a random graph suited for gameplay and an array of iNode records. 
 * Where each iNode has a calculated position and relevant start node objects.
 * The graph gets a list of each nodes adjecent nodes. 
 * @param graph The listgraph to add connections to
 * @param i_node_array The node array to add nodes to
 */

export function generate_x_y(graph: ListGraph, i_node_array: Array<iNode>) : void {

    //Settings for the generation
    const center_x = 1280 / 2 + 200;
    const center_y = 500;
    const radius = 220;
    const random_factor = 30;
    const circle_size= 10
    const layers= 3


    //The total amount of nodes added to the graph
    let nodes = 0

    //The amount of layers for each circle step
    const layers_per_circle_step_array = generate_array_with_random_integers(circle_size, layers)

    for (let circle_step = 0; circle_step < circle_size; circle_step++) {

        for(let layer=0; layer < layers_per_circle_step_array[circle_step]; layer++){

            //Construct the node of current layer of the circle step
            construct_node_on_circle_step_layer(layer, circle_size, circle_step, nodes, i_node_array)
            
            //Calculate the angle for the nodes on this circle step
            const angle = (2 * Math.PI * circle_step) / circle_size;

            //Calculate the x and y value of the node on the current circle step and layer.
            //The higher layers are further from the middle.
            //Each circle step has a position around the circle. 
            //There is also a random offset.
            i_node_array[nodes].x = center_x + ((radius+150*(layer)) * Math.cos(angle) + Math.floor(Math.random() * random_factor));
            i_node_array[nodes].y = center_y + ((radius+70*(layer)) * Math.sin(angle) + Math.floor(Math.random() * random_factor));

            //Build the connections for the current node being created
            let node_connections = build_connections(circle_size, layers, nodes, layer, circle_step, layers_per_circle_step_array)

            //Add the connections for this node to the list graph
            graph.adj.push(node_connections)

            //We have added one node
            nodes += 1
        }

    }

    //The size of the new graph is equal to the total amount of nodes added
    graph.size = nodes

    //If any connection goes past the size of the graph. We connect that node to the first node, which is also the shop node.
    //This could be replaced with % nodes to make a connection loop around if higher than the size of the graph.
    //But having it be 0 ensures that you have to walk trough the shop each loop. 
   
    for (let i = 0; i < graph.size; i++) {
        graph.adj[i] = map((index)=>{return (index<nodes) ? index : 0}, graph.adj[i])
    }

    //The last node should always connect to the shop node.
    graph.adj[nodes-1] = build_list((i)=>{return i}, 1)
}