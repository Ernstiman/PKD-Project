import { list_ref, length as list_length } from "./lib/list.js";
import { GameState, iNode } from "./types.js";



export function detective_walk(game_state: GameState){
    for(let i = game_state.i_node_array.length-1; i >= 0; i --){
        let my_node: iNode = game_state.i_node_array[i];
        for(let node_obj_i=0;node_obj_i<my_node.nodeObjects.length;node_obj_i++){
            if (my_node.nodeObjects[node_obj_i].type===10 && i!==game_state.current_node){
                //Get detective
                let detective=my_node.nodeObjects[node_obj_i]
                //Get where he can walk
                let walk_to_list=game_state.map_graph.adj[i]
                //Remove where he is now
                my_node.nodeObjects.splice(node_obj_i,1)
                //Walk to one of the nodes he can walk to
                let walk_to_index=list_ref(walk_to_list, Math.floor(list_length(walk_to_list)*Math.random()))
                if (walk_to_index!=undefined){
                    game_state.i_node_array[walk_to_index].nodeObjects.push(detective)
                }
                

            }
        }
    }
}

export function get_detective_nodes_indexes(game_state: GameState){

    let detective_nodes_indexes=[]

    for(let i = 0; i < game_state.i_node_array.length; i ++){
        let my_node: iNode = game_state.i_node_array[i];
        for(let node_obj_i=0;node_obj_i<my_node.nodeObjects.length;node_obj_i++){
            if (my_node.nodeObjects[node_obj_i].type===10){
                detective_nodes_indexes.push(i)
            }
        }
    }
    return detective_nodes_indexes
}