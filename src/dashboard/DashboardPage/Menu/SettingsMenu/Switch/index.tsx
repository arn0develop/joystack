import React from 'react'
import { Switch as AntSwitch, Tooltip } from 'antd'
import { withTranslation, WithTranslation } from 'react-i18next'
import 'src/dashboard/DashboardPage/Menu/SettingsMenu/Switch/style.scss'

interface Properties extends WithTranslation {
  name: string
  initial: boolean
  onChange?: (checked: boolean) => void
}

interface State {
  isChecked: boolean
}

class Switch extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      isChecked: properties.initial,
    }
  }

  render() {
    const { name, t } = this.props
    const { isChecked } = this.state
    return (
      <div className="switch-container">
        <span>{name}</span>
        <div className="switcher">
          <AntSwitch
            defaultChecked={this.props.initial}
            onChange={(checked) => {
              this.setState({ isChecked: checked })
              const updater = this.props.onChange
              if (updater) {
                updater(checked)
              }
            }}
            checked={isChecked}
          />
          <span>
            {isChecked ? t('menus.settings.switch.on') : t('menus.settings.switch.off')}
          </span>
        </div>
        <Tooltip placement="top" title={t('settings.info')}>
          <div className="info">?</div>
        </Tooltip>
      </div>
    )
  }
}

export default withTranslation('dashboard')(Switch)
