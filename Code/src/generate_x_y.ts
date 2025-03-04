import { construct_detective, construct_inode, construct_node_object } from './contructors.js';
import { shop_draw_function } from './draw_functions.js';
import { ListGraph } from './lib/graphs.js';
import { build_list, for_each, list, list_ref, map, length as list_length, pair, List } from './lib/list.js';
import { shop_step_on } from './step_on_functions.js';
import { GameState, iNode,  NodeObject} from './types.js';
 
export function generate_x_y(graph: ListGraph, i_node_array: Array<iNode>, shop_index: number) {
    const center_x = 1280 / 2 + 200;
    const center_y = 500;
    const radius = 220;
    const random_factor = 30;

    let shop = construct_node_object(0, shop_draw_function,  shop_step_on, ()=>{})
 
    let circle_size=10
    let layers=3
    let nodes=0

    function build_connections(nodes: number, connect_layers: number, random_factor: number, layer: number, i: number, amount_array: Array<number>){
        let list_1: List<number>=list()
        
        if (layer===0){
            if (Math.random()<0.5){
                list_1=list(nodes+amount_array[i], nodes+1)
            }else{
                list_1=list(nodes+1)
            }
            if (Math.random()<0.4){
                list_1=pair(nodes+amount_array[i]-layer+Math.floor(Math.random()*amount_array[(i+1)%circle_size]), list_1)
            }
        }
        else if (amount_array[i]-1===layer){
            if (Math.random()<0.5){
                list_1=list(nodes+amount_array[i]-layer+Math.floor(amount_array[(i+1)%circle_size]-1),nodes+1)
            }else{
                list_1=list(nodes+1)
            }
        }else{
      
            list_1=list(nodes+1)
            
            if (Math.random()<0.1){
                list_1=pair(nodes+amount_array[i]-layer+Math.min(Math.floor(amount_array[(i+1)%circle_size]-1),layer), list_1)
            }
            if (Math.random()<0.1){
                list_1=pair(nodes+amount_array[i]-layer+Math.min(Math.floor(amount_array[(i+1)%circle_size]-1),layer), list_1)
            }
        }

        if  (list_length(list_1)<1){
            return list(nodes+Math.floor(1+Math.random()*(layers)))
        }else{
            return list_1
        }
    }
    let amount_array=[]
    for (let i = 0; i < circle_size; i++) {
        amount_array[i]=Math.floor(1+Math.random()*(layers))
    }
    for (let i = 0; i < circle_size; i++) {

        for(let layer=0;layer<amount_array[i];layer++){

            if (layer===0 && i===0){
                construct_inode(nodes,[shop], 0, 0, i_node_array);
            }else{
                if (layer===0 && i===Math.floor(circle_size/2)){
                    construct_inode(nodes,[construct_detective(2)], 0, 0, i_node_array);
                }else{
                    if (Math.random()<0.2){
                        construct_inode(nodes,[construct_detective(2)], 0, 0, i_node_array);
                    }else{
                        construct_inode(nodes,[], 0, 0, i_node_array);
                    }
                }
            }
            
            const angle = (2 * Math.PI * i) / circle_size;
            i_node_array[nodes].x = center_x + ((radius+150*(layer)) * Math.cos(angle) + Math.floor(Math.random() * random_factor));
            i_node_array[nodes].y = center_y + ((radius+70*(layer)) * Math.sin(angle) + Math.floor(Math.random() * random_factor));

            
            graph.adj.push(build_connections(nodes, amount_array[i], (layer===0) ? 1 : 0.1, layer, i, amount_array))
            nodes+=1
        }

    }

    
 
    graph.size=nodes
    for (let i = 0; i < graph.size; i++) {
        graph.adj[i] = map((index)=>{return (index<nodes) ? index : 0}, graph.adj[i])
    }
    graph.adj[nodes-1]=build_list((i)=>{return i}, 1)
}