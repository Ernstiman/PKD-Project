import { GameState } from "./types";

export function remove_id_arrray<T extends {id: string}>(id: string, arr: Array<T>):void{
  for (let i = 0; i < arr.length; i ++){
      let elem = arr[i];
      if(elem.id === id){
          arr.splice(i, 1)
      }
  }
}

export function find_id_arrray<T extends {id:string}>(id: string, arr: Array<T>): T | undefined{
  for (let i = 0; i < arr.length; i ++){
      let elem = arr[i]
      if(elem.id === id){
          return elem
      }
  }
}

export function in_inventory(game_state: GameState, id: number){
  for (let inventory_item of game_state.player_inventory){
    if(inventory_item?.node_object.type === id){
      return true
    }
  }
  return false

}