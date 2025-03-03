
import { GameState, iNode, ShopItemBlock } from './types.js';
import { remove_node_object } from './node_objects.js';
import { construct_node_object } from './contructors.js';
import { player_draw_function } from './draw_functions.js';
import { step_on_node } from './node_objects.js';
import { find_id_arrray, remove_id_arrray } from './id_array.js';
import { i_node_array } from './setup_game_state.js';


export function get_clicked_node_index(nodes: Array<iNode>, x: number, y: number): number | undefined{
    for (let node of nodes){
        let dx = (x - node.x) ** 2;
        let dy = (y - node.y) ** 2;
        if(dx + dy <= 40**2){
            return node.index;
        }
    }
    return undefined;
}

export function mouse_in_rectangle(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean{

    if (x>x1 && x<x2 && y>y1 &&y<y2){
        return true
    }
    return false
}

export function clicked_on_node(game_state: GameState, node_index: number ){
    for(let i = 0; i < game_state.i_node_array.length; i ++){
        let my_node: iNode = game_state.i_node_array[i];
        my_node.nodeObjects = remove_node_object(my_node.nodeObjects, 1);
        if(i === node_index){
            game_state.current_node = node_index;
            my_node.nodeObjects.push(construct_node_object(1, player_draw_function, ()=>{},  ()=>{}))
            remove_id_arrray("collect", game_state.gui_rectangles);
            step_on_node(game_state, my_node)
        }
    }
}

export function place_object_click_on(game_state: GameState){
    if (game_state.current_node!==undefined){
        if (game_state.player_inventory[0]!==undefined){
            //Om det inte finns något node object där man vill placera.
            if (i_node_array[game_state.current_node].nodeObjects.length<2){ 
                i_node_array[game_state.current_node].nodeObjects.push(game_state.player_inventory[0])
                game_state.player_inventory.splice(0,1)
            }
        }
    }
}
export function shop_item_block_click_on(game_state: GameState, self: ShopItemBlock,i: number){
    if (game_state.player_collectables[0].count >= self.cost) {
        game_state.player_inventory.push(self.node_object);
        game_state.player_collectables[0].count -= self.cost;
        game_state.shop_item_blocks.splice(i,1)
    }

}