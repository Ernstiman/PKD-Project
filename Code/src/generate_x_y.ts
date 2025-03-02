import { GameState, iNode,  NodeObject} from './types.js';
 
export function generate_x_y(i_node_array: Array<iNode>) {
    const center_x = 1280 / 2 + 200;
    const center_y = 500;
    const radius = 250;
    const random_factor = 100;
 
    for (let i = 0; i < i_node_array.length; i++) {
        const angle = (2 * Math.PI * i) / i_node_array.length;
        i_node_array[i].x = center_x + (radius * Math.cos(angle) + Math.floor(Math.random() * random_factor));
        i_node_array[i].y = center_y + (radius * Math.sin(angle) + Math.floor(Math.random() * random_factor));
    }
}