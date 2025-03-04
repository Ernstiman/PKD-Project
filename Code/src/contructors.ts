import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { Collectable, GameState, GuiRectangle, IconAnimation, iNode,  NodeObject, ShopItemBlock} from './types.js';
import { dagger_draw_function, detective_draw_function, lvl_1_trap_draw_function, trap_draw_function, wolf_draw_function } from './draw_functions.js';
import { detective_step_on, trap_step_on, wolf_step_on } from './step_on_functions.js';
import { ring_draw_function } from './draw_functions.js';
import { detective_end, lvl_1_trap_end, trap_round_end, wolf_end } from './round_end_functions.js';



let global_node_object_id=0

export function get_node_object_id() : number{
    global_node_object_id = global_node_object_id+1;
    return global_node_object_id
}

export function construct_inode(index: number, node_objects: Array<NodeObject>, x: number, y: number, i_node_array: Array<iNode>) : void{
    i_node_array[index] = {index: index, nodeObjects: node_objects, x : x, y : y}
}

export function construct_node_object(type: number, draw_function: Function, player_step_on_function: Function, round_end_function: Function, collection_rate: number = 1) : NodeObject{
    return {
        type: type,
        id: get_node_object_id(),
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [{name: "beaver", count: 0}],
        draw_function: draw_function,
        collection_rate: collection_rate,
        can_place: true
    }
}
export function construct_collectable(name: string, count: number): Collectable{
    return {name: name, count: count}
}

export function construct_rectangle(id: string, x: number, y: number, width: number, height: number, text: string, click_on_function: Function): GuiRectangle{
    return {id, x, y, width, height, text, click_on_function}
}

export function test_trap_constructor(): NodeObject {
    return construct_node_object(0, trap_draw_function, trap_step_on, trap_round_end, 0.5)
}

export function construct_level_1_trap(): NodeObject {
    return construct_node_object(0, lvl_1_trap_draw_function, trap_step_on, lvl_1_trap_end, 1)
}
export function construct_dagger(): NodeObject {
    return construct_node_object(8, dagger_draw_function, ()=>{}, ()=>{}, 1)
}

export function construct_ring(): NodeObject {
    return construct_node_object(2, ring_draw_function, () => {}, () => {})
}

export function construct_shop_item_block(cost: number, node_object: NodeObject, block: GuiRectangle): ShopItemBlock{
    return {cost: cost, node_object: node_object, block: block}
}

export function construct_wolf(danger: number){
    let wolf=construct_node_object(4, wolf_draw_function, wolf_step_on, wolf_end, 1)
    wolf.collectables[0].count = danger;
    return wolf
}

export function construct_detective(danger: number){
    let detective=construct_node_object(10, detective_draw_function, detective_step_on, detective_end, 1)
    detective.collectables[0].count = danger;
    return detective}

export function construct_inventory_items(node_object: NodeObject, box: GuiRectangle, index: number){
    return {node_object: node_object, box: box, index: index};
}



export function construct_beaver_icon_animations(game_state: GameState, start_x: number, start_y: number, target_x: number, target_y: number, target_node_object: NodeObject | undefined) : void{
    let image=new Image(20,20)
    image.src = "../img/Beaver.png";
    
    game_state.icon_animations.push({x: start_x, y: start_y, 
        move_function: construct_beaver_move_function(), image: image, size: 80+Math.random()*10, 
        target_x: target_x, target_y: target_y, target_function: ()=>{if (target_node_object!=undefined) 
        {target_node_object.collectables[0].count+=1}}
    })
}

export function construct_beaver_move_function() {


    let spd_x = Math.random()*2 + 1;
    let spd_y = Math.random()*1 + 2;
    let wave_a = Math.random() * 1 + 0.4; // Random wave height
    let wave_f = Math.random() * 0.1 + 0.05; // Controls wavelength

    return (game_state: GameState, self: IconAnimation, index: number) => {
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
                self.target_function()
                game_state.icon_animations.splice(index,1)
            }
        }
        if (self.y<10){
            game_state.icon_animations.splice(index,1)
        }
        // Apply movement + wave effect
        self.x += move_x;
        self.y += move_y + Math.sin(game_state.ticks * wave_f + index) * wave_a;
    };
    
}
