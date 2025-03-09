import { for_each } from "./lib/list.js";
import { GameState, iNode } from "./types.js";

/**
 * Check whether the node we click on is adjacent (walkable) to the node the 
 * player currently standing on.
 * @param game_state - the current state of the game.
 * @param new_node_index - the node we click on
 * @returns 'true' if 'new_node_index' is walkable, 'false' if it is not.
 */
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