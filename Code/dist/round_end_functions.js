7;
export function trap_round_end(game_state, node_object) {
    if (Math.random() <= node_object.collection_rate) {
        node_object.collectables[0].count += 1;
    }
}
