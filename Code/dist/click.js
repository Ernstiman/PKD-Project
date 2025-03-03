import { remove_node_object } from './node_objects.js';
import { construct_inventory_items, construct_node_object, construct_rectangle } from './contructors.js';
import { player_draw_function } from './draw_functions.js';
import { step_on_node } from './node_objects.js';
import { remove_id_arrray } from './id_array.js';
import { detective_walk } from './detective.js';
import { stop_music, play_music } from './music.js';
export function get_clicked_node_index(nodes, x, y) {
    for (let node of nodes) {
        console.log(nodes);
        let dx = Math.pow((x - node.x), 2);
        let dy = Math.pow((y - node.y), 2);
        if (dx + dy <= Math.pow(40, 2)) {
            return node.index;
        }
    }
    return undefined;
}
export function mouse_in_rectangle(x, y, x1, y1, x2, y2) {
    if (x > x1 && x < x2 && y > y1 && y < y2) {
        return true;
    }
    return false;
}
export function clicked_on_node(game_state, node_index) {
    detective_walk(game_state);
    for (let i = 0; i < game_state.i_node_array.length; i++) {
        let my_node = game_state.i_node_array[i];
        my_node.nodeObjects = remove_node_object(my_node.nodeObjects, 1);
        if (i === node_index) {
            game_state.current_node = node_index;
            my_node.nodeObjects.push(construct_node_object(1, player_draw_function, () => { }, () => { }));
            remove_id_arrray("collect", game_state.gui_rectangles);
            step_on_node(game_state, my_node);
        }
    }
}
export function place_object_click_on(game_state) {
    var _a;
    //Om det inte finns något node object där man vill placera.
    if (((_a = game_state.selected_object) === null || _a === void 0 ? void 0 : _a.node_object.type) === 2 && game_state.i_node_array[game_state.current_node].nodeObjects[0].type === 3) {
        game_state.game_over = true;
        for (let music of game_state.songs) {
            stop_music(music);
        }
        play_music(game_state.songs[3]);
    }
    //Om det inte finns något node object där man vill placera.
    if (game_state.i_node_array[game_state.current_node].nodeObjects.length < 2) {
        if (game_state.selected_object !== undefined) {
            game_state.i_node_array[game_state.current_node].nodeObjects.push(game_state.selected_object.node_object);
            game_state.player_inventory[game_state.selected_object.index] = undefined;
        }
        remove_id_arrray("place_object", game_state.gui_rectangles);
        game_state.selected_object = undefined;
    }
    else {
        for (let node_object of game_state.i_node_array[game_state.current_node].nodeObjects) {
            if (node_object.type === 0) {
                game_state.i_node_array[game_state.current_node].nodeObjects = [];
                if (game_state.selected_object !== undefined) {
                    game_state.i_node_array[game_state.current_node].nodeObjects.push(game_state.selected_object.node_object);
                    game_state.player_inventory[game_state.selected_object.index] = undefined;
                }
            }
        }
    }
}
export function shop_item_block_click_on(game_state, self, i) {
    if (game_state.player_collectables[0].count >= self.cost && game_state.player_collectables.length < 5) {
        let index = 0;
        for (let inventory_item of game_state.player_inventory) {
            if (inventory_item === undefined) {
                break;
            }
            index++;
        }
        let new_inventory_item = construct_inventory_items(self.node_object, construct_rectangle("inventory_object", 550 + (index * 50), 1000, 50, 50, "", inventory_item_click_on), index);
        game_state.player_inventory[index] = new_inventory_item;
        game_state.player_collectables[0].count -= self.cost;
        game_state.shop_item_blocks.splice(i, 1);
    }
}
export function inventory_item_click_on(game_state, index) {
    var _a, _b;
    game_state.selected_object = game_state.player_inventory[index];
    remove_id_arrray("place_object", game_state.gui_rectangles);
    let place_object_button = construct_rectangle("place_object", 1700, 100, 150, 100, "Place Object", place_object_click_on);
    if (((_a = game_state.selected_object) === null || _a === void 0 ? void 0 : _a.node_object.type) !== 2 && game_state.i_node_array[game_state.current_node].nodeObjects[0].type !== 3) {
        game_state.gui_rectangles.push(place_object_button);
    }
    ;
    if (((_b = game_state.selected_object) === null || _b === void 0 ? void 0 : _b.node_object.type) === 2 && game_state.i_node_array[game_state.current_node].nodeObjects[0].type === 3) {
        game_state.gui_rectangles.push(place_object_button);
    }
}
export function submit_beavers_click_on(game_state) {
    game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
    game_state.player_collectables[0].count = 0;
}
