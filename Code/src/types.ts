import { ListGraph } from './lib/graphs.js';
import { List } from './lib/list';

export type iNode = {
    index: number,
    nodeObjects: Array<NodeObject>
    x: number,
    y: number,
};
export type NodeObject = {

    type: number
    id: number
    player_step_on_function: Function
    round_end_function: Function
    collectables: Array<number>
    draw_function: Function

}
export type GameState = {
    i_node_array: Array<iNode>, 
    map_graph: ListGraph,

}