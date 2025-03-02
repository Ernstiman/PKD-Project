7;
export function trap_round_end(game_state, node_object) {
    if (Math.random() <= node_object.collection_rate) {
        node_object.collectables[0].count += 1;
    }
}
export function lvl_1_trap_end(game_state, node_object) {
    let x = node_object.collection_rate;
    let day = game_state.round;
    let y = 0;
    node_object.collectables[0].count += day;
}
