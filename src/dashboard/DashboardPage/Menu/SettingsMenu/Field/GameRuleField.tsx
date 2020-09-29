import {GameRule} from '@joystack/protocol/realm/settings'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {updateSettings} from '../../../../state/settings/actions'
import DropdownField from './DropdownField'
import {connect} from 'react-redux'
import {withTranslation, WithTranslation} from 'react-i18next'
import React from 'react'
import addToSet from '../../../../../util/addToSet'
import removeFromSet from '../../../../../util/removeFromSet'
import SwitchField from './SwitchField'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    enabledGameRulesList: state.dashboard.settings.value.enabledGameRulesList,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  rule: GameRule
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class GameRuleField extends React.Component<Properties> {
  render() {
    return <SwitchField
      name={this.props.name}
      value={this.props.enabledGameRulesList.includes(this.props.rule)}
      onUpdate={state => this.update(state)}
    />
  }

  private update(state: boolean) {
    const realmId = this.props.realmId
    if (realmId) {
      const enabledGameRulesList = this.createUpdatedGameRuleList(state)
      this.props.updateSettings(realmId, {name: 'partial', properties: {enabledGameRulesList}})
    }
  }

  private createUpdatedGameRuleList(state: boolean) {
    return state
      ? addToSet(this.props.enabledGameRulesList, this.props.rule)
      : removeFromSet(this.props.enabledGameRulesList, this.props.rule)
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(GameRuleField))