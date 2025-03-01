import { is_adj_node } from './adj_nodes.js';
import { clicked_on_node, get_clicked_node_index, mouse_in_rectangle } from './click.js';
import { draw } from './draw.js';
import { get_base_game_state, } from './setup_game_state.js';
let game_state = get_base_game_state();
draw(game_state);
addEventListener('click', function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    let node_index = get_clicked_node_index(game_state.i_node_array, x, y);
    if (node_index !== undefined && is_adj_node(game_state, node_index)) {
        clicked_on_node(game_state, node_index);
    }
    for (let button of game_state.gui_rectangles) {
        if (mouse_in_rectangle(x, y, button.x, button.y, button.width + button.x, button.height + button.y)) {
            button.click_on_function(game_state);
        }
    }
    draw(game_state);
});
