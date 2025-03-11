import { in_inventory } from "./id_array.js";
import { node_activate_round_end } from "./node_objects.js";
import { shop_screen } from "./screens.js";
import { construct_rectangle, construct_beaver_icon_animations } from "./contructors.js";
import { i_node_array } from "./setup_game_state.js";
import { return_to_game_click_on_function, submit_beavers_click_on } from "./click.js";
import { play_music, stop_music } from "./test_coverage_ignore/music.js";
import { construct_shop_block_item_block_dagger, construct_shop_block_item_block_lvl_1_trap, construct_shop_block_item_block_ring, construct_shop_block_item_block_test_trap } from "./shop_block_item_blocks.js";
/**
 * Constructs the return to game button
 * @returns The return_to_game button
 */
export function construct_shop_return_to_game_button() {
    return construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", return_to_game_click_on_function);
}
/**
 * Generates the items in the shop
 * @param game_state The state of the game
 */
export function generate_shop_items(game_state) {
    const number_of_traps = 3;
    const number_of_shop_items = 8;
    for (let i = 0; i < number_of_shop_items; i++) {
        //Generates a random number that will correlate to a certain item
        const random_factor = Math.floor(Math.random() * number_of_traps);
        //constructs the ring_shop_item if you are on the last round and don't have
        //the ring in your inventory
        if (game_state.game_rounds <= 1 && i === 0 && !in_inventory(game_state, 2)) {
            construct_shop_block_item_block_ring(game_state);
            continue;
        }
        //constructs the test_trap
        if (random_factor === 0) { // test trap
            construct_shop_block_item_block_test_trap(game_state, i);
            continue;
        }
        //constructs the lvl_1_trap
        if (random_factor === 1) { // level 1 trap
            construct_shop_block_item_block_lvl_1_trap(game_state, i);
            continue;
        }
        //constructs the dagger
        if (random_factor === 2) {
            construct_shop_block_item_block_dagger(game_state, i);
            continue;
        }
    }
}
/**
 * Runs the logic for when you step on the shop
 * @param game_state the state of the game
 * @param node the node that the shop is on
 */
export function shop_step_on(game_state, node, node_object) {
    // Empty the shop
    console.log("hej");
    game_state.shop_item_blocks = [];
    //Increase round
    game_state.round = game_state.round + 1;
    let submit_beavers_button = construct_rectangle("submit_beavers", 200, 700, 200, 100, "submit beavers", submit_beavers_click_on);
    game_state.gui_rectangles.push(submit_beavers_button);
    //Add active screen
    //Play music
    stop_music(game_state.songs[1]);
    play_music(game_state.songs[0]);
    generate_shop_items(game_state);
    game_state.gui_rectangles.push(construct_shop_return_to_game_button());
    game_state.active_screens.push(shop_screen.id);
    //Create beaver animation
    for (let i = 0; i < 10; i++) {
        construct_beaver_icon_animations(game_state, Math.random() * 500, 1000 + Math.random() * 200, -1, -1, undefined);
    }
    //Activate round end for node objects
    for (let i = 0; i < game_state.i_node_array.length; i++) {
        node_activate_round_end(game_state, i_node_array[i]);
    }
}
/**
 * Runs the logic for when you step on a trap
 * @param game_state the state of the game
 * @param node the node that the trap is on
 * @param node_objects the node_objects on the node
 */
export function trap_step_on(game_state, node, node_objects) {
    game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 130, 50, "collect beavers", (game_state) => {
        game_state.player_collectables[0].count += node_objects.collectables[0].count;
        node_objects.collectables[0].count = 0;
    }));
}
/**
 * handles the logic for when you step on a wolf
 * @param game_state the state of the game
 * @param node the node that the wolf is on
 * @param node_object the node_objects on the node
 */
export function wolf_step_on(game_state, node, node_object) {
    let i = 0;
    //Checks if the player has a dagger in the inventory, and if so then it should remove the wolf from the node
    for (let inv_node_object of game_state.player_inventory) {
        if (inv_node_object !== undefined) {
            if (inv_node_object.node_object.type === 8) {
                game_state.player_inventory[i] = undefined;
                for (let j = 0; j < node.nodeObjects.length; j++) {
                    if (node.nodeObjects[j].type === 4) {
                        node.nodeObjects.splice(j, 1);
                    }
                }
                break;
            }
        }
        i += 1;
    }
    //Decreases the players beavers by the amount of collectables the wolf has
    game_state.player_collectables[0].count -= node_object.collectables[0].count;
    if (game_state.player_collectables[0].count < 0) {
        game_state.player_collectables[0].count = 0;
    }
}
/**
 * Handles the logic for when you step on the detective beaver
 * @param game_state the state of the game
 * @param node_objects the node_objects of the node
 */
export function detective_step_on(game_state, node, node_objects) {
    game_state.player_collectables[0].count -= node_objects.collectables[0].count;
    if (game_state.player_collectables[0].count <= 0) {
        game_state.player_collectables[0].count = 0;
    }
}
