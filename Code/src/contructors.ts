import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { GameState, iNode,  NodeObject} from './types.js';

let global_node_object_id=0

export function get_node_object_id() : number{
    global_node_object_id = global_node_object_id+1;
    return global_node_object_id
}

export function construct_inode(index: number, node_objects: Array<NodeObject>, x: number, y: number, i_node_array: Array<iNode>) : void{
    i_node_array.push({index: index, nodeObjects: node_objects, x : x, y : y})
}

export function construct_node_object(type: number, draw_function: Function, player_step_on_function: Function, round_end_function: Function) : NodeObject{
    return {
        type: type,
        id: get_node_object_id(),
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [],
        draw_function: draw_function,
        
    }
}