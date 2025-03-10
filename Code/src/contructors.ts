import {for_each, list, List} from './lib/list'; 
import { ListGraph } from './lib/graphs';
import { Collectable, GameState, GuiRectangle, IconAnimation, iNode,  InventoryNodeObject,  NodeObject, ShopItemBlock} from './types';
import { dagger_draw_function, detective_draw_function, lvl_1_trap_draw_function, trap_draw_function, wolf_draw_function } from './draw_functions';
import { detective_step_on, trap_step_on, wolf_step_on } from './step_on_functions';
import { ring_draw_function } from './draw_functions';
import { detective_end, lvl_1_trap_end, trap_round_end, wolf_end } from './round_end_functions';
import { play_music, stop_music } from './music';


/**
 * Constructs a collectable with a given name and count.
 * @param name - name of the collectable
 * @param count - how many we have
 * @returns 'Collectable' with specified properties.
 */
export function construct_collectable(name: string, count: number): Collectable{
    return {name: name, count: count}
}

/**
 * Creates an iNode with certain attributes and places it 
 * inside the 'i_node_array'
 * @param index - a positive integer. Places iNode at that index in the array.
 * @param node_objects - object on the node, for example: shop, trap, wolf etc.
 * @param x - x-coordinate to be placed at
 * @param y - y-coordinate to be placed at
 * @param i_node_array - array containing all iNodes
 */
export function construct_inode(index: number, node_objects: Array<NodeObject>, x: number, y: number, i_node_array: Array<iNode>) : void{
    i_node_array[index] = {index: index, nodeObjects: node_objects, x : x, y : y}
}

/**
 * Creates a new node object, for example a trap, wolf, shop etc.
 * @param type - An integer which specifies what object it is. 0 for traps, 4 for wolf etc.
 * @param draw_function - A specific function that draws the object onto the node.
 * @param player_step_on_function - A function that specifies what happens when we step on the object.
 * @param round_end_function - A function that specifies what happens when the round ends. 
 * @param collection_rate - Used for traps, how many beavers it gives per day.
 * @returns A 'NodeObject' containing specified properties. 
 */
export function construct_node_object(type: number, draw_function: Function, player_step_on_function: Function, round_end_function: Function, collection_rate: number = 1) : NodeObject{
    return {
        type: type,
        id: 0,
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [{name: "beaver", count: 0}],
        draw_function: draw_function,
        collection_rate: collection_rate,
        can_place: true
    }
}

/**
 * Builds a rectangle (button) on the screen with certain properties.
 * @param id - a name that lets us search for that specific button in the code.
 * @param x - x value on screen
 * @param y - y value on screen
 * @param width 
 * @param height 
 * @param text - text inside the rectangle.
 * @param click_on_function - function that specifies what happens when the user clicks the rectangle.
 * @returns 'GuiRectangle' with specified properties.
 */
export function construct_rectangle(id: string, x: number, y: number, width: number, height: number, text: string, click_on_function: Function): GuiRectangle{
    return {id, x, y, width, height, text, click_on_function}
}

/**
 * Uses 'construct_node_object' to build the Box Trap
 * @returns 'NodeObject' from 'construct_node_object' function with specified properties. 
 */
export function test_trap_constructor(): NodeObject {
    return construct_node_object(0, trap_draw_function, trap_step_on, trap_round_end, 0.8)
}

/**
 * Uses 'construct_node_object' to build the Beaver Magnet Trap
 * @returns 'NodeObject' from 'construct_node_object' function with specified properties. 
 */
export function construct_level_1_trap(): NodeObject {
    return construct_node_object(0, lvl_1_trap_draw_function, trap_step_on, lvl_1_trap_end, 1)
}

/**
 * Uses 'construct_node_object' to build Dagger items
 * @returns 'NodeObject' from 'construct_node_object' function with specified properties. 
 */
export function construct_dagger(): NodeObject {
    return construct_node_object(8, dagger_draw_function, ()=>{}, ()=>{}, 1)
}

/**
 * Uses 'construct_node_object' to build the Ring item
 * @returns 'NodeObject' from 'construct_node_object' function with specified properties. 
 */
export function construct_ring(): NodeObject {
    return construct_node_object(2, ring_draw_function, () => {}, () => {})
}

/**
 * Uses 'construct_node_object' to build a Wolf object
 * @param danger - how many Beavers the player will lose when stepping on a Wolf 
 * @returns 'NodeObject' with specified properties
 */
export function construct_wolf(danger: number): NodeObject {
    let wolf=construct_node_object(4, wolf_draw_function, wolf_step_on, wolf_end, 1)
    wolf.collectables[0].count = danger;
    return wolf
}

/**
 * Uses 'construct_node_object' to build a Detective object
 * @param danger - how many Beavers the player will lose when stepping on a Detective
 * @returns 'NodeObject' with specified properties
 */
export function construct_detective(danger: number): NodeObject {
    let detective=construct_node_object(10, detective_draw_function, detective_step_on, detective_end, 1)
    detective.collectables[0].count = danger;
    return detective}


/**
 * Similarly to the shop, we place the purchased items into 
 * inventory slots after they have been purchased
 * @param node_object - the purchased item
 * @param box - a rectangle that the item is placed inside
 * @param index - the index of the iventory slot
 * @returns 'InventoryNodeObject' 
 */
export function construct_inventory_items(node_object: NodeObject, box: GuiRectangle, index: number): InventoryNodeObject {
    return {node_object: node_object, box: box, index: index};
}

/**
 * Creates a purchaseable item in the shop with a cost and a rectangle to press.
 * @param cost - cost of the item
 * @param node_object - the item the shop sells.
 * @param block - the rectangle button
 * @returns 'ShopItemBlock' with specified properties.
 */
export function construct_shop_item_block(cost: number, node_object: NodeObject, block: GuiRectangle): ShopItemBlock {
    return {cost: cost, node_object: node_object, block: block}
}

/**
 * 
 * @param game_state - the current state of the game
 * @param start_x - x value where the beaver is created
 * @param start_y - y value where the beaver is created
 * @param target_x - x value that the beaver travels to
 * @param target_y - y value that the beaver travels to
 * @param target_node_object? - if a trap generates a beaver, some beavers will travel to that node instead of going off screen 
 */
export function construct_beaver_icon_animations(game_state: GameState, start_x: number, start_y: number, target_x: number, target_y: number, target_node_object?: NodeObject) : void{
    let image=new Image(20,20)
    image.src = "../img/Beaver.png";
   
    let fast_audio=new Audio("../soundtrack/Fast.mp3")

    if (Math.random()<0.1 && game_state.round!=1){
        image.src = "../img/Slow.png";
        game_state.icon_animations.push({spd_factor: 0, delay: 0, audio: fast_audio,x: start_x, y: start_y, 
            move_function: construct_beaver_move_function(), image: image, size: 120+Math.random()*10, 
            target_x: target_x, target_y: target_y, target_function: ()=>{if (target_node_object!=undefined) 
            {target_node_object.collectables[0].count+=1}}
        })
    }else{
        
        game_state.icon_animations.push({spd_factor: 1, delay: -1, audio: fast_audio, x: start_x, y: start_y, 
            move_function: construct_beaver_move_function(), image: image, size: 80+Math.random()*10, 
            target_x: target_x, target_y: target_y, target_function: ()=>{if (target_node_object!=undefined) 
            {target_node_object.collectables[0].count+=1}}
        })
    }
}


/**
 * Computes a path at which the flying beavers travels when the round ends.
 * @returns 'Function' that moves the beavers in the specified direction.
 */
export function construct_beaver_move_function(): Function {

    let spd_x = (Math.random()*2 + 2);
    let spd_y = (Math.random()*1 + 2);
    let wave_a = Math.random() * 1 + 0.4; // Random wave height
    let wave_f = Math.random() * 0.1 + 0.05; // Controls wavelength
    let time_to_spd=Math.random()*50+65
    return (game_state: GameState, self: IconAnimation, index: number) => {
        
        if (self.delay!=-1){
            self.delay+=1
            if (self.delay>100 && self.delay<105){
                self.spd_factor=1.3
            }
            if (self.delay>time_to_spd+100){
                play_music(self.audio)
                self.spd_factor=4
                self.delay=-1
                self.image.src = "../img/Fast.png";
            }
        }

        let move_x = spd_x;
        let move_y = -spd_y;

        // valid target
        if (self.target_x !== -1 && self.target_y !== -1) {
            let dx = self.target_x - self.x;
            let dy = self.target_y - self.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 10) { 
                move_x = (dx / dist) * spd_x * 1.5; 
                move_y = (dy / dist) * spd_y * 1.5;
            }else{
                self.target_function() // moves to specific target
                game_state.icon_animations.splice(index,1)
                stop_music(self.audio)
            }
        }
        if (self.y<10){
            game_state.icon_animations.splice(index,1)
            stop_music(self.audio)
        }
        // Apply movement + wave effect
        self.x += move_x * self.spd_factor;
        self.y += (move_y + Math.sin(game_state.ticks * wave_f + index) * wave_a) * self.spd_factor;
    };
    
}
