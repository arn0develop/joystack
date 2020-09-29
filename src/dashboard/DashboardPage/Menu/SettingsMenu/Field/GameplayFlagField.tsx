import {GameplayFlag} from '@joystack/protocol/realm/settings'
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
    flagsList: state.dashboard.settings.value.flagsList,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  flag: GameplayFlag
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class GameplayFlagField extends React.Component<Properties> {
  render() {
    return <SwitchField
      name={this.props.name}
      value={this.props.flagsList.includes(this.props.flag)}
      onUpdate={state => this.update(state)}
    />
  }

  private update(state: boolean) {
    const realmId = this.props.realmId
    if (realmId) {
      const flagsList = this.createUpdatedFlagList(state)
      this.props.updateSettings(realmId, {name: 'partial', properties: {flagsList}})
    }
  }

  private createUpdatedFlagList(state: boolean) {
    return state
      ? addToSet(this.props.flagsList, this.props.flag)
      : removeFromSet(this.props.flagsList, this.props.flag)
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(GameplayFlagField))