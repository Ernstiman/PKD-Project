import * as AdjNodes from '../src/adj_nodes';
import * as Types from '../src/types';
import * as List from '../src/lib/list';
import * as Graph from '../src/lib/graphs';
import { construct_collectable, construct_dagger, construct_wolf, construct_inode, construct_level_1_trap, construct_node_object, test_trap_constructor, construct_ring, construct_inventory_items, construct_rectangle, construct_shop_item_block, construct_detective } from '../src/contructors';
import { dagger_draw_function, lvl_1_trap_draw_function, ring_draw_function, trap_draw_function } from '../src/test_coverage_ignore/draw_functions';
import { detective_step_on, trap_step_on, wolf_step_on } from '../src/step_on_functions';
import { lvl_1_trap_end, trap_round_end } from '../src/round_end_functions';
import { construct_shop_block_item_block_dagger } from '../src/shop_block_item_blocks';
import { find_id_arrray, in_inventory, remove_id_arrray } from '../src/id_array';
import { construct_shop_block_item_block_ring } from '../src/shop_block_item_blocks';
import { return_to_game_click_on_function, shop_item_block_click_on } from '../src/click';
import { i_node_array } from '../src/setup_game_state';
import { detective_walk, get_detective_nodes_indexes } from '../src/detective';
import { construct_shop_return_to_game_button } from '../src/step_on_functions';
import { shop_draw_function} from '../src/test_coverage_ignore/draw_functions';
import { shop_step_on, } from '../src/step_on_functions';
import { construct_shop_block_item_block_test_trap, construct_shop_block_item_block_lvl_1_trap } from '../src/shop_block_item_blocks';
import {create_daughter_node, generate_x_y, construct_node_on_circle_step_layer, build_first_layer_connections, build_last_layer_connections, build_middle_layer_connections, build_connections, generate_array_with_random_integers} from '../src/graph_generation';
import { mouse_in_rectangle, clicked_on_node, place_object_click_on, inventory_item_click_on, submit_beavers_click_on } from '../src/click';
import { node_activate_round_end, remove_node_object, step_on_node } from '../src/node_objects';
import { play_music } from '../src/test_coverage_ignore/music';
import { check_quota, wolf_end } from '../src/round_end_functions';

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
    let shop_rect = construct_rectangle("shop_item_block", 200 * 0 + 200, 500, 100, 100, "Free", shop_item_block_click_on);
    let shop_rect_lvl1 = construct_rectangle("shop_item_block", 200 * 0 + 200, 500, 100, 100, "5", shop_item_block_click_on);
    let shop_rect_dagger = construct_rectangle("shop_item_block", 200 * 0 + 200, 500, 100, 100, "2", shop_item_block_click_on);
    let test_test_trap = {cost: 0, node_object: test_trap_constructor(),block: shop_rect}
    let test_lvl_1_trap = {cost: 5, node_object: construct_level_1_trap(), block: shop_rect_lvl1}
    let test_dagger = {cost: 2, node_object: construct_dagger(), block: shop_rect_dagger}

    
    
    construct_shop_block_item_block_ring(game_state)
    construct_shop_block_item_block_test_trap(game_state, 0)
    construct_shop_block_item_block_lvl_1_trap(game_state, 0);
    construct_shop_block_item_block_dagger(game_state, 0);

    expect(JSON.stringify(test_ring)).toBe(JSON.stringify(game_state.shop_item_blocks[0]));
    expect(JSON.stringify(test_test_trap)).toBe(JSON.stringify(game_state.shop_item_blocks[1]));
    expect(JSON.stringify(test_lvl_1_trap)).toBe(JSON.stringify(game_state.shop_item_blocks[2]));
    expect(JSON.stringify(test_dagger)).toBe(JSON.stringify(game_state.shop_item_blocks[3]));
})

test('node_objects', () => {
    let test_arr: Array<Types.iNode> = []
    let my_node_objs = [construct_node_object(0, () => {}, () => {}, () => {}, 0), construct_node_object(1, () => {}, () => {}, () => {}, 0)];
    let my_node_obj = construct_node_object(1, () => {}, (game_state: Types.GameState, node: Types.iNode, node_objects: Array<Types.NodeObject>) => {game_state.i_node_array.push(node)}, (game_state: Types.GameState, node_obj: Types.NodeObject, node: Types.iNode) => {game_state.i_node_array.pop()}, 0);
    construct_inode(0, [my_node_obj, my_node_obj, my_node_obj], 0,0, test_arr)
    step_on_node(game_state, test_arr[0])
    
    expect(game_state.i_node_array.length).toBe(3);
    node_activate_round_end(game_state, test_arr[0]);
    expect(game_state.i_node_array.length).toBe(0);   
    expect(remove_node_object(my_node_objs, 1).length).toBe(1);

})

test('click', () => {
   construct_inode(0, [construct_node_object(1, () => {}, () => {}, () => {}, 0)], 0, 0, game_state.i_node_array);
   //Tests the mouse in rectangle function
   expect(mouse_in_rectangle(0, 0, 0, 0, 100, 100)).toBe(true);
   expect(mouse_in_rectangle(0, 0, 100, 100, 200, 200)).toBe(false); 
    //Tests the clicked on node function
   clicked_on_node(game_state, 0);
   expect(game_state.current_node).toBe(0);

   //Tests the place object click on
   game_state.selected_object = construct_inventory_items(construct_level_1_trap(), construct_rectangle("lvl_1_trap", 0, 0, 0, 0, "", () => {}), 0);
   construct_inode(1, [], 0, 0, game_state.i_node_array);
   game_state.current_node = 1;
   place_object_click_on(game_state);
   expect(game_state.i_node_array[game_state.current_node].nodeObjects[0].type).toBe(0);

   //Tests shop item block click on
   let my_shop_block_item_block = construct_shop_item_block(0, construct_level_1_trap(), construct_rectangle("lvl_1_trap", 0, 0, 0, 0, "", () => {}));
   shop_item_block_click_on(game_state, my_shop_block_item_block, 0);
    expect(game_state.player_inventory[0]?.node_object.type).toBe(0);
    
    //Tests inventory item click on
    game_state.selected_object = construct_inventory_items(construct_ring(), construct_rectangle("ring", 0, 0, 0, 0, "", () => {}), 0);
    construct_inode(2, [construct_node_object(0, () => {}, () => {}, () => {}, 0)], 0, 0, game_state.i_node_array);
    let place_object_button = construct_rectangle("place_object", 1700, 100, 150, 100, "Place Object", place_object_click_on)
    inventory_item_click_on(game_state, 0);
    expect(find_id_arrray("place_object", game_state.gui_rectangles)).toEqual(place_object_button);

    //Tests submit beavers click on
    game_state.player_collectables[0].count = 10;
    game_state.shop_collectables[0].count = 5;
    submit_beavers_click_on(game_state);
    expect(game_state.shop_collectables[0].count).toBe(0);

    


})


test('step on functions', () => {
    let button = construct_shop_return_to_game_button();
    let expected_button = construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", return_to_game_click_on_function);
    expect(button.toString()).toEqual(expected_button.toString());

    //wolf step on
    let my_i_node_array: Array<Types.iNode> = []
    construct_inode(0, [construct_wolf(1)], 0, 0, my_i_node_array);
    // start_collectables = [construct_collectable("beaver", 100), construct_collectable("rabbit", 0)]
    step_on_node(game_state, my_i_node_array[0]);
    wolf_step_on(game_state, my_i_node_array[0], construct_wolf(0));
    expect(game_state.player_collectables[0].count).toBe(4);

    construct_inode(1, [construct_detective(1)], 0, 0, my_i_node_array);
    step_on_node(game_state, my_i_node_array[1]);
    detective_step_on(game_state, my_i_node_array[1], construct_detective(0));
    detective_walk(game_state);
    expect(game_state.player_collectables[0].count).toBe(3);

})

test('first layer connections should be 1, 2 or 3 in length', () => {

    let xs = build_first_layer_connections(3, 1, 0, [3, 3, 3], 1);

    if (xs != undefined) {
        expect(List.length(xs)>0 && List.length(xs)<4).toBe(true);
    }

});

test('middle layer connections should be 0, 1 or 2 in length', () => {

    let xs = build_middle_layer_connections(3, 1, 1, [3, 3, 3], 1);

    if (xs != undefined) {
        expect(List.length(xs)>=0 && List.length(xs)<3).toBe(true);
    }

});

test('last layer connections should be 1 or 2 in length', () => {

    let xs = build_last_layer_connections(3, 1, 2, [3, 3, 3], 1);
    console.log(xs)
    if (xs != undefined) {
        expect(List.length(xs)>0 && List.length(xs)<3).toBe(true);
    }

});

test('build connections', () => {
    
        let xs_first = build_connections(4, 3, 0, 1, 0, [3, 3, 3, 3]);
    
        if (xs_first != undefined) {
            expect(List.length(xs_first)>0 && List.length(xs_first)<4).toBe(true);
        }
        
        let xs_middle = build_connections(4, 1, 1, 1, 1, [3, 3, 3, 3]);
    
        if (xs_middle != undefined) {
            expect(List.length(xs_middle)>=0 && List.length(xs_middle)<3).toBe(true);
        }

        let xs_last = build_connections(4, 1, 2, 1, 1, [3, 3, 3, 3]);

        if (xs_last != undefined) {
            expect(List.length(xs_last)>0 && List.length(xs_last)<3).toBe(true);
        }

})

test('generate_array_with_random_integers generates numbers lower correctly', () => {

    let xs = generate_array_with_random_integers(3, 4);

    if (xs != undefined) {
        expect(xs.length).toBe(3);
        for (let x of xs) {
            expect(x).toBeLessThan(5);
        }
    }
})

test('construct_node_on_circle_step_layer first layer and circle step should give shop', () => {
    let my_i_node_array: Array<Types.iNode> = [];   
    construct_node_on_circle_step_layer(0, 3, 0, 0, my_i_node_array);  
    expect(JSON.stringify(my_i_node_array[0].nodeObjects)).toBe(JSON.stringify([construct_node_object(99, shop_draw_function,  shop_step_on, ()=>{})]));
})

//As there are 10 circle steps and 3 layers on each at max
test('generate_x_y should generate a graph with between 10 and 30 nodes', () => {
    let my_graph_map: Graph.ListGraph  = {
        adj: [],
        size: 0
    }
    
    let my_i_node_array: Array<Types.iNode> = []
    generate_x_y(my_graph_map, my_i_node_array);
    expect(my_i_node_array.length>9 && my_i_node_array.length<31).toBe(true);
})

test('create_daughter_node should create a inode with a daughter and add it to my i node array', () => {
    let my_i_node_array: Array<Types.iNode> = [];
    let my_graph_map: Graph.ListGraph = {
        adj: [
            List.list(1),
            List.list(2),
            List.list(3),
            List.list(0)
        ],
        size: 4
    }
    create_daughter_node(my_graph_map, my_i_node_array, 0, game_state);
    expect(my_i_node_array[4].x).toBe(150);
    expect(my_i_node_array[4].nodeObjects[0].type).toBe(3);
    expect(my_graph_map.size).toBe(5);
    
})

test('round_end', () => {
    game_state.shop_collectables[0].count = 1;
    game_state.days_to_quota = 1;
    expect(check_quota(game_state)).toBe(true);


    game_state.round = 2;
    let my_wolf = construct_wolf(1);
    wolf_end(game_state, my_wolf);
    expect(my_wolf.collectables[0].count).toBe(2);

})
