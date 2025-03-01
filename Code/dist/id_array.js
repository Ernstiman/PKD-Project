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
