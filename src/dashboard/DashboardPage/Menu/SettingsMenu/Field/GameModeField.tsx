import {GameMode} from '@joystack/protocol/realm/settings/index'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {updateSettings} from '../../../../state/settings/actions'
import {withTranslation, WithTranslation} from 'react-i18next'
import React from 'react'
import DropdownField from './DropdownField'
import {connect} from 'react-redux'

interface Option {
  id: number
  key: string
  type: GameMode
}

const options: Option[] = [
  {id: 0, key: 'menus.settings.gameMode.survival', type: GameMode.SURVIVAL},
  {id: 1, key: 'menus.settings.gameMode.adventure', type: GameMode.ADVENTURE},
  {id: 2, key: 'menus.settings.gameMode.creative', type: GameMode.CREATIVE},
  {id: 3, key: 'menus.settings.gameMode.spectator', type: GameMode.SPECTATOR}
]

const defaultOption = options[0]

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    defaultGameMode: state.dashboard.settings.value.gameMode,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties> & ReturnType<typeof mapDispatchToProperties> & WithTranslation

class GameModeField extends React.Component<Properties> {
  render() {
    const option = options.find(option => option.type === this.props.defaultGameMode) || defaultOption
    return <DropdownField
      name="gameMode"
      onUpdate={(index) => this.update(index)}
      options={options.map(option => ({id: option.id, value: this.props.t(option.key)}))}
      value={option.id}
    />
  }

  private update(index: number) {
    const option = options.find(option => option.id === index)
    const realmId = this.props.realmId
    if (option && realmId) {
      this.props.updateSettings(realmId, {name: 'partial', properties: {gameMode: option.type}})
    }
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(GameModeField))