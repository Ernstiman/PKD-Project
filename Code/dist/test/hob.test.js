import * as List from '../lib/list.js';
import { construct_collectable } from '../contructors.js';
export const basic_graph = {
    adj: [],
    size: 0
};
//Setup collectables for player
let start_collectables = [construct_collectable("beaver", 100), construct_collectable("rabbit", 0)];
//Setup collectables quota
let shop_start_collectables = [construct_collectable("beaver", 1)];
//Skapa shop item blocks
let start_shop_item_blocks = [];
// How many days you will have to complete the quota
let start_days_to_quota = 6;
//The players inventory
let player_inventory = [];
// The amount of quotas you have to complete before you can buy the ring in the shop
let game_rounds = 1;
let game_state = { i_node_array: [],
    map_graph: basic_graph,
    current_node: 0,
    round: 0,
    player_collectables: start_collectables,
    shop_collectables: shop_start_collectables,
    gui_rectangles: [],
    screens: [],
    active_screens: [],
    player_inventory: player_inventory,
    shop_item_blocks: start_shop_item_blocks,
    songs: [],
    days_to_quota: start_days_to_quota,
    quota_amount: 0,
    selected_object: undefined,
    game_rounds: game_rounds,
    game_over: false,
    icon_animations: [],
    ticks: 0,
    not_win: false
};
let test_graph = {
    adj: [
        List.list(1),
        List.list(2),
        List.list(0),
    ],
    size: 3
};
// adj_nodes.ts tests
test('test', () => {
    //expect(AdjNodes.is_adj_node(game_state, 1)).toBe(true);
    //expect(AdjNodes.is_adj_node(game_state, 2)).toBe(false);
});
