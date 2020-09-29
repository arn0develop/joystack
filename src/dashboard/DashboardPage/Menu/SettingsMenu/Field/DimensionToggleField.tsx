import {Dimension, EntityGroup} from '@joystack/protocol/realm/settings'
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
    dimensionsList: state.dashboard.settings.value.dimensionsList,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

interface OwnProperties {
  name: string
  dimension: Dimension
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

const enabled = {id: 0, value: 'menus.settings.switch.on'}
const disabled = {id: 1, value: 'menus.settings.switch.off'}
const options = [enabled, disabled]

class DimensionToggleField extends React.Component<Properties> {
  render() {
    return <SwitchField
      name={this.props.name}
      value={this.props.dimensionsList.includes(this.props.dimension)}
      onUpdate={state => this.update(state)}
    />
  }

  private update(state: boolean) {
    const realmId = this.props.realmId
    if (realmId) {
      const dimensionsList = this.createUpdatedDimensionsList(state)
      this.props.updateSettings(realmId, {name: 'partial', properties: {dimensionsList}})
    }
  }

  private createUpdatedDimensionsList(state: boolean) {
    return state
      ? addToSet(this.props.dimensionsList, this.props.dimension)
      : removeFromSet(this.props.dimensionsList, this.props.dimension)
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(DimensionToggleField))