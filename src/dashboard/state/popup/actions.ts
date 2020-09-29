export enum ActionType {
  OPEN_POPUP = '@@dashboard/OPEN_POPUP',
  CLOSE_POPUP = '@@dashboard/CLOSE_POPUP',
}

export interface OpenPopup {
  type: ActionType.OPEN_POPUP
}

export interface ClosePopup {
  type: ActionType.CLOSE_POPUP
}

export type AnyAction = OpenPopup | ClosePopup


export const openPopup =()=>{
  return ({type: ActionType.OPEN_POPUP})
}

export const closePopup =()=>{
  return ({type: ActionType.CLOSE_POPUP})
}