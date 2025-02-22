import { for_each } from "./lib/list.js";
import { GameState, iNode } from "./types";

export function is_adj_node(game_state: GameState, new_node_index: number): boolean{
    let return_boolean = false;
    if(game_state.current_node === undefined){
        return true
    }

    for_each((adj_node) => {
        if(adj_node === new_node_index){
            return_boolean = true;
        }
    }, game_state.map_graph.adj[game_state.current_node]);

    return return_boolean;
}   