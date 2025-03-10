import { generate_x_y } from './graph_generation.js';
import { construct_collectable } from './contructors.js';
import { shop_screen } from './screens.js';
import { game_screen } from './screens.js';
export const i_node_array = [];
export let quota_amount = 3;
export const basic_graph = {
    adj: [],
    size: 0
};
export let shop_index = Math.floor(Math.random() * basic_graph.size);
/**
 * Creates the game_state
 * @returns A record that contains all the states of the game
 */
export function get_base_game_state() {
    function random_shop_index(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    }
    //generates the cordinates for the nodes on the map
    generate_x_y(basic_graph, i_node_array);
    //Setup collectables for player
    let start_collectables = [construct_collectable("beaver", 100), construct_collectable("rabbit", 0)];
    //Setup collectables quota
    let shop_start_collectables = [construct_collectable("beaver", quota_amount)];
    //Skapa shop item blocks
    let start_shop_item_blocks = [];
    //Create array of songs
    let songs = [new Audio("../soundtrack/The Merchant's Shop.mp3"), new Audio("../soundtrack/War.mp3"), new Audio("../soundtrack/ohShit.mp3"), new Audio("../soundtrack/love.mp3")];
    // How many days you will have to complete the quota
    let start_days_to_quota = 1;
    //The players inventory
    let player_inventory = [];
    // The amount of quotas you have to complete before you can buy the ring in the shop
    let game_rounds = 1;
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
        selected_object: undefined,
        game_rounds: game_rounds,
        game_over: false,
        icon_animations: [],
        ticks: 0,
        not_win: false
    };
}
