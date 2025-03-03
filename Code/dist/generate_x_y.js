import { construct_inode, construct_node_object } from './contructors.js';
import { shop_draw_function } from './draw_functions.js';
import { build_list, list, map, length as list_length } from './lib/list.js';
import { shop_step_on } from './step_on_functions.js';
export function generate_x_y(graph, i_node_array, shop_index) {
    const center_x = 1280 / 2 + 200;
    const center_y = 500;
    const radius = 220;
    const random_factor = 30;
    let shop = construct_node_object(0, shop_draw_function, shop_step_on, () => { });
    let circle_size = 10;
    let layers = 3;
    let nodes = 0;
    function build_connections(nodes, connect_layers, random_factor, layer, i, amount_array) {
        let list_1 = list();
        if (amount_array[i] === amount_array[(i + 1) % circle_size]) {
            list_1 = list(nodes + amount_array[i], nodes + 1);
        }
        else {
            list_1 = list(nodes + 1);
        }
        if (list_length(list_1) < 1) {
            return list(nodes + Math.floor(1 + Math.random() * (layers)));
        }
        else {
            return list_1;
        }
    }
    let amount_array = [];
    for (let i = 0; i < circle_size; i++) {
        amount_array[i] = Math.floor(1 + Math.random() * (layers));
    }
    for (let i = 0; i < circle_size; i++) {
        for (let layer = 0; layer < amount_array[i]; layer++) {
            if (layer === 0 && i === 0) {
                construct_inode(nodes, [shop], 0, 0, i_node_array);
            }
            else {
                construct_inode(nodes, [], 0, 0, i_node_array);
            }
            const angle = (2 * Math.PI * i) / circle_size;
            i_node_array[nodes].x = center_x + ((radius + 150 * (layer)) * Math.cos(angle) + Math.floor(Math.random() * random_factor));
            i_node_array[nodes].y = center_y + ((radius + 70 * (layer)) * Math.sin(angle) + Math.floor(Math.random() * random_factor));
            graph.adj.push(build_connections(nodes, amount_array[i], (layer === 0) ? 1 : 0.1, layer, i, amount_array));
            nodes += 1;
        }
    }
    graph.size = nodes;
    for (let i = 0; i < graph.size; i++) {
        graph.adj[i] = map((index) => { return (index < nodes) ? index : 0; }, graph.adj[i]);
    }
    graph.adj[nodes - 1] = build_list((i) => { return i; }, 1);
}
