import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { GameState, iNode,  InventoryNodeObject,  NodeObject, Screen, ShopItemBlock} from './types.js';
import { construct_inode, construct_level_1_trap, construct_node_object, construct_rectangle, construct_shop_item_block, test_trap_constructor } from './contructors.js';
import { shop_draw_function, trap_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';
import { node_activate_round_end } from './node_objects.js';
import { construct_collectable } from './contructors.js';
import { draw, draw_shop_gui, game_draw } from './draw.js';
import { remove_id_arrray } from './id_array.js';
import { shop_screen, win_screen } from './screens.js';
import { game_screen } from './screens.js';
import { shop_step_on, trap_step_on } from './step_on_functions.js';
import { trap_round_end } from './round_end_functions.js';
import { place_object_click_on, shop_item_block_click_on, submit_beavers_click_on } from './click.js';
import { play_music } from './music.js';

export const i_node_array: Array<iNode>=[];
export let quota_amount: number = 3;

export const basic_graph: ListGraph = {

    adj: [],
    size: 0
}

export let shop_index = Math.floor(Math.random() * basic_graph.size)

export function get_base_game_state() : GameState{



    function random_shop_index(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    }

    
    generate_x_y(basic_graph, i_node_array, shop_index);

    //Setup collectables for player
    let start_collectables = [construct_collectable("beaver", 0), construct_collectable("rabbit", 0)]
    //Setup collectables quota
    
    let shop_start_collectables = [construct_collectable("beaver",quota_amount)]
    
    //Create place object button
    

    //Skapa shop item blocks
    let start_shop_item_blocks: Array<ShopItemBlock> = []

    //Create array of songs
    let songs=[new Audio("../soundtrack/The Merchant's Shop.mp3"), new Audio("../soundtrack/War.mp3"), new Audio("../soundtrack/ohShit.mp3"), new Audio("../soundtrack/love.mp3")]

    let start_days_to_quota = 6;

    let player_inventory: Array<InventoryNodeObject> = []

    let game_rounds = 5;

    //Skapa gamestate
    return {i_node_array: i_node_array, 
            map_graph: basic_graph, 
            current_node: shop_index, 
            round: 0, 
            player_collectables: start_collectables, 
            shop_collectables: shop_start_collectables, 
            gui_rectangles: [], 
            screens: [game_screen, shop_screen], 
            active_screens: 
            [game_screen.id],
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
            
    }
}


