import * as AdjNodes from '../src/adj_nodes';
import * as Types from '../src/types';
import * as List from '../src/lib/list';
import * as Graph from '../src/lib/graphs';
import { construct_collectable, construct_dagger, construct_inode, construct_level_1_trap, construct_node_object, test_trap_constructor, construct_ring, construct_inventory_items, construct_rectangle, construct_shop_item_block } from '../src/contructors';
import { dagger_draw_function, lvl_1_trap_draw_function, ring_draw_function, trap_draw_function } from '../src/draw_functions';
import { trap_step_on } from '../src/step_on_functions';
import { lvl_1_trap_end, trap_round_end } from '../src/round_end_functions';
import { construct_shop_block_item_block_dagger } from '../src/shop_block_item_blocks';

export const basic_graph: Graph.ListGraph = {

    adj: [],
    size: 0
}

//Setup collectables for player
let start_collectables = [construct_collectable("beaver", 100), construct_collectable("rabbit", 0)]
//Setup collectables quota


let shop_start_collectables = [construct_collectable("beaver", 1)]

//Skapa shop item blocks
let start_shop_item_blocks: Array<Types.ShopItemBlock> = []

// How many days you will have to complete the quota
let start_days_to_quota = 6;

//The players inventory
let player_inventory: Array<Types.InventoryNodeObject> = []

// The amount of quotas you have to complete before you can buy the ring in the shop
let game_rounds = 1;


let test_graph: Graph.ListGraph  = {
        adj: [
            List.list(1),
            List.list(2),
            List.list(0),
        ],
        size: 3
    }
    

let game_state: Types.GameState={i_node_array: [], 
            map_graph: test_graph, 
            current_node: 0, 
            round: 0, 
            player_collectables: start_collectables, 
            shop_collectables: shop_start_collectables, 
            gui_rectangles: [], 
            screens: [], 
            active_screens: 
            [],
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
            
    }




// adj_nodes.ts tests
test('adj_nodes', () => {

    expect(AdjNodes.is_adj_node(game_state, 1)).toBe(true);
    expect(AdjNodes.is_adj_node(game_state, 2)).toBe(false);
});


// constuctors
const mock_func = jest.fn();

test('constructors', () => {

    const inventory_box = construct_rectangle('test', 50, 50, 100, 100, "item", () => {});
    const inventory_trap = construct_level_1_trap();
    const test_dagger = construct_dagger().toString();
    const expected_dagger = construct_node_object(8, dagger_draw_function, mock_func, mock_func, 1).toString();
    const test_ring = construct_node_object(2, ring_draw_function, mock_func, mock_func).toString();
    const expected_ring = construct_node_object(2, ring_draw_function, mock_func, mock_func).toString();
    
    expect(construct_collectable("beaver", 5)).toStrictEqual({name: "beaver", count: 5});
    expect(test_trap_constructor()).toStrictEqual(construct_node_object(0, trap_draw_function, trap_step_on, trap_round_end, 0.8));
    expect(construct_level_1_trap()).toStrictEqual(construct_node_object(0, lvl_1_trap_draw_function, trap_step_on, lvl_1_trap_end, 1));
    expect(test_dagger).toEqual(expected_dagger);
    expect(test_ring).toEqual(expected_ring);
    expect(construct_inventory_items(inventory_trap, inventory_box, 0)).toEqual({node_object: inventory_trap, box: inventory_box, index: 0});
    // expect(construct_shop_item_block())
})



