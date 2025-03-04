import { generate_x_y } from './generate_x_y.js';
import { construct_collectable } from './contructors.js';
import { shop_screen } from './screens.js';
import { game_screen } from './screens.js';
export const i_node_array = [];
export let quota_amount = 3;
export function get_base_game_state() {
    function random_shop_index(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    }
    const basic_graph = {
        adj: [],
        size: 0
    };
    let shop_index = Math.floor(Math.random() * basic_graph.size);
    generate_x_y(basic_graph, i_node_array, shop_index);
    //Setup collectables for player
    let start_collectables = [construct_collectable("beaver", 0), construct_collectable("rabbit", 0)];
    //Setup collectables quota
    let shop_start_collectables = [construct_collectable("beaver", quota_amount)];
    //Create place object button
    //Skapa shop item blocks
    let start_shop_item_blocks = [];
    //Create array of songs
    let songs = [new Audio("../soundtrack/The Merchant's Shop.mp3"), new Audio("../soundtrack/War.mp3"), new Audio("../soundtrack/ohShit.mp3")];
    let start_days_to_quota = 6;
    let player_inventory = [];
    //Skapa gamestate
    return { i_node_array: i_node_array,
        map_graph: basic_graph,
        current_node: shop_index,
        round: 0,
        player_collectables: start_collectables,
        shop_collectables: shop_start_collectables,
        gui_rectangles: [],
        screens: [game_screen, shop_screen],
        active_screens: [game_screen.id],
        player_inventory: player_inventory,
        shop_item_blocks: start_shop_item_blocks,
        songs: songs,
        days_to_quota: start_days_to_quota,
        quota_amount: quota_amount,
        selected_object: undefined
    };
}
