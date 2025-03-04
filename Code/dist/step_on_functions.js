import { in_inventory, remove_id_arrray } from "./id_array.js";
import { node_activate_round_end } from "./node_objects.js";
import { shop_screen } from "./screens.js";
import { construct_level_1_trap, construct_rectangle, construct_ring, construct_wolf, construct_beaver_icon_animations, construct_dagger } from "./contructors.js";
import { i_node_array, shop_index } from "./setup_game_state.js";
import { construct_shop_item_block, test_trap_constructor } from "./contructors.js";
import { shop_item_block_click_on, submit_beavers_click_on } from "./click.js";
import { play_music, stop_music } from "./music.js";
import { check_quota } from "./round_end_functions.js";
import { create_daughter_node } from "./generate_x_y.js";
// import { create_daughter_node } from "./generate_x_y.js";
function construct_shop_return_to_game_button(game_state, node) {
    return construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", () => {
        for (let inventory_item of game_state.player_inventory) {
            if ((inventory_item === null || inventory_item === void 0 ? void 0 : inventory_item.node_object.type) === 2) {
                // win_screen.draw_function(ctx, game_state)
                // draw_daughter(game_state, ctx!)
                // game_state.game_over = true
                create_daughter_node(game_state.map_graph, game_state.i_node_array, shop_index, game_state);
            }
        }
        //Chance to add wolf on each empty node
        for (let i = 0; i < game_state.i_node_array.length; i++) {
            if (game_state.i_node_array[i].nodeObjects.length < 1) {
                if (Math.random() < 0.1) {
                    game_state.i_node_array[i].nodeObjects.push(construct_wolf(1));
                }
            }
        }
        if (!check_quota(game_state)) {
            stop_music(game_state.songs[0]);
            play_music(game_state.songs[1]);
            for (let i = 0; i < game_state.active_screens.length; i++)
                if (game_state.active_screens[i] === "shop_screen") {
                    {
                        // stop_music(game_state.songs[0])
                        // play_music(game_state.songs[1])
                        for (let i = 0; i < game_state.active_screens.length; i++) {
                            if (game_state.active_screens[i] === "shop_screen") {
                                game_state.active_screens.splice(i, 1);
                            }
                            remove_id_arrray("return_to_game", game_state.gui_rectangles);
                            remove_id_arrray("submit_beavers", game_state.gui_rectangles);
                            game_state.shop_item_blocks = [];
                        }
                    }
                }
        }
        else {
            game_state.not_win = true;
            play_music(game_state.songs[2]);
        }
    });
}
export function shop_step_on(game_state, node) {
    // Empty the shop
    game_state.shop_item_blocks = [];
    //Increase round
    game_state.round = game_state.round + 1;
    let submit_beavers_button = construct_rectangle("submit_beavers", 200, 700, 200, 100, "submit beavers", submit_beavers_click_on);
    game_state.gui_rectangles.push(submit_beavers_button);
    //Add active screen
    //Play music
    stop_music(game_state.songs[1]);
    play_music(game_state.songs[0]);
    function generate_shop_items() {
        const number_of_traps = 3;
        for (let i = 0; i < 3; i++) {
            const test_trap_cost = 0;
            const lvl_1_trap_cost = 5;
            const ring_cost = 0;
            const dagger_cost = 2;
            const random_factor = Math.floor(Math.random() * number_of_traps);
            console.log(random_factor);
            // generate items in the shop when you step on it
            if (game_state.game_rounds <= 1 && i === 0 && !in_inventory(game_state, 2)) {
                let ring_item_button = construct_rectangle("ring", 200, 500, 100, 100, "Free", shop_item_block_click_on);
                let ring_item_block = construct_shop_item_block(ring_cost, construct_ring(), ring_item_button);
                game_state.shop_item_blocks.push(ring_item_block);
                continue;
            }
            if (random_factor === 0) { // test trap
                let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, "Free", shop_item_block_click_on);
                let test_shop_item_block = construct_shop_item_block(test_trap_cost, test_trap_constructor(), shop_item_button);
                game_state.shop_item_blocks.push(test_shop_item_block);
            }
            if (random_factor === 1) { // level 1 trap
                let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, lvl_1_trap_cost.toString(), shop_item_block_click_on);
                let test_shop_item_block = construct_shop_item_block(lvl_1_trap_cost, construct_level_1_trap(), shop_item_button);
                game_state.shop_item_blocks.push(test_shop_item_block);
            }
            if (random_factor === 2) {
                let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, dagger_cost.toString(), shop_item_block_click_on);
                let test_shop_item_block = construct_shop_item_block(dagger_cost, construct_dagger(), shop_item_button);
                game_state.shop_item_blocks.push(test_shop_item_block);
            }
            // game_state.gui_rectangles.push(test_shop_item_block.button)
            //Add exit button
        }
    }
    generate_shop_items();
    game_state.gui_rectangles.push(construct_shop_return_to_game_button(game_state, node));
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
export function trap_step_on(game_state, node, node_objects) {
    game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 130, 50, "collect beavers", (game_state) => {
        game_state.player_collectables[0].count += node_objects.collectables[0].count;
        node_objects.collectables[0].count = 0;
    }));
}
export function wolf_step_on(game_state, node, node_object) {
    let i = 0;
    for (let inv_node_object of game_state.player_inventory) {
        if (inv_node_object !== undefined) {
            if (inv_node_object.node_object.type === 8) {
                game_state.player_inventory[i] = undefined;
                for (let j = 0; j < node.nodeObjects.length; j++) {
                    if (node.nodeObjects[j].type === 4) {
                        node.nodeObjects.splice(j, 1);
                    }
                }
                return;
            }
        }
        i += 1;
    }
    game_state.player_collectables[0].count -= node_object.collectables[0].count;
}
export function detective_step_on(game_state, node, node_objects) {
    game_state.player_collectables[0].count -= node_objects.collectables[0].count;
    if (game_state.player_collectables[0].count <= 0) {
        game_state.player_collectables[0].count = 0;
    }
}
