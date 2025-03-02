
import { GameState } from "./types.js";7
import { NodeObject } from "./types.js";

export function trap_round_end(game_state: GameState, node_object: NodeObject){
    if(Math.random() <= node_object.collection_rate){
        node_object.collectables[0].count += 1;
    }
}