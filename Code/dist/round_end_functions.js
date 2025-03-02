export function trap_round_end(game_state, node_object) {
    if (Math.random() <= node_object.collection_rate) {
        node_object.collectables[0].count += 1;
    }
}
<<<<<<< HEAD
export function check_quota(game_state) {
    game_state.days_to_quota -= 1;
    if (game_state.shop_collectables[0].count <= 0) {
        game_state.quota_amount = Math.floor(Math.pow(game_state.quota_amount, 1.5));
        game_state.shop_collectables[0].count = game_state.quota_amount;
        game_state.days_to_quota = 5;
    }
    if (game_state.days_to_quota === 0) {
        return true;
    }
    return false;
=======
export function lvl_1_trap_end(game_state, node_object) {
    let x = node_object.collection_rate;
    let day = game_state.round;
    let y = 0;
    node_object.collectables[0].count += day;
>>>>>>> philip
}
