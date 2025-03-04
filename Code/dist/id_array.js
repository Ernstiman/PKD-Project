export function remove_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            arr.splice(i, 1);
        }
    }
}
export function find_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            return elem;
        }
    }
}
export function in_inventory(game_state, id) {
    for (let inventory_item of game_state.player_inventory) {
        if ((inventory_item === null || inventory_item === void 0 ? void 0 : inventory_item.node_object.type) === id) {
            return true;
        }
    }
    return false;
}
