import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {LanguageType, State} from 'src/translations/state'
import i18n from 'i18next'


export enum ActionType {
  SET_LANGUAGE = '@@translation/SET_LANGUAGE'
}

export interface ChangeLanguageAction {
  type: ActionType.SET_LANGUAGE
  language: LanguageType
}

export type AnyAction = ChangeLanguageAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

function dispatchAsync(action: AnyAction): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch(action)
  }
}

export function changeLanguage(language: LanguageType): Thunk<AnyAction> {
  i18n.changeLanguage(language)
  return dispatchAsync({type: ActionType.SET_LANGUAGE, language})
}