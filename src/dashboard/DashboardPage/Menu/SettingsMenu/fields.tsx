import React from 'react'

import DifficultyField from './Field/DifficultyField'
import GameModeField from './Field/GameModeField'
import EntityToggleField from './Field/EntityToggleField'
import {
  Dimension,
  EntityGroup, GameplayFlag, GameRule, IntrinsicMessageTrigger
} from '@joystack/protocol/realm/settings/settings_service_pb'
import DimensionToggleField from './Field/DimensionToggleField'
import GameRuleField from './Field/GameRuleField'
import GameplayFlagField from './Field/GameplayFlagField'
import IntrinsicMessageTriggerField from './Field/IntrinsicMessageTriggerField'
import WeatherField from './Field/WeatherField'
import ColorField from './Field/ColorField'

type Translate = (key: string) => string

interface WithIndex {
  index: number
}

export function findIndexOrDefault<TypeT>(map: Map<TypeT, WithIndex>, type?: TypeT): number {
  if (!type) {
    return 0
  }
  const entry = map.get(type)
  return entry?.index || 0
}


function ifPresent<ValueT>(value: ValueT | undefined, action: (value: ValueT) => void) {
  if (value) {
    action(value)
  }
}


export function listGameFields() {
  return [
    <DifficultyField key="difficulty"/>,
    <GameModeField key="gameMode"/>,
    <WeatherField key="weather"/>,
    <EntityToggleField key="enable-villagers" name="enableVillagers" group={EntityGroup.VILLAGER}/>,
    <EntityToggleField key="enable-monsters" name="enableMonsters" group={EntityGroup.MONSTER}/>,
    <EntityToggleField key="enable-animals" name="enableAnimals" group={EntityGroup.ANIMAL}/>,
    <GameRuleField key="keep-inventory" name="keepInventory" rule={GameRule.KEEP_INVENTORY}/>,
  ]
}

export function listWorldFields() {
  return [
    <DimensionToggleField key="allow-nether" name="allowNether" dimension={Dimension.NETHER}/>,
    <DimensionToggleField key="allow-end" name="allowEnd" dimension={Dimension.END}/>,
    <GameRuleField key="block-damage" name="blockDamage" rule={GameRule.EXPLOSION_DAMAGE}/>,
    <GameplayFlagField key="command-blocks" name="commandBlocks" flag={GameplayFlag.COMMAND_BLOCKS}/>,
  ]
}

export function listOtherFields() {
  return [
    <IntrinsicMessageTriggerField key="join-leave-messages" name="joinOrLeaveMessages" trigger={IntrinsicMessageTrigger.JOIN}/>,
    <IntrinsicMessageTriggerField key="death-messages" name="deathMessages" trigger={IntrinsicMessageTrigger.DEATH}/>,
    <ColorField key="userColor" name="userColor" colorKey="user"/>,
    <ColorField key="chatColor" name="chatColor" colorKey="chat"/>,
    <ColorField key="staffColor" name="adminColor" colorKey="admin"/>
  ]
}

/*
  {
    name: 'visibility',
    render: (translate, registry) => renderSlide(registry,
      {
        name: 'visibility',
        read: state => 60,
        limit: 100,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },

  {
    name: 'weather',
    render: (translate, registry) => renderSelect(registry,
      {
        name: 'weather',
        entries: [
          translate('menus.settings.weather.clear'),
          translate('menus.settings.weather.rain'),
        ],
        read: state => 0,
        update: (state, value) => state,
        changeSavingState
      })
  },
]

const colorsKeys = [
  'menus.settings.colors.red',
  'menus.settings.colors.green',
  'menus.settings.colors.blue'
]

export const otherFields = (changeSavingState: ChangeSavingState): FieldConfiguration<any>[] => [
  {
    name: 'commandBlocks',
    render: (translate, registry) => renderSwitch(registry,
      {
        name: 'commandBlocks',
        read: state => false,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'joinOrLeaveMessages',
    render: (translate, registry) => renderSwitch(registry,
      {
        name: 'joinOrLeaveMessages',
        read: state => false,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'deathMessages',
    render: (translate, registry) => renderSwitch(registry,
      {
        name: 'deathMessages',
        read: state => false,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'blockDamage',
    render: (translate, registry) => renderSwitch(registry,
      {
        name: 'blockDamage',
        read: state => false,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'buildHeightLimit',
    render: (translate, registry) => renderSlide(registry,
      {
        name: 'buildHeightLimit',
        read: state => 255,
        limit: 255,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'keepInventory',
    render: (translate, registry) => renderSwitch(registry,
      {
        name: 'keepInventory',
        read: state => false,
        update: (state, value) => state,
        changeSavingState
      }
    )
  },
  {
    name: 'chatColor',
    render: (translate, registry) => renderSelect(registry,
      {
        name: 'chatColor',
        read: state => 0,
        entries: colorsKeys.map(translate),
        update: (state, value) => state,
        changeSavingState,
        isColors: true
      })
  },
  {
    name: 'userColor',
    render: (translate, registry) => renderSelect(registry,
      {
        name: 'userColor',
        entries: colorsKeys.map(translate),
        read: state => 0,
        update: (state, value) => state,
        changeSavingState,
        isColors: true,
      })
  },
  {
    name: 'adminColor',
    render: (translate, registry) => renderSelect(registry,
      {
        name: 'adminColor',
        entries: colorsKeys.map(translate),
        read: state => 0,
        update: (state, value) => state,
        changeSavingState,
        isColors: true,
      })
  },
]*/