
import { iNode } from './types.js';

export function get_clicked_node_index(nodes: Array<iNode>, x: number, y: number): number | undefined{
    for (let node of nodes){
        let dx = (x - node.x) ** 2;
        let dy = (y - node.y) ** 2;
        if(dx + dy <= 20**2){
            return node.index;
        }
    }
    return undefined;
}