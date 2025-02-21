import { pair, head, tail, is_null, for_each, filter, enum_list } from './list';
import { empty, is_empty, enqueue, dequeue, head as qhead } from './queue_array';
// Helper functions
/**
 * Add all reverse edges to an edge list, and remove all self loops.
 * @param el an edge list
 * @returns el with all reverse edges present, and all self loops removed
 */
export function undirected(el) {
    if (is_null(el)) {
        return el;
    }
    else if (head(head(el)) === tail(head(el))) {
        return undirected(tail(el));
    }
    else {
        const source = head(head(el));
        const target = tail(head(el));
        return pair(pair(target, source), undirected(filter(edge => head(edge) !== target
            || tail(edge) !== source, tail(el))));
    }
}
// Build an array based on a function computing the item at each index
function build_array(size, content) {
    const result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
/**
 * Create a new matrix graph with no edges
 * @param size the number of nodes
 * @returns the new matrix graph, where each inner array entry is false.
 */
export function mg_new(size) {
    return { size,
        adj: build_array(size, _ => build_array(size, _ => false)) };
}
/**
 * Create a new matrix graph with a given set of edges
 * @param size the number of nodes
 * @param edges an edge list
 * @precondition all node ids in the edge list are < size.
 * @returns the new matrix graph, with the given edges.
 */
export function mg_from_edges(size, edges) {
    const result = mg_new(size);
    for_each(p => result.adj[head(p)][tail(p)] = true, edges);
    return result;
}
/**
 * Create a new ListGraph with no edges
 * @param size the number of nodes in the list graph
 * @returns a new list graph with size edges.
 */
export function lg_new(size) {
    return { size, adj: build_array(size, _ => null) };
}
/**
 * Create a new ListGraph with a given set of edges
 * @param size the number of nodes in the list graph
 * @param edges an edge list
 * @precondition all node ids in the edge list are < size.
 * @returns the new ListGraph, with the given edges.
 */
export function lg_from_edges(size, edges) {
    const result = lg_new(size);
    for_each(p => result.adj[head(p)] = pair(tail(p), result.adj[head(p)]), edges);
    return result;
}
/**
 * Transpose a list graph
 * @param adj input list graph
 * @returns the transpose of adj
 */
export function lg_transpose({ size, adj }) {
    const result = lg_new(size);
    for (var i = 0; i < size; i = i + 1) {
        for_each(p => result.adj[p] = pair(i, result.adj[p]), adj[i]);
    }
    return result;
}
// Graph algorithms
/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
const white = 1;
const grey = 2;
const black = 3;
/**
 * Get the visit order of a breadth-first traversal of a ListGraph.
 * @param adj the list graph
 * @param initial the id of the starting node. Default 0.
 * @returns A queue with the visited nodes in visiting order.
 */
export function lg_bfs_visit_order({ adj, size }, initial = 0) {
    const result = empty(); // nodes in the order they are being visited
    const pending = empty(); // grey nodes to be processed
    const colour = build_array(size, _ => white);
    // visit a white node
    function bfs_visit(current) {
        colour[current] = grey;
        enqueue(current, result);
        enqueue(current, pending);
    }
    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial);
    while (!is_empty(pending)) {
        // dequeue the head node of the grey queue
        const current = qhead(pending);
        dequeue(pending);
        // Paint all white nodes adjacent to current node grey and enqueue them.
        const adjacent_white_nodes = filter(node => colour[node] === white, adj[current]);
        for_each(bfs_visit, adjacent_white_nodes);
        // paint current node black; the node is now done.
        colour[current] = black;
    }
    return result;
}
/**
 * Get the visit order of a depth-first traversal of a ListGraph.
 * @param adj the list graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
export function lg_dfs_visit_order({ adj, size }, restart_order = null) {
    const result = empty();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        // if no order is given, initialize with all nodes enumerated
        restart_order = enum_list(0, size - 1);
    }
    else { }
    // Visit a node.  Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            enqueue(current, result);
            for_each(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    for_each(dfs_visit, restart_order);
    return result;
}
/**
 * Get the visit order of a depth-first traversal of a MatrixGraph.
 * @param adj the graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
export function mg_dfs_visit_order({ adj, size }, restart_order = null) {
    const result = empty();
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    }
    else { }
    // visit a node. Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            enqueue(current, result);
            for (var sink = 0; sink < size; sink = sink + 1) {
                if (adj[current][sink]) {
                    dfs_visit(sink);
                }
                else { }
            }
            colour[current] = black;
        }
        else { }
    }
    for_each(dfs_visit, restart_order);
    return result;
}
