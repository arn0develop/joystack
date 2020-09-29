import React from 'react'

import {Difficulty} from '@joystack/protocol/realm/settings'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {updateSettings} from '../../../../state/settings/actions'
import DropdownField from './DropdownField'
import {connect} from 'react-redux'
import {withTranslation, WithTranslation} from 'react-i18next'

interface Option {
  id: number
  key: string
  type: Difficulty
}

const options: Option[] = [
  {id: 0, key: 'menus.settings.difficulty.peaceful', type: Difficulty.PEACEFUL},
  {id: 1, key: 'menus.settings.difficulty.easy', type: Difficulty.EASY},
  {id: 2, key: 'menus.settings.difficulty.medium', type: Difficulty.MEDIUM},
  {id: 3, key: 'menus.settings.difficulty.hard', type: Difficulty.HARD}
]

const defaultOption = options[2]

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    difficulty: state.dashboard.settings.value.difficulty,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties> & ReturnType<typeof mapDispatchToProperties> & WithTranslation

class DifficultyField extends React.Component<Properties> {
  render() {
    const option = options.find(option => option.type === this.props.difficulty) || defaultOption
    return <DropdownField
      name="difficulty"
      onUpdate={(index) => this.update(index)}
      options={options.map(option => ({id: option.id, value: this.props.t(option.key)}))}
      value={option.id}
    />
  }

  private update(index: number) {
    const option = options.find(option => option.id === index)
    const realmId = this.props.realmId
    if (option && realmId) {
      this.props.updateSettings(realmId, {name: 'partial', properties: {difficulty: option.type}})
    }
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(DifficultyField))