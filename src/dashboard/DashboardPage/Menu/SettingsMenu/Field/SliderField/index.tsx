import {InputNumber, Slider} from 'antd'
import * as React from 'react'

import {WithTranslation, withTranslation} from 'react-i18next'
import './style.scss'

interface SliderProperties {
  limit: number
  name: string
}

interface State {
  value: number
}

type Properties = SliderProperties & WithTranslation

class SliderField extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = {
      value: 0
    }
  }

  render() {
    return (
      <div className="slide-container">
        <span>{this.props.t(`menus.settings.fields.${this.props.name}`)}</span>
        <InputNumber
          min={0}
          max={this.props.limit}
          value={this.state.value}
          onChange={value => {this.setState({value: value as number})}}
        />
        <Slider
          max={this.props.limit}
          value={this.state.value}
          onChange={(value: number) => {this.setState({value: value})}}
        />
      </div>
    )
  }
}

export default withTranslation('dashboard')(SliderField)