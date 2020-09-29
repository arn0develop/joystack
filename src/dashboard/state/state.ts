import SettingsState, {initialState as initialSettingsState} from './settings/state'
import SidebarState, {initialState as initialSidebarState} from './sidebar/state'
import DisplayState, {initialState as initialDisplayState} from './display/state'
import ConsoleState, {initialState as initialConsoleState} from './console/state'
import PluginsState, {initialState as initialPluginsState} from './plugins/state'
import PopupState, {initialState as initialPopupState} from './popup/state'

export interface State {
  display: DisplayState
  settings: SettingsState
  sidebar: SidebarState
  console: ConsoleState
  plugins: PluginsState
  popup: PopupState
}

export const initialState: State = {
  sidebar: initialSidebarState,
  display: initialDisplayState,
  settings: initialSettingsState,
  console: initialConsoleState,
  plugins: initialPluginsState,
  popup: initialPopupState
}