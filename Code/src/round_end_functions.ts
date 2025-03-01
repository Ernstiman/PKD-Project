
import { GameState } from "./types";7
import { NodeObject } from "./types";

export function trap_round_end(game_state: GameState, node_object: NodeObject){
    node_object.collectables[0].count+=1;
}