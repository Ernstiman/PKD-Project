import { remove_id_arrray } from "./id_array.js";
import { node_activate_round_end } from "./node_objects.js";
import { construct_rectangle } from "./contructors.js";
import { game_over_screen, shop_screen } from "./screens.js";
import { i_node_array } from "./setup_game_state.js";
import { construct_shop_item_block, test_trap_constructor } from "./contructors.js";
import { shop_item_block_click_on } from "./click.js";
import { play_music, stop_music } from "./music.js";
import { check_quota } from "./round_end_functions.js";
import { ctx } from "./draw.js";
function construct_shop_return_to_game_button(game_state, node) {
    return construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", () => {
        game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
        game_state.player_collectables[0].count = 0;
        if (!check_quota(game_state)) {
            stop_music(game_state.songs[0]);
            play_music(game_state.songs[1]);
            for (let i = 0; i < game_state.active_screens.length; i++)
                if (game_state.active_screens[i] === "shop_screen") {
                    {
                        game_state.active_screens.splice(i, 1);
                    }
                    remove_id_arrray("return_to_game", game_state.gui_rectangles);
                    game_state.shop_item_blocks = [];
                }
        }
        else {
            game_over_screen.draw_function(ctx, game_state);
        }
    });
}
export function shop_step_on(game_state, node) {
    // Empty the shop
    game_state.shop_item_blocks = [];
    //Increase round
    game_state.round = game_state.round + 1;
    //Add active screen
    //Play music
    stop_music(game_state.songs[1]);
    play_music(game_state.songs[0]);
    for (let i = 0; i < 3; i++) {
        let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, "Buy item", shop_item_block_click_on);
        let test_shop_item_block = construct_shop_item_block(5, test_trap_constructor(), shop_item_button);
        game_state.shop_item_blocks.push(test_shop_item_block);
        // game_state.gui_rectangles.push(test_shop_item_block.button)
        //Add exit button
    }
    game_state.gui_rectangles.push(construct_shop_return_to_game_button(game_state, node));
    game_state.active_screens.push(shop_screen.id);
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
