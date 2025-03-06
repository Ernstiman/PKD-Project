import { construct_beaver_icon_animations } from "./contructors.js";
export function trap_round_end(game_state, node_object, node) {
    if (Math.random() <= node_object.collection_rate) {
        console.log("BEAEAVER");
        construct_beaver_icon_animations(game_state, Math.random() * 500, 1000 + Math.random() * 200, node.x - 30, node.y - 30, node_object);
    }
}
export function check_quota(game_state) {
    game_state.days_to_quota -= 1;
    if (game_state.shop_collectables[0].count <= 0) {
        game_state.quota_amount = Math.floor(Math.pow(game_state.quota_amount, 1.5));
        game_state.shop_collectables[0].count = game_state.quota_amount;
        game_state.days_to_quota = 5;
        game_state.game_rounds -= 1;
    }
    if (game_state.days_to_quota === 0) {
        return true;
    }
    return false;
}
export function lvl_1_trap_end(game_state, node_object, node) {
    let day = game_state.round;
    //node_object.collectables[0].count += day;
    console.log("BEAEAVER");
    for (let i = 0; i < day; i++) {
        construct_beaver_icon_animations(game_state, Math.random() * 500, 1000 + Math.random() * 200, node.x - 30, node.y - 30, node_object);
    }
}
export function detective_end(game_state, node_object) {
}
export function wolf_end(game_state, node_object) {
<<<<<<< HEAD
    node_object.collectables[0].count += 0;
=======
    if (game_state.round % 2 === 0) {
        node_object.collectables[0].count += 1;
    }
>>>>>>> lindlund
}
