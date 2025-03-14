import { ListGraph } from './lib/graphs';
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
    collection_rate: number,
    can_place: boolean,
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
    selected_object: InventoryNodeObject | undefined,
    game_rounds: number,
    game_over: boolean
    icon_animations: Array<IconAnimation>
    ticks: number,
    not_win: boolean,
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
//export type NonPlaceItem

export type Screen = {
    id: string,
    draw_function: Function
}

export type Collectable = {
    name: string,
    count: number,
}

export type IconAnimation = {
    x: number,
    y: number,
    image: HTMLImageElement,
    move_function: Function,
    size: number
    target_x: number
    target_y: number
    target_function: Function
    audio: HTMLAudioElement
    delay: number
    spd_factor: number
}