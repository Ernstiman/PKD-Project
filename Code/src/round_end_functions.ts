
import { GameState } from "./types.js";
import { NodeObject } from "./types.js";
import { quota_amount } from "./setup_game_state.js";



export function trap_round_end(game_state: GameState, node_object: NodeObject){
    if (Math.random() <= node_object.collection_rate){
        node_object.collectables[0].count += 1;
    }
}

export function check_quota(game_state: GameState): boolean{
    game_state.days_to_quota -= 1;
    if(game_state.shop_collectables[0].count <= 0){
        game_state.quota_amount =  Math.floor(game_state.quota_amount**1.5)
        game_state.shop_collectables[0].count = game_state.quota_amount;
        game_state.days_to_quota = 5 
    }
    if(game_state.days_to_quota === 0){
        return true
    }
    
    return false
}
export function lvl_1_trap_end(game_state: GameState, node_object: NodeObject) {
    let x = node_object.collection_rate;
    let day = game_state.round;
    let y = 0;
    
    node_object.collectables[0].count += day;
    

}
