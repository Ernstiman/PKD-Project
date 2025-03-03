
import { GameState, iNode, InventoryNodeObject, ShopItemBlock } from './types.js';
import { remove_node_object } from './node_objects.js';
import { construct_inventory_items, construct_node_object, construct_rectangle } from './contructors.js';
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
                if(game_state.selected_object !== undefined){
                    i_node_array[game_state.current_node].nodeObjects.push(game_state.selected_object.node_object)
                    game_state.player_inventory[game_state.selected_object!.index] = undefined;
                    }
                    remove_id_arrray("place_object", game_state.gui_rectangles);
                    game_state.selected_object = undefined;
                    
            }
        }
    }
}
export function shop_item_block_click_on(game_state: GameState, self: ShopItemBlock,i: number){
    if (game_state.player_collectables[0].count >= self.cost) {
        let index = 0;
        for(let inventory_item of game_state.player_inventory){
            if(inventory_item === undefined){
                break
            }
            index ++
        }

        let new_inventory_item = construct_inventory_items(self.node_object, construct_rectangle("inventory_object", 550 + (index * 50) ,1000, 50, 50, "",inventory_item_click_on),
        index);
        game_state.player_inventory[index] = new_inventory_item;
        game_state.player_collectables[0].count -= self.cost;
        game_state.shop_item_blocks.splice(i,1)
    }

}

export function inventory_item_click_on(game_state: GameState, index: number){

    game_state.selected_object = game_state.player_inventory[index]
    let place_object_button = construct_rectangle("place_object", 1700, 100, 150, 100, "Place Object", place_object_click_on)
    if(!find_id_arrray("place_object", game_state.gui_rectangles))
        game_state.gui_rectangles.push(place_object_button);
}



export function submit_beavers_click_on(game_state: GameState){
    game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
    game_state.player_collectables[0].count = 0;

}
