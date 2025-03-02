import { list } from './lib/list.js';
<<<<<<< HEAD
import { construct_inode, construct_node_object, construct_rectangle, test_trap_constructor } from './contructors.js';
=======
import { construct_inode, construct_node_object, construct_rectangle } from './contructors.js';
>>>>>>> philip
import { shop_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';
import { construct_collectable } from './contructors.js';
import { shop_screen } from './screens.js';
import { game_screen } from './screens.js';
import { shop_step_on } from './step_on_functions.js';
import { place_object_click_on } from './click.js';
export const i_node_array = [];
export function get_base_game_state() {
    function random_shop_index(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    }
    const basic_graph = {
        adj: [
            //island 1
            list(1), //0
            list(2), //0
            list(3, 9), //0
            list(4), //0
            list(5), //0
            list(6), //0
            list(7, 1), //0
            list(8), //0
            list(9), //0
            list(10), //0
            list(0), //0
        ],
        size: 11
    };
    //skapa shop
    let shop = construct_node_object(0, shop_draw_function, shop_step_on, () => { });
<<<<<<< HEAD
    //Skapa spelplan
    for (let i = 0; i < basic_graph.size; i++) {
        if (i > 1) {
            construct_inode(i, [], 0, 0, i_node_array);
=======
    let shop_index = random_shop_index(0, basic_graph.size);
    console.log(shop_index);
    //Skapa spelplan
    for (let i = 0; i < basic_graph.size; i++) {
        if (i === shop_index) {
            construct_inode(i, [shop], 0, 0, i_node_array);
>>>>>>> philip
        }
        else {
            construct_inode(i, [], 0, 0, i_node_array);
        }
    }
    generate_x_y(i_node_array);
    //Setup collectables for player
    let start_collectables = [construct_collectable("beaver", 0), construct_collectable("rabbit", 0)];
    //Setup collectables quota
    let shop_start_collectables = [construct_collectable("beaver", 350)];
    //Create place object button
<<<<<<< HEAD
    let place_object_button = construct_rectangle("place_object", 1400, 100, 100, 100, "Place Object", place_object_click_on);
=======
    let place_object_button = construct_rectangle("place_object", 1700, 100, 150, 100, "Place Object", place_object_click_on);
>>>>>>> philip
    //Skapa shop item blocks
    let start_shop_item_blocks = [];
    //Skapa gamestate
    return { i_node_array: i_node_array,
        map_graph: basic_graph,
        current_node: undefined,
        round: 0,
        player_collectables: start_collectables,
        shop_collectables: shop_start_collectables,
        gui_rectangles: [place_object_button],
        screens: [game_screen, shop_screen],
        active_screens: [game_screen.id],
<<<<<<< HEAD
        player_inventory: [test_trap_constructor(), test_trap_constructor(), test_trap_constructor()],
=======
        player_inventory: [],
>>>>>>> philip
        shop_item_blocks: start_shop_item_blocks
    };
}
