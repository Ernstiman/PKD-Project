import * as AdjNodes from '../src/adj_nodes';
import * as Types from '../src/types';
import * as List from '../src/lib/list';
import * as Graph from '../src/lib/graphs';
import { construct_collectable, construct_dagger, construct_wolf, construct_inode, construct_level_1_trap, construct_node_object, test_trap_constructor, construct_ring, construct_inventory_items, construct_rectangle, construct_shop_item_block, construct_detective } from '../src/contructors';
import { dagger_draw_function, lvl_1_trap_draw_function, ring_draw_function, trap_draw_function } from '../src/draw_functions';
import { detective_step_on, trap_step_on, wolf_step_on } from '../src/step_on_functions';
import { lvl_1_trap_end, trap_round_end } from '../src/round_end_functions';
import { construct_shop_block_item_block_dagger } from '../src/shop_block_item_blocks';
import { find_id_arrray, in_inventory, remove_id_arrray } from '../src/id_array';
import { construct_shop_block_item_block_ring } from '../src/shop_block_item_blocks';
import { return_to_game_click_on_function, shop_item_block_click_on } from '../src/click';
import { i_node_array } from '../src/setup_game_state';
import { detective_walk, get_detective_nodes_indexes } from '../src/detective';
import { construct_shop_return_to_game_button } from '../src/step_on_functions';
import { step_on_node } from '../src/node_objects';
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
    


let game_state: Types.GameState={
            i_node_array: [], 
            map_graph: test_graph, 
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
            
    }

const mock_func = jest.fn();
// adj_nodes.ts tests
test('adj_nodes', () => {

    expect(AdjNodes.is_adj_node(game_state, 1)).toBe(true);
    expect(AdjNodes.is_adj_node(game_state, 2)).toBe(false);
});



// constuctors

test('constructors', () => {

    const test_box = construct_rectangle('test', 50, 50, 100, 100, "item", () => {});
    const inventory_trap = construct_level_1_trap();
    const test_dagger = construct_dagger();
    const expected_dagger = construct_node_object(8, dagger_draw_function, mock_func, mock_func, 1);
    const test_ring = construct_ring();
    const expected_ring = construct_node_object(2, ring_draw_function, mock_func, mock_func);
    const test_SBIB = construct_shop_item_block(5, test_dagger, test_box);
    const expected_SBIB = {cost: 5, node_object: test_dagger, block: test_box};


    expect(construct_collectable("beaver", 5)).toStrictEqual({name: "beaver", count: 5});
    expect(test_trap_constructor()).toStrictEqual(construct_node_object(0, trap_draw_function, trap_step_on, trap_round_end, 0.8));
    expect(construct_level_1_trap()).toStrictEqual(construct_node_object(0, lvl_1_trap_draw_function, trap_step_on, lvl_1_trap_end, 1));
    expect(JSON.stringify(test_dagger)).toEqual(JSON.stringify(expected_dagger));
    expect(JSON.stringify(test_ring)).toEqual(JSON.stringify(expected_ring));
    expect(construct_inventory_items(inventory_trap, test_box, 0)).toEqual({node_object: inventory_trap, box: test_box, index: 0});
    expect(JSON.stringify(test_SBIB)).toEqual(JSON.stringify(expected_SBIB));
})


test('id_arrays', () => {
    let my_rect = construct_rectangle("test_rectangle", 0, 0, 0, 0, "", () => {});
    let my_node_obj = construct_node_object(0, () => {}, () => {}, () => {}, 0);
    let my_inventory_item = construct_inventory_items(my_node_obj, my_rect, 0)
    game_state.gui_rectangles.push(my_rect)
    expect(find_id_arrray("test_rectangle", game_state.gui_rectangles)).toEqual(my_rect);
    remove_id_arrray("test_rectangle", game_state.gui_rectangles)
    expect(game_state.gui_rectangles).toEqual([]);
    game_state.player_inventory.push(my_inventory_item)
    expect(in_inventory(game_state,0 )).toEqual(true);

})

test('Shop_block_item_blocks', () => {
    let ring_rect = construct_rectangle("ring", 200, 500, 100, 100, "Free", shop_item_block_click_on)
    let test_ring = {cost: 0,node_object: construct_ring(),block: ring_rect}
    construct_shop_block_item_block_ring(game_state)
    expect(JSON.stringify(test_ring)).toEqual(JSON.stringify(game_state.shop_item_blocks[0]))
})

test('step on functions', () => {
    let button = construct_shop_return_to_game_button();
    let expected_button = construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", return_to_game_click_on_function);
    expect(button.toString()).toEqual(expected_button.toString());

    //wolf step on
    let my_i_node_array: Array<Types.iNode> = []
    construct_inode(0, [construct_wolf(1)], 0, 0, my_i_node_array);
    
    step_on_node(game_state, my_i_node_array[0]);
    wolf_step_on(game_state, my_i_node_array[0], construct_wolf(0));
    expect(game_state.player_collectables[0].count).toBe(99);

    construct_inode(1, [construct_detective(1)], 0, 0, my_i_node_array);
    step_on_node(game_state, my_i_node_array[1]);
    detective_step_on(game_state, my_i_node_array[1], construct_detective(0));
    detective_walk(game_state);
    expect(game_state.player_collectables[0].count).toBe(98);

})


