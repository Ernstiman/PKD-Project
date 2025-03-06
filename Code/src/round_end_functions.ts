
import { GameState, iNode } from "./types.js";
import { NodeObject } from "./types.js";
import { quota_amount } from "./setup_game_state.js";
import { construct_beaver_icon_animations } from "./contructors.js";

/**
 * Handles the logic at the end of a round for a trap
 * @param game_state The state of the game
 * @param node_object The targeted node_object
 * @param node The node which the trap is on
 */
export function trap_round_end(game_state: GameState, node_object: NodeObject, node: iNode): void{
    if (Math.random() <= node_object.collection_rate){
        construct_beaver_icon_animations(game_state, Math.random()*500, 1000+Math.random()*200, node.x-30, node.y-30, node_object)
    }
}

/**
 * Checks if the quota is met
 * @param game_state The state of the game
 * @returns true if the player has failed to reach the quota in time, else false
 */
export function check_quota(game_state: GameState): boolean{
    game_state.days_to_quota -= 1;
    //If the player has reached the quota
    if(game_state.shop_collectables[0].count <= 0){
        //Updates the quota with the power of 1.5
        game_state.quota_amount =  Math.floor(game_state.quota_amount**1.5)
        //Updates to the new quota
        game_state.shop_collectables[0].count = game_state.quota_amount;
        game_state.days_to_quota = 5 
        game_state.game_rounds -= 1;
    }
    //If the player has not reached the quota in time
    if(game_state.days_to_quota === 0){
        return true
    }
    
    return false
}

/**
 * 
 * @param game_state 
 * @param node_object 
 * @param node 
 */
export function lvl_1_trap_end(game_state: GameState, node_object: NodeObject, node : iNode) {
    let day = game_state.round;

    //node_object.collectables[0].count += day;
    console.log("BEAEAVER")
    for(let i=0;i<day;i++){
        construct_beaver_icon_animations(game_state, Math.random()*500, 1000+Math.random()*200, node.x-30, node.y-30, node_object)
    }
}

export function detective_end(game_state: GameState, node_object: NodeObject) {

}

export function wolf_end(game_state: GameState, node_object: NodeObject) {
    if (game_state.round % 2 === 0) {
        node_object.collectables[0].count += 1;
    }
}
