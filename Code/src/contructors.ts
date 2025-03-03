import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { Collectable, GameState, GuiRectangle, iNode,  NodeObject, ShopItemBlock} from './types.js';
import { lvl_1_trap_draw_function, trap_draw_function } from './draw_functions.js';
import { trap_step_on } from './step_on_functions.js';
import { lvl_1_trap_end, trap_round_end } from './round_end_functions.js';


let global_node_object_id=0

export function get_node_object_id() : number{
    global_node_object_id = global_node_object_id+1;
    return global_node_object_id
}

export function construct_inode(index: number, node_objects: Array<NodeObject>, x: number, y: number, i_node_array: Array<iNode>) : void{
    i_node_array.push({index: index, nodeObjects: node_objects, x : x, y : y})
}

export function construct_node_object(type: number, draw_function: Function, player_step_on_function: Function, round_end_function: Function, collection_rate: number = 1) : NodeObject{
    return {
        type: type,
        id: get_node_object_id(),
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [{name: "beaver", count: 0}],
        draw_function: draw_function,
        collection_rate: collection_rate
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

export function construct_shop_item_block(cost: number, node_object: NodeObject, block: GuiRectangle): ShopItemBlock{
    return {cost: cost, node_object: node_object, block: block}
}