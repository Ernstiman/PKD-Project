/**
 * Removes a object with a specific id from a array
 * @param id The id of the object
 * @param arr The array from which the object is to be removed
 */
export function remove_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            arr.splice(i, 1);
        }
    }
}
/**
 * checks if a object with a specific id is inside a array
 * @template T the element within the array that will contain a record with the parameter id
 * @param id the id of the object
 * @param arr the arrray that we want to check
 * @returns T if the object is found, else undefined
 */
export function find_id_arrray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem.id === id) {
            return elem;
        }
    }
}
/**
 * Checks if a inventory item is in the players inventory
 * @param game_state The state of the game
 * @param id The id of the inventory item
 * @returns true if the item is found, else false
 */
export function in_inventory(game_state, id) {
    for (let inventory_item of game_state.player_inventory) {
        if ((inventory_item === null || inventory_item === void 0 ? void 0 : inventory_item.node_object.type) === id) {
            return true;
        }
    }
    return false;
}
