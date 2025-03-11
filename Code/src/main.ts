import { is_adj_node } from './adj_nodes';
import { clicked_on_node, get_clicked_node_index, mouse_in_rectangle} from './click';
import {draw} from './test_coverage_ignore/draw';
import { get_base_game_state, } from './setup_game_state';


let game_state=get_base_game_state()
console.log("hejj")
clicked_on_node(game_state, game_state.current_node);

// A event listner that checks wether the player clicked with the mouse
addEventListener('click', function(e){
    if(!game_state.game_over){
    console.log(game_state.selected_object);
    const x: number = e.offsetX;
    const y: number = e.offsetY;
    let i = 0;
    let node_index = get_clicked_node_index(game_state.i_node_array, x, y);
    // Checks if the player clicked on a adjescent node
    if(node_index !== undefined && is_adj_node(game_state, node_index) && game_state.active_screens.length < 2){
        clicked_on_node(game_state, node_index);
    }
    //Checks if the player clicked on a button
    for(let button of game_state.gui_rectangles){
        if(mouse_in_rectangle(x, y, button.x, button.y, button.width + button.x, button.height + button.y)){
            button.click_on_function(game_state);
        }
    }
    //Checks if the player cklicked on a shop_item
    for(let shop_item_block of game_state.shop_item_blocks){
        if(mouse_in_rectangle(x, y, shop_item_block.block.x, shop_item_block.block.y, shop_item_block.block.width + 
            shop_item_block.block.x, shop_item_block.block.height + shop_item_block.block.y)){
                shop_item_block.block.click_on_function(game_state, shop_item_block, i);  
        }
        i ++}
    //Checks if the player clicked on a inventory item
    for (let game_object of game_state.player_inventory){
        if(game_object !== undefined){
        let x_1 = game_object.box.x;
        let y_1 = game_object.box.y;
        let x_2 = game_object.box.width;
        let y_2 = game_object.box.height
        if(mouse_in_rectangle(x, y, x_1, y_1, x_2 + x_1, y_2 + y_1)){
            game_object.box.click_on_function(game_state, i);
        }
        }
        i ++
    }
}
})
gameLoop()
//Runs the game loop
function gameLoop() {
    draw(game_state); 
    game_state.ticks+=1
    console.log(game_state.shop_item_blocks)
    requestAnimationFrame(gameLoop);
}

//A even listner that checks wether a player presses a specific key
addEventListener('keydown', function(e) {
    let i = 0;
    
    //Checks if the player presses any of the keys 1 - 9 to select a inventory item
    for (let game_object of game_state.player_inventory) {
            if (game_object !== undefined) {
                if (e.key === (i + 1).toString()) {
                    game_object.box.click_on_function(game_state, i);
                }
            }
        i++;
    }
    //Checks if the player presses a key that correlates to a button
    for (let button of game_state.gui_rectangles) {
        
        //Checks if the player presses "e" and if so it should collect a collectable
        if (button.id === "collect" && e.code === 'KeyE') {
            button.click_on_function(game_state);
        } 

        //Checks if the player presses "space" and if so it should place a item
        if (button.id === "place_object" && e.code === 'Space') {
            button.click_on_function(game_state);
        }
        
    }
})
