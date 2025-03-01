import { GameState, iNode } from "./types";
import { remove_id_arrray } from "./id_array";
import { node_activate_round_end } from "./node_objects";
import { construct_rectangle } from "./contructors";
import { shop_screen } from "./screens";
import { i_node_array } from "./setup_game_state";
import { NodeObject } from "./types";




function construct_shop_return_to_game_button(game_state: GameState, node: iNode){
    return construct_rectangle("return_to_game", 500, 500, 200, 200, "heh", 
        () => {
        game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
        game_state.player_collectables[0].count = 0;

        for(let i = 0; i < game_state.active_screens.length; i ++){
            if(game_state.active_screens[i] === "shop_screen"){
                game_state.active_screens.splice(i, 1);

            }
            remove_id_arrray("return_to_game", game_state.gui_rectangles);
        }
        }
    )
}

export function shop_step_on(game_state: GameState, node: iNode){
        //Increase round
        game_state.round=game_state.round + 1
        //Add active screen
        game_state.active_screens.push(shop_screen.id);
        //Add exit button
        game_state.gui_rectangles.push(construct_shop_return_to_game_button(game_state, node))
        //Activate round end for node objects
        for(let i=0; i<game_state.i_node_array.length; i++){
            node_activate_round_end(game_state, i_node_array[i])
        }

    }


export function trap_step_on(game_state: GameState,node: iNode, node_objects: NodeObject){
            game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 50, 50, "collect beavers",(game_state: GameState) => {
                game_state.player_collectables[0].count += node_objects.collectables[0].count;
                node_objects.collectables[0].count = 0;
                } ))

    }