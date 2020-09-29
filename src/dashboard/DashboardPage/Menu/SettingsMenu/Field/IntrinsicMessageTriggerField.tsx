import {
  GameRule,
  IntrinsicMessageTrigger
} from '@joystack/protocol/realm/settings'
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
    enabledMessageTriggersList: state.dashboard.settings.value.enabledMessageTriggersList,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  trigger: IntrinsicMessageTrigger
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class IntrinsicMessageTriggerField extends React.Component<Properties> {
  render() {
    return <SwitchField
      name={this.props.name}
      value={this.props.enabledMessageTriggersList.includes(this.props.trigger)}
      onUpdate={state => this.update(state)}
    />
  }

  private update(state: boolean) {
    const realmId = this.props.realmId
    if (realmId) {
      const enabledMessageTriggersList = this.createUpdatedTriggerList(state)
      this.props.updateSettings(realmId, {name: 'partial', properties: {enabledMessageTriggersList}})
    }
  }

  private createUpdatedTriggerList(state: boolean) {
    return state
      ? addToSet(this.props.enabledMessageTriggersList, this.props.trigger)
      : removeFromSet(this.props.enabledMessageTriggersList, this.props.trigger)
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(IntrinsicMessageTriggerField))