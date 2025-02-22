import { NodeObject } from "./types";

export function remove_node_object(node_objects: Array<NodeObject>, type: number): Array<NodeObject>{
    const return_array: Array<NodeObject> = []
    for(let node_object of node_objects){
        if(node_object.type !== type){
            return_array.push(node_object)
        }
    }
    return return_array;
}