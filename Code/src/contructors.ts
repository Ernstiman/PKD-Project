import {for_each, list, List} from './lib/list.js'; 
import { ListGraph } from './lib/graphs.js';
import { Collectable, GameState, GuiRectangle, iNode,  NodeObject} from './types.js';
import { trap_draw_function } from './draw_functions.js';


let global_node_object_id=0

export function get_node_object_id() : number{
    global_node_object_id = global_node_object_id+1;
    return global_node_object_id
}

export function construct_inode(index: number, node_objects: Array<NodeObject>, x: number, y: number, i_node_array: Array<iNode>) : void{
    i_node_array.push({index: index, nodeObjects: node_objects, x : x, y : y})
}

export function construct_node_object(type: number, draw_function: Function, player_step_on_function: Function, round_end_function: Function) : NodeObject{
    return {
        type: type,
        id: get_node_object_id(),
        player_step_on_function: player_step_on_function,
        round_end_function: round_end_function,
        collectables: [{name: "beaver", count: 0}],
        draw_function: draw_function,
    }
}
export function construct_collectable(name: string, count: number): Collectable{
    return {name: name, count: count}
}

export function construct_rectangle(id: string, x: number, y: number, width: number, height: number, text: string, click_on_function: Function): GuiRectangle{
    return {id, x, y, width, height, text, click_on_function}
}

export function test_trap_constructor(){
    return  construct_node_object(0, trap_draw_function, (game_state: GameState,node: iNode, node_objects: NodeObject)=>{
        game_state.gui_rectangles.push(construct_rectangle("collect", node.x + 50, node.y + 50, 50, 50, "collect beavers",(game_state: GameState) => {
            game_state.player_collectables[0].count += node_objects.collectables[0].count;
            node_objects.collectables[0].count = 0;
            } ))

}, (game_state: GameState, node_object: NodeObject)=>{
    node_object.collectables[0].count+=1;
    


})}