import {EntityGroup} from '@joystack/protocol/realm/settings'
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
    entitiesList: state.dashboard.settings.value.entitiesList,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  group: EntityGroup
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation


class EntityToggleField extends React.Component<Properties> {
  render() {
    return <SwitchField
      name={this.props.name}
      value={this.props.entitiesList.includes(this.props.group)}
      onUpdate={state => this.update(state)}
    />
  }

  private update(state: boolean) {
    const realmId = this.props.realmId
    if (realmId) {
      const entitiesList = this.createUpdatedEntitiesList(state)
      this.props.updateSettings(realmId, {name: 'partial', properties: {entitiesList}})
    }
  }

  private createUpdatedEntitiesList(state: boolean) {
    return state
      ? addToSet(this.props.entitiesList, this.props.group)
      : removeFromSet(this.props.entitiesList, this.props.group)
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(EntityToggleField))