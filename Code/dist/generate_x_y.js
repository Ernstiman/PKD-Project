import { construct_inode, construct_node_object } from './contructors.js';
import { canvas } from './draw.js';
import { shop_draw_function, draw_daughter } from './draw_functions.js';
import { remove_id_arrray } from './id_array.js';
import { build_list, list, map, length as list_length, pair, append } from './lib/list.js';
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
        if (layer === 0) {
            if (Math.random() < 0.5) {
                list_1 = list(nodes + amount_array[i], nodes + 1);
            }
            else {
                list_1 = list(nodes + 1);
            }
            if (Math.random() < 0.4) {
                list_1 = pair(nodes + amount_array[i] - layer + Math.floor(Math.random() * amount_array[(i + 1) % circle_size]), list_1);
            }
        }
        else if (amount_array[i] - 1 === layer) {
            if (Math.random() < 0.5) {
                list_1 = list(nodes + amount_array[i] - layer + Math.floor(amount_array[(i + 1) % circle_size] - 1), nodes + 1);
            }
            else {
                list_1 = list(nodes + 1);
            }
        }
        else {
            list_1 = list(nodes + 1);
            if (Math.random() < 0.1) {
                list_1 = pair(nodes + amount_array[i] - layer + Math.min(Math.floor(amount_array[(i + 1) % circle_size] - 1), layer), list_1);
            }
            if (Math.random() < 0.1) {
                list_1 = pair(nodes + amount_array[i] - layer + Math.min(Math.floor(amount_array[(i + 1) % circle_size] - 1), layer), list_1);
            }
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
                if (layer === 0 && i === Math.floor(circle_size / 2)) {
                    construct_inode(nodes, [], 0, 0, i_node_array);
                }
                else {
                    if (Math.random() < 0.2) {
                        construct_inode(nodes, [], 0, 0, i_node_array);
                    }
                    else {
                        construct_inode(nodes, [], 0, 0, i_node_array);
                    }
                }
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
export function create_daughter_node(graph, i_node_array, shop_index, game_state) {
    graph.adj[graph.size] = list();
    // console.log(graph.adj);
    // console.log(graph.size)
    construct_inode(graph.size, [construct_node_object(3, draw_daughter, () => { remove_id_arrray("place_object", game_state.gui_rectangles); }, () => { }, 0)], canvas.width / 2, canvas.height / 2, i_node_array);
    graph.size += 1;
    console.log(graph.adj[shop_index]);
    let new_list = append(graph.adj[shop_index], list(graph.size - 1));
    graph.adj[shop_index] = new_list;
}
