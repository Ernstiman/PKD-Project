 import { Screen } from "./types"
 import { game_draw } from "./draw"
 import { draw_shop_gui } from "./draw"
 
 export let game_screen: Screen = {
        id: "game_screen",
        draw_function: game_draw
    }

    export let shop_screen: Screen = {
        id: "shop_screen",
        draw_function: draw_shop_gui 
    }