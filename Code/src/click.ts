
import { GameState, iNode, InventoryNodeObject, ShopItemBlock } from './types';
import { remove_node_object } from './node_objects';
import { construct_inventory_items, construct_node_object, construct_rectangle, construct_wolf } from './contructors';
import { player_draw_function } from './test_coverage_ignore/draw_functions';
import { step_on_node } from './node_objects';
import { remove_id_arrray } from './id_array';
import { detective_walk } from './detective';
import { stop_music, play_music } from './test_coverage_ignore/music';
import { create_daughter_node } from './graph_generation';
import { shop_index } from './setup_game_state';
import { check_quota } from './round_end_functions';



/**
* Get the clicked on nodes index
* @param nodes the nodes on the map
* @param x the x cordinate where you clicked
* @param y the y cordinate where you clicked
* @returns if you clicked on a node on the map you will get the index
* of that node, else undefined
*/
export function get_clicked_node_index(nodes: Array<iNode>, x: number, y: number): number | undefined{
    for (let node of nodes){
        console.log(nodes)
        let dx = (x - node.x) ** 2;
        let dy = (y - node.y) ** 2;
        if(dx + dy <= 40**2){
            return node.index;
        }
    }
    return undefined;
}

/**
 * checks whether your mouse is within a gui_rectangle
 * @param x the x cordinate of the mouse
 * @param y the y codrinate of the mouse
 * @param x1 the x cordinate of rectangle
 * @param y1 the y cordiante of the rectangle
 * @param x2 the width of the rectangle
 * @param y2 the height of the rectangle
 * @returns true if your within the rectangle, else false
 */

export function mouse_in_rectangle(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean{
    if (x>=x1 && x<=x2 && y>=y1 &&y<=y2){
        return true
    }
    return false
}

/**
 * Moves the player when you click on the node
 * @param game_state the state of the game
 * @param node_index the index of the node that the player moves to
 */
export function clicked_on_node(game_state: GameState, node_index: number ): void{
    //moves the detective beaver
    detective_walk(game_state)
    for(let i = 0; i < game_state.i_node_array.length; i ++){
        let my_node: iNode = game_state.i_node_array[i];
        //Removes the player from the node before
        my_node.nodeObjects = remove_node_object(my_node.nodeObjects, 1);
        if(i === node_index){
            game_state.current_node = node_index;
            my_node.nodeObjects.push(construct_node_object(1, player_draw_function, ()=>{},  ()=>{}))
            remove_id_arrray("collect", game_state.gui_rectangles);
            step_on_node(game_state, my_node);
        }
    }
}

/**
 * Handles the logic for when you want to place a object
 * @param game_state the state of the game
 */

export function place_object_click_on(game_state: GameState): void{
            //If you give the ring to the love interest
            if(game_state.selected_object?.node_object.type === 2 && 
                game_state.i_node_array[game_state.current_node].nodeObjects[0].type === 3){
                game_state.game_over = true;
                for (let music of game_state.songs){
                    stop_music(music)
                }
                play_music(game_state.songs[3]);
            }
    //Checks wether the node already has a node_object on it
    if (game_state.i_node_array[game_state.current_node].nodeObjects.length<2){ 
        if(game_state.selected_object !== undefined){
            game_state.i_node_array[game_state.current_node].nodeObjects.push(game_state.selected_object.node_object)
            game_state.player_inventory[game_state.selected_object!.index] = undefined;
            }
        //removers the place_object button
        remove_id_arrray("place_object", game_state.gui_rectangles);
        game_state.selected_object = undefined;
            
    } else {
        //checks wehter there is a trap on the node that you want to place your object on
        for (let node_object of game_state.i_node_array[game_state.current_node].nodeObjects) {
            if (node_object.type === 0) {
                game_state.i_node_array[game_state.current_node].nodeObjects = [];
                if (game_state.selected_object !== undefined) {
                    //places the object and removes it from the players iventory
                    game_state.i_node_array[game_state.current_node].nodeObjects.push(game_state.selected_object.node_object)
                    game_state.player_inventory[game_state.selected_object!.index] = undefined;
                }
            }
        }
    }   
}

/**
 * Handles the logic when you clik on a item in the shop
 * @param game_state the state of the game
 * @param self the shop item_block that you clicked on
 * @param i the index that the shop_item_block has in game_state.shop_item_blocks
 */
export function shop_item_block_click_on(game_state: GameState, self: ShopItemBlock,i: number): void{
    let player_inventory_size: number = 4;
    //If the player can afford the item and has enough room in his inventory
    if (game_state.player_collectables[0].count >= self.cost && game_state.player_collectables.length <= player_inventory_size) {
        //Checks at what index in the player invetory the item can go
        let index = 0;
        for(let inventory_item of game_state.player_inventory){
            if(inventory_item === undefined){
                break
            }
            index ++
        }
        //Constructs the inventory_item and puts it in the player inventory
        let new_inventory_item = construct_inventory_items(self.node_object, construct_rectangle("inventory_object", 550 + (index * 50) ,1000, 50, 50, "",inventory_item_click_on),
        index);
        game_state.player_inventory[index] = new_inventory_item;
        game_state.player_collectables[0].count -= self.cost;
        game_state.shop_item_blocks.splice(i,1)
    }
}

/**
 * Handles the logic when you change inventory item
 * @param game_state The state of the game
 * @param index the index to the inventor item that you want to select in the inventory
 */
export function inventory_item_click_on(game_state: GameState, index: number): void{
    //Updates the selected_object
    game_state.selected_object = game_state.player_inventory[index]
    //Removes the existing place_object button gui_rectangles
    remove_id_arrray("place_object", game_state.gui_rectangles);
    //Constructs a new place_object button
    let place_object_button = construct_rectangle("place_object", 1700, 100, 150, 100, "Place Object", place_object_click_on)
    //Checks whether you are not with the love interest and does not hold the ring selected
    if(game_state.selected_object?.node_object.type === 0 && game_state.i_node_array[game_state.current_node].nodeObjects[0].type !== 3){
        game_state.gui_rectangles.push(place_object_button)};
    //Checks whether you are with the love interest and do have the ring selected
    if(game_state.selected_object?.node_object.type === 2 && game_state.i_node_array[game_state.current_node].nodeObjects[0].type === 3){
        game_state.gui_rectangles.push(place_object_button);}
}


//Submits the beavers and decreses the quota
export function submit_beavers_click_on(game_state: GameState): void{
    let current_shop = game_state.shop_collectables[0].count
    //Decreases the quota and the beavers the player has
    game_state.shop_collectables[0].count -= game_state.player_collectables[0].count;
    
    if(game_state.shop_collectables[0].count < 0){
        game_state.shop_collectables[0].count = 0;
    }
    game_state.player_collectables[0].count -= (current_shop - game_state.shop_collectables[0].count);
}

export function return_to_game_click_on_function(game_state: GameState): void{
    for (let inventory_item of game_state.player_inventory){
        if(inventory_item?.node_object.type === 2){
            create_daughter_node(game_state.map_graph, game_state.i_node_array, shop_index, game_state)
                }
            }
        if (game_state.round===1){
            game_state.i_node_array[9].nodeObjects.push(construct_wolf(1))
        }else{
            for(let i=0;i<game_state.i_node_array.length;i++){
                if (game_state.i_node_array[i].nodeObjects.length<1){
                    
                    if (Math.random()<0.02){
                        game_state.i_node_array[i].nodeObjects.push(construct_wolf(1))
                    }
                }
        }
    }
    if(!check_quota(game_state)){
        remove_shop_screen(game_state)
    }
    else{
        game_state.not_win = true;
        play_music(game_state.songs[2]); 
    }
        
}

/**
 * Rmoves the shop_screen
 * @param game_state the state of the game
 */
export function remove_shop_screen(game_state: GameState){
    stop_music(game_state.songs[0])
    play_music(game_state.songs[1])
    for(let i = 0; i < game_state.active_screens.length; i ++){
        if(game_state.active_screens[i] === "shop_screen"){
            for(let i = 0; i < game_state.active_screens.length; i ++){
                if(game_state.active_screens[i] === "shop_screen"){
                    game_state.active_screens.splice(i, 1);
                }
                remove_id_arrray("return_to_game", game_state.gui_rectangles);
                remove_id_arrray("submit_beavers", game_state.gui_rectangles)
                game_state.shop_item_blocks = [];
            }
        }
    }
}
