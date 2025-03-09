import { shop_item_block_click_on } from "./click.js";
import { construct_dagger, construct_level_1_trap, construct_rectangle, construct_ring, construct_shop_item_block, test_trap_constructor } from "./contructors.js";
import { GameState } from "./types.js";


/**
 * constructs the ring shop_item_block
 * @param game_state the state of the game
 */
export function construct_shop_block_item_block_ring(game_state: GameState){
    const ring_cost = 0;
    let ring_item_button = construct_rectangle("ring", 200, 500, 100, 100, "Free", shop_item_block_click_on)
    let ring_item_block = construct_shop_item_block(ring_cost, construct_ring(), ring_item_button);
    game_state.shop_item_blocks.push(ring_item_block);
}

/**
 * constructs the basic_trap_shop_item_block
 * @param game_state the state of the game
 * @param i the index in the shop menu that the item has
 */
export function construct_shop_block_item_block_test_trap(game_state: GameState, i: number){
    const test_trap_cost = 0;
    let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, "Free", shop_item_block_click_on);
    let test_shop_item_block = construct_shop_item_block(test_trap_cost, test_trap_constructor(), shop_item_button)
    game_state.shop_item_blocks.push(test_shop_item_block);
}

/**
 * constructs the lvl_1_trap_shop_item_block
 * @param game_state the state of the game
 * @param i the index in the shop menu that the item has
 */
export function construct_shop_block_item_block_lvl_1_trap(game_state: GameState, i: number){
    const lvl_1_trap_cost = 5;
    let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, lvl_1_trap_cost.toString(), shop_item_block_click_on)
    let test_shop_item_block = construct_shop_item_block(lvl_1_trap_cost, construct_level_1_trap(), shop_item_button)
    game_state.shop_item_blocks.push(test_shop_item_block);
}

/**
 * constructs the dagger_shop_item_block
 * @param game_state the state of the game
 * @param i the index that the item has in the shop menu
 */
export function construct_shop_block_item_block_dagger(game_state: GameState, i: number){
    const dagger_cost = 2;
    let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, dagger_cost.toString(), shop_item_block_click_on)
    let test_shop_item_block = construct_shop_item_block(dagger_cost, construct_dagger(), shop_item_button)
    game_state.shop_item_blocks.push(test_shop_item_block);
}