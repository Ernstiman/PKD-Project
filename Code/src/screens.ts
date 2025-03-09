 import { Screen } from "./types.js"
 import { game_draw, draw_game_over_screen } from "./draw.js"
 import { draw_shop_gui } from "./draw.js"
import { draw_win_screen } from "./draw.js"


//The screen that shows the game
 export let game_screen: Screen = {
        id: "game_screen",
        draw_function: game_draw
    }

//The screen that shows the shop
export let shop_screen: Screen = {
    id: "shop_screen",
    draw_function: draw_shop_gui 
}

//The screen that shows when the players loses
export let game_over_screen: Screen = {
    id: "game_over_screen",
    draw_function: draw_game_over_screen
}

//The screen that shows when the player wins
export let win_screen: Screen = {
    id: "win_screen",
    draw_function: draw_win_screen
}