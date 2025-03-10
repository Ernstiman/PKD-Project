import * as AdjNodes from '../src/adj_nodes';
import * as Types from '../src/types';
import * as List from '../src/lib/list';
import * as Graph from '../src/lib/graphs';
import { construct_collectable, construct_inventory_items, construct_node_object, construct_rectangle, construct_ring } from '../src/contructors';
import { find_id_arrray, in_inventory, remove_id_arrray } from '../src/id_array';
import { construct_shop_block_item_block_ring } from '../src/shop_block_item_blocks';
import { shop_item_block_click_on } from '../src/click';

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


let game_state: Types.GameState={i_node_array: [], 
            map_graph: basic_graph, 
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

let test_graph: Graph.ListGraph  = {
    adj: [
        List.list(1),
        List.list(2),
        List.list(0),
    ],
    size: 3
}



// adj_nodes.ts tests

test('test', () => {

    //expect(AdjNodes.is_adj_node(game_state, 1)).toBe(true);
    //expect(AdjNodes.is_adj_node(game_state, 2)).toBe(false);
});

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
    expect(test_ring.toString()).toEqual(game_state.shop_item_blocks[0].toString())
})

