import { GameState, iNode, NodeObject } from "./types.js";

export function remove_node_object(node_objects: Array<NodeObject>, type: number): Array<NodeObject>{
    const return_array: Array<NodeObject> = []
    for(let node_object of node_objects){
        if(node_object.type !== type){
            return_array.push(node_object)
        }
    }
    return return_array;
}

export function step_on_node(game_state: GameState, node: iNode){
    for(let i=0;i<node.nodeObjects.length;i++){
        node.nodeObjects[i].player_step_on_function(game_state, node, node.nodeObjects[i])
    }

}

export function node_activate_round_end(game_state: GameState, node: iNode){
    for(let i=0;i<node.nodeObjects.length;i++){
        node.nodeObjects[i].round_end_function(game_state, node.nodeObjects[i], node)
    }
}