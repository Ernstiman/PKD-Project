import { is_adj_node } from './adj_nodes.js';
import { clicked_on_node, get_clicked_node_index, mouse_in_rectangle } from './click.js';
import { draw } from './draw.js';
import { get_base_game_state, } from './setup_game_state.js';
let game_state = get_base_game_state();
draw(game_state);
addEventListener('click', function (e) {
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
    for (let block of game_state.shop_item_blocks) {
        if (mouse_in_rectangle(x, y, block.block.x, block.block.y, block.block.width + block.block.x, block.block.height + block.block.y)) {
            block.block.click_on_function(game_state, block, i);
        }
    }
    draw(game_state);
});
