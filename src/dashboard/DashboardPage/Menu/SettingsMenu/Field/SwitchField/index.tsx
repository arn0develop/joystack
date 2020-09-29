import {Switch as AntSwitch, Tooltip} from 'antd'
import * as React from 'react'

import {WithTranslation, withTranslation} from 'react-i18next'

import './style.scss'

interface State {
  value: boolean
}

interface SwitchProperties {
  name: string
  value: boolean
  onUpdate: (state: boolean) => void
}

type Properties = SwitchProperties & WithTranslation

class SwitchField extends React.Component<Properties, State> {

  constructor(properties: Properties) {
    super(properties)
    this.state = {value: this.props.value}
  }

  componentDidUpdate(properties: Readonly<Properties>) {
    if (this.props.value !== properties.value) {
      this.setState({value: this.props.value})
    }
  }

  render() {
    const {t} = this.props
    return (
      <div className="switch-container">
        <span>{this.props.t(`menus.settings.fields.${this.props.name}`)}</span>
        <div className="switcher">
          <AntSwitch
            onChange={(checked) => {
              this.props.onUpdate(checked)
              this.setState({ value: checked })
            }}
            checked={this.state.value}
          />
          <span>
            {this.state.value ? t('menus.settings.switch.on') : t('menus.settings.switch.off')}
          </span>
        </div>
        <Tooltip placement="top" title={t(`menus.settings.descriptions.${this.props.name}`)}>
          <div className="info">?</div>
        </Tooltip>
      </div>
    )
  }
}

export default withTranslation('dashboard')(SwitchField)