import {
  ChatColor,
  Difficulty,
  Dimension,
  EntityGroup,
  GameMode,
  GameplayFlag,
  GameRule,
  IntrinsicMessageTrigger,
  RealmSettings,
  Weather
} from '@joystack/protocol/realm/settings'

export default interface State {
  value: RealmSettings.AsObject
  loaded: boolean
  saving: boolean
  loadError: string
  saveError: string
}

const defaultSettings: RealmSettings.AsObject = {
  operatorsList: [],
  whitelistList: [],
  colorsMap: [
    ['user', {
      code: ChatColor.Code.GREEN,
      effectsList: [ChatColor.Effect.BOLD]
    }],
    ['chat', {
      code: ChatColor.Code.WHITE,
      effectsList: [ChatColor.Effect.BOLD]
    }],
    ['admin', {
      code: ChatColor.Code.RED,
      effectsList: [ChatColor.Effect.BOLD]
    }]
  ],
  difficulty: Difficulty.EASY,
  enabledGameRulesList: [
    GameRule.EXPLOSION_DAMAGE
  ],
  enabledMessageTriggersList: [
    IntrinsicMessageTrigger.DEATH,
    IntrinsicMessageTrigger.JOIN
  ],
  entitiesList: [
    EntityGroup.ANIMAL,
    EntityGroup.MONSTER,
    EntityGroup.VILLAGER
  ],
  flagsList: [
    GameplayFlag.ACHIEVEMENTS,
    GameplayFlag.COMMAND_BLOCKS,
    GameplayFlag.PVP_ENABLED
  ],
  gameMode: GameMode.SURVIVAL,
  resourcePackUrl: '',
  buildHeightLimit: 255,
  dimensionsList: [
    Dimension.NETHER,
    Dimension.END
  ],
  spawnProtection: 0,
  viewDistance: 100,
  weather: Weather.SIMULATED,
  playerIdleTimeout: 0
}

export const initialState: State = {
  value: defaultSettings,
  loaded: false,
  saving: false,
  loadError: '',
  saveError: ''
}
