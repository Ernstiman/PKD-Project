import { is_adj_node } from './adj_nodes.js';
import { clicked_on_node, get_clicked_node_index, mouse_in_rectangle } from './click.js';
import { draw } from './draw.js';
import { get_base_game_state, } from './setup_game_state.js';
let game_state = get_base_game_state();
clicked_on_node(game_state, game_state.current_node);
draw(game_state);
addEventListener('click', function (e) {
    if (!game_state.game_over) {
        console.log(game_state.selected_object);
        const x = e.offsetX;
        const y = e.offsetY;
        let i = 0;
        let node_index = get_clicked_node_index(game_state.i_node_array, x, y);
        if (node_index !== undefined && is_adj_node(game_state, node_index) && game_state.active_screens.length < 2) {
            clicked_on_node(game_state, node_index);
        }
        for (let button of game_state.gui_rectangles) {
            if (mouse_in_rectangle(x, y, button.x, button.y, button.width + button.x, button.height + button.y)) {
                button.click_on_function(game_state);
            }
        }
        for (let shop_item_block of game_state.shop_item_blocks) {
            if (mouse_in_rectangle(x, y, shop_item_block.block.x, shop_item_block.block.y, shop_item_block.block.width + shop_item_block.block.x, shop_item_block.block.height + shop_item_block.block.y)) {
                shop_item_block.block.click_on_function(game_state, shop_item_block, i);
            }
            i++;
        }
        for (let game_object of game_state.player_inventory) {
            if (game_object !== undefined) {
                let x_1 = game_object.box.x;
                let y_1 = game_object.box.y;
                let x_2 = game_object.box.width;
                let y_2 = game_object.box.height;
                if (mouse_in_rectangle(x, y, x_1, y_1, x_2 + x_1, y_2 + y_1)) {
                    game_object.box.click_on_function(game_state, i);
                }
            }
            i++;
        }
        draw(game_state);
    }
});
