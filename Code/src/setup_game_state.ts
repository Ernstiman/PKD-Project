import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { GameState, iNode,  NodeObject, Screen, ShopItemBlock} from './types.js';
import { construct_inode, construct_node_object, construct_rectangle, construct_shop_item_block, test_trap_constructor } from './contructors.js';
import { shop_draw_function, trap_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';
import { node_activate_round_end } from './node_objects.js';
import { construct_collectable } from './contructors.js';
import { draw, draw_shop_gui, game_draw } from './draw.js';
import { remove_id_arrray } from './id_array.js';
import { shop_screen } from './screens.js';
import { game_screen } from './screens.js';
import { shop_step_on, trap_step_on } from './step_on_functions.js';
import { trap_round_end } from './round_end_functions.js';
import { place_object_click_on, shop_item_block_click_on } from './click.js';

export const i_node_array: Array<iNode>=[];

export function get_base_game_state() : GameState{
    const basic_graph: ListGraph = {

        adj: [
            list(1),
            list(2,4),
            list(3),
            list(4),
            list(5),
            list(6),
            list(7, 2),
            list(0),

        ],
        size: 8
    };


    //skapa shop
    let shop = construct_node_object(0, shop_draw_function,  shop_step_on, ()=>{})

    //Skapa spelplan
    for (let i = 0; i < basic_graph.size; i++) {
        
        if (i > 1) {
            construct_inode(i,[], 0, 0, i_node_array);
        } else {
            if (i === 0) {
                construct_inode(i,[], 0, 0, i_node_array);
            }
            if (i === 1) {
                construct_inode(i,[shop], 0, 0, i_node_array);
            }

        }
        
    }


    generate_x_y(i_node_array);

    //Setup collectables for player
    let start_collectables=[construct_collectable("beaver",0), construct_collectable("rabbit",0)]
    //Setup collectables quota
    let shop_start_collectables=[construct_collectable("beaver",350)]
    
    //Create place object button
    let place_object_button=construct_rectangle("place_object", 1400, 100, 100, 100, "Place Object", place_object_click_on)

    let shop_item_button = construct_rectangle("shop_item_block", 500, 500, 100, 100, "Buy item", shop_item_block_click_on)

    let test_shop_item_block=construct_shop_item_block(5, test_trap_constructor(), 
    shop_item_button)

    //Skapa shop item blocks
    let start_shop_item_blocks: Array<ShopItemBlock> = [test_shop_item_block]

    //Skapa gamestate
    return {i_node_array: i_node_array, 
            map_graph: basic_graph, 
            current_node: undefined, 
            round: 0, 
            player_collectables: start_collectables, 
            shop_collectables: shop_start_collectables, 
            gui_rectangles: [place_object_button, shop_item_button], 
            screens: [game_screen, shop_screen], 
            active_screens: 
            [game_screen.id],
            player_inventory: [test_trap_constructor(), test_trap_constructor(), test_trap_constructor()],
            shop_item_blocks: start_shop_item_blocks
    }
}
