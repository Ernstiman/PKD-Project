 import { Screen } from "./types.js"
 import { game_draw } from "./draw.js"
 import { draw_shop_gui } from "./draw.js"

 export let game_screen: Screen = {
        id: "game_screen",
        draw_function: game_draw
    }

    export let shop_screen: Screen = {
        id: "shop_screen",
        draw_function: draw_shop_gui 
    }