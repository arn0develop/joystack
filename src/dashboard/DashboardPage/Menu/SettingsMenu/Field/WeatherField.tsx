import React from 'react'

import {Difficulty, Weather} from '@joystack/protocol/realm/settings'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {updateSettings} from '../../../../state/settings/actions'
import DropdownField from './DropdownField'
import {connect} from 'react-redux'
import {withTranslation, WithTranslation} from 'react-i18next'

interface Option {
  id: number
  key: string
  type: Weather
}

const options: Option[] = [
  {id: 0, key: 'menus.settings.weather.simulated', type: Weather.SIMULATED},
  {id: 1, key: 'menus.settings.weather.clear', type: Weather.CLEAR},
  {id: 2, key: 'menus.settings.weather.rain', type: Weather.RAIN},
  {id: 3, key: 'menus.settings.weather.thunder', type: Weather.THUNDER},
]

const defaultOption = options[0]

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    weather: state.dashboard.settings.value.weather,
    realmId: state.dashboard.sidebar.active.realmId
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateSettings}, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties> & ReturnType<typeof mapDispatchToProperties> & WithTranslation

class WeatherField extends React.Component<Properties> {
  render() {
    const option = options.find(option => option.type === this.props.weather) || defaultOption
    return <DropdownField
      name="weather"
      onUpdate={(index) => this.update(index)}
      options={options.map(option => ({id: option.id, value: this.props.t(option.key)}))}
      value={option.id}
    />
  }

  private update(index: number) {
    const option = options.find(option => option.id === index)
    const realmId = this.props.realmId
    if (option && realmId) {
      this.props.updateSettings(realmId, {name: 'partial', properties: {weather: option.type}})
    }
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('dashboard')(WeatherField))