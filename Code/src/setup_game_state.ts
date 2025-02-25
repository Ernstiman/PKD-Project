import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { GameState, iNode,  NodeObject, Screen} from './types.js';
import { construct_inode, construct_node_object, construct_rectangle, test_trap_constructor } from './contructors.js';
import { shop_draw_function, trap_draw_function } from './draw_functions.js';
import { generate_x_y } from './generate_x_y.js';
import { node_activate_round_end } from './node_objects.js';
import { construct_collectable } from './contructors.js';
import { draw, draw_shop_gui, game_draw } from './draw.js';
import { remove_id_arrray } from './click.js';

const i_node_array: Array<iNode>=[];
export function get_base_game_state() : GameState{
    const basic_graph: ListGraph = {

        adj: [
            list(1),
            list(2, 4),
            list(3, 1),
            list(4),
            list(5),
            list(6),
            list(7, 2),
            list(0),

        ],
        size: 8
    };

    let test_trap = construct_node_object(0, trap_draw_function, (game_state: GameState,node: iNode, node_objects: NodeObject)=>{
            game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 50, 50, "collect beavers",(game_state: GameState) => {
                game_state.player_collectables[0].count += node_objects.collectables[0].count;
                node_objects.collectables[0].count = 0;
                } ))

    }, (game_state: GameState, node_object: NodeObject)=>{
        node_object.collectables[0].count+=1;
        


    })
    
    let shop = construct_node_object(0, shop_draw_function,  (game_state: GameState, node: iNode)=>{ 
        game_state.round=game_state.round+1
        game_state.active_screens.push(shop_screen.id);
        game_state.gui_rectangles.push(construct_rectangle("return_to_game", 500, 500, 200, 200, "heh", () => {
            for(let i = 0; i < game_state.active_screens.length; i ++){
                if(game_state.active_screens[i] === "shop_screen"){
                    game_state.active_screens.splice(i, 1);
                }
                remove_id_arrray("return_to_game", game_state.gui_rectangles);
            }
            }))
        
        //alla noder istället
        //Loopa igenom alla


        for(let i=0; i<game_state.i_node_array.length; i++){
            node_activate_round_end(game_state, i_node_array[i])
        }
    }, ()=>{})

    for (let i = 0; i < basic_graph.size; i++) {
        
        if (i > 1) {
            construct_inode(i,[test_trap_constructor()], 0, 0, i_node_array);
        } else {
            if (i === 0) {
                construct_inode(i,[], 0, 0, i_node_array);
            }
            if (i === 1) {
                construct_inode(i,[shop], 0, 0, i_node_array);
            }

        }
        
    }

    let game_screen: Screen = {
        id: "game_screen",
        draw_function: game_draw
    }

    let shop_screen: Screen = {
        id: "shop_screen",
        draw_function: draw_shop_gui 
    }


    // construct_inode(0,[construct_node_object(0, trap_draw_function)],100,500, i_node_array)
    // construct_inode(1,[],300,500, i_node_array)
    // construct_inode(2,[],500,500, i_node_array)
    // construct_inode(3,[],700,500, i_node_array)
    // construct_inode(4,[],900,600, i_node_array)

    generate_x_y(i_node_array);
    let start_collectables=[construct_collectable("beaver",0), construct_collectable("rabbit",0)]
    

    return {i_node_array: i_node_array, map_graph: basic_graph, 
        current_node: undefined, round: 0, player_collectables: start_collectables, gui_rectangles: [], screens: [game_screen, shop_screen], active_screens: [game_screen.id]}
}

// module.exports = {i_node_array}