import React from 'react'

import {ChatColor, Difficulty} from '@joystack/protocol/realm/settings'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {updateSettings} from '../../../../state/settings/actions'
import DropdownField from './DropdownField'
import {connect} from 'react-redux'
import {withTranslation, WithTranslation} from 'react-i18next'

interface Option {
  id: number
  key: string
  code: ChatColor.Code
  color: string
}

const options: Option[] = [
  {id: 0, key: 'menus.settings.colors.black', code: ChatColor.Code.BLACK, color: '#000000'},
  {id: 1, key: 'menus.settings.colors.darkBlue', code: ChatColor.Code.DARK_BLUE, color: '#0000AA'},
  {id: 2, key: 'menus.settings.colors.darkGreen', code: ChatColor.Code.DARK_GREEN, color: '#00AA00'},
  {id: 3, key: 'menus.settings.colors.darkAqua', code: ChatColor.Code.DARK_AQUA, color: '#00AAAA'},
  {id: 4, key: 'menus.settings.colors.darkRed', code: ChatColor.Code.DARK_RED, color: '#AA0000'},
  {id: 5, key: 'menus.settings.colors.darkPurple', code: ChatColor.Code.DARK_PURPLE, color: '#AA00AA'},
  {id: 6, key: 'menus.settings.colors.gold', code: ChatColor.Code.GOLD, color: '#FFAA00'},
  {id: 7, key: 'menus.settings.colors.gray', code: ChatColor.Code.GRAY, color: '#AAAAAA'},
  {id: 8, key: 'menus.settings.colors.darkGray', code: ChatColor.Code.DARK_GRAY, color: '#555555'},
  {id: 9, key: 'menus.settings.colors.blue', code: ChatColor.Code.BLUE, color: '#5555FF'},
  {id: 10, key: 'menus.settings.colors.green', code: ChatColor.Code.GREEN, color: '#55FF55'},
  {id: 11, key: 'menus.settings.colors.aqua', code: ChatColor.Code.AQUA, color: '#55FFFF'},
  {id: 12, key: 'menus.settings.colors.red', code: ChatColor.Code.RED, color: '#FF5555'},
  {id: 13, key: 'menus.settings.colors.lightPurple', code: ChatColor.Code.LIGHT_PURPLE, color: '#FF55FF'},
  {id: 14, key: 'menus.settings.colors.yellow', code: ChatColor.Code.YELLOW, color: '#FFFF55'},
  {id: 15, key: 'menus.settings.colors.white', code: ChatColor.Code.WHITE, color: '#FFFFFF'},
]

const defaultOption = options[2]

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    colorsMap: state.dashboard.settings.value.colorsMap,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  colorKey: string
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class ColorField extends React.Component<Properties> {
  render() {
    const option = this.findSelectedOption()
    return <DropdownField
      name={this.props.name}
      onUpdate={(index) => this.update(index)}
      options={options.map(option => ({id: option.id, color: option.color, value: this.props.t(option.key)}))}
      value={option.id}
    />
  }

  private findSelectedOption(): Option {
    const selectedEntry = this.props.colorsMap.find(([key]) => this.props.colorKey === key)
    if (selectedEntry) {
      const [key, color] = selectedEntry
      return options.find(option => option.code === color.code) || defaultOption
    }
    return defaultOption
  }

  private update(index: number) {
    const option = options.find(option => option.id === index)
    const realmId = this.props.realmId
    if (option && realmId) {
      const colorsMap = this.createUpdatedColorsMap(option)
      this.props.updateSettings(realmId, {name: 'partial', properties: {colorsMap}})
    }
  }

  private createUpdatedColorsMap(option: Option): Array<[string, ChatColor.AsObject]> {
    const isPresent = this.props.colorsMap.some(([key]) => key === this.props.colorKey)
    return isPresent
      ? this.replaceColorInMap(option)
      : this.appendToList(option)
  }

  private appendToList(option: Option): Array<[string, ChatColor.AsObject]> {
    const color = {code: option.code, effectsList: []}
    return [...this.props.colorsMap, [this.props.name, color]]
  }

  private replaceColorInMap(option: Option): Array<[string, ChatColor.AsObject]> {
    return this.props.colorsMap.map(entry => {
      const [key] = entry
      if (key === this.props.colorKey) {
        return [key, {code: option.code, effectsList: []}]
      }
      return entry
    })
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(ColorField))