import { game_draw, draw_game_over_screen } from "./draw.js";
import { draw_shop_gui } from "./draw.js";
import { draw_win_screen } from "./draw.js";
export let game_screen = {
    id: "game_screen",
    draw_function: game_draw
};
export let shop_screen = {
    id: "shop_screen",
    draw_function: draw_shop_gui
};
export let game_over_screen = {
    id: "game_over_screen",
    draw_function: draw_game_over_screen
};
export let win_screen = {
    id: "win_screen",
    draw_function: draw_win_screen
};
