import { GameState, iNode } from "./types.js";
import { remove_id_arrray } from "./id_array.js";
import { node_activate_round_end } from "./node_objects.js";
import { construct_level_1_trap, construct_rectangle } from "./contructors.js";
import { shop_screen } from "./screens.js";
import { i_node_array } from "./setup_game_state.js";
import { NodeObject } from "./types.js";
import { construct_shop_item_block, test_trap_constructor } from "./contructors.js";
import { shop_item_block_click_on } from "./click.js";
import { play_music, stop_music } from "./music.js";



function construct_shop_return_to_game_button(game_state: GameState, node: iNode){
    return construct_rectangle("return_to_game", 800, 900, 300, 100, "Exit Shop", 
        () => {
        game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
        game_state.player_collectables[0].count = 0;
        // stop_music(game_state.songs[0])
        // play_music(game_state.songs[1])
        for(let i = 0; i < game_state.active_screens.length; i ++){
            if(game_state.active_screens[i] === "shop_screen"){
                game_state.active_screens.splice(i, 1);

            }
            remove_id_arrray("return_to_game", game_state.gui_rectangles);
            game_state.shop_item_blocks = [];
        }
        }
    )
}

export function shop_step_on(game_state: GameState, node: iNode){
        // Empty the shop
        game_state.shop_item_blocks = [];
        //Increase round
        game_state.round=game_state.round + 1
        //Add active screen
        
        //Play music
        // stop_music(game_state.songs[1])
        // play_music(game_state.songs[0])

        function generate_shop_items() {
            const number_of_traps = 2;
            for(let i = 0; i < 3; i ++){
                const test_trap_cost = 0;
                const lvl_1_trap_cost = 5;

                const random_factor = Math.floor(Math.random() * number_of_traps);
                console.log(random_factor);
                
                
                // generate items in the shop when you step on it

                if (random_factor === 0) { // test trap
                    let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, "Free", shop_item_block_click_on);
                    let test_shop_item_block = construct_shop_item_block(test_trap_cost, test_trap_constructor(), shop_item_button)
                    game_state.shop_item_blocks.push(test_shop_item_block);
                } 

                if (random_factor === 1) { // level 1 trap
                    let shop_item_button = construct_rectangle("shop_item_block", 200 * i + 200, 500, 100, 100, lvl_1_trap_cost.toString(), shop_item_block_click_on)
                    let test_shop_item_block = construct_shop_item_block(lvl_1_trap_cost, construct_level_1_trap(), shop_item_button)
                    game_state.shop_item_blocks.push(test_shop_item_block);
                }

                // game_state.gui_rectangles.push(test_shop_item_block.button)
                //Add exit button
            }   


       
          
        }
        generate_shop_items();
        game_state.gui_rectangles.push(construct_shop_return_to_game_button(game_state, node))       
        game_state.active_screens.push(shop_screen.id);
        
        //Activate round end for node objects
        for(let i=0; i<game_state.i_node_array.length; i++){
            node_activate_round_end(game_state, i_node_array[i])
        }

    }


export function trap_step_on(game_state: GameState,node: iNode, node_objects: NodeObject){
            game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 130, 50, "collect beavers",(game_state: GameState) => {
                game_state.player_collectables[0].count += node_objects.collectables[0].count;
                node_objects.collectables[0].count = 0;
                } ))

    }