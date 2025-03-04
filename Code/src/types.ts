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
    collectables: Array<Collectable>
    draw_function: Function,
    collection_rate: number
}

export type InventoryNodeObject = {
    node_object: NodeObject,
    box: GuiRectangle,
    index: number
}

export type GameState = {
    i_node_array: Array<iNode>, 
    map_graph: ListGraph,
    current_node: number,
    round: number,
    player_collectables: Array<Collectable>,
    shop_collectables: Array<Collectable>,
    gui_rectangles: Array<GuiRectangle>
    screens: Array<Screen>,
    active_screens: Array<string>,
    player_inventory: Array<InventoryNodeObject | undefined>,
    shop_item_blocks: Array<ShopItemBlock>,
    songs: Array<HTMLAudioElement>,
    days_to_quota: number,
    quota_amount: number,
    selected_object: InventoryNodeObject | undefined
}

export type GuiRectangle = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
    click_on_function: Function
}

export type ShopItemBlock = {
    cost: number,
    node_object: NodeObject,
    block: GuiRectangle
}

export type Screen = {
    id: string,
    draw_function: Function
}

export type Collectable = {
    name: string,
    count: number,
}