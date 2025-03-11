import { game_draw, draw_game_over_screen } from "./test_coverage_ignore/draw.js";
import { draw_shop_gui } from "./test_coverage_ignore/draw.js";
import { draw_win_screen } from "./test_coverage_ignore/draw.js";
//The screen that shows the game
export let game_screen = {
    id: "game_screen",
    draw_function: game_draw
};
//The screen that shows the shop
export let shop_screen = {
    id: "shop_screen",
    draw_function: draw_shop_gui
};
//The screen that shows when the players loses
export let game_over_screen = {
    id: "game_over_screen",
    draw_function: draw_game_over_screen
};
//The screen that shows when the player wins
export let win_screen = {
    id: "win_screen",
    draw_function: draw_win_screen
};
