import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import 'src/setup/SetupPage/Gallery/Selection/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
import {Resource} from '@joystack/protocol/realm/resource'

interface Properties extends WithTranslation {
  resource: Resource.AsObject | null
  title: string
  subTitle: string
  onDeselect: () => void
}

class Selection extends Component<Properties> {
  render() {
    const { t, resource } = this.props
    return (
      <div
        className={`selected-gallery-content ${resource ? 'opened' : '' }`}
        style={{height: resource ? 125 : 0}}
      >
        <span className="title">{t('CHOSEN_MODPACK')}</span>
        {this.hasSelection() && this.renderSelection()}
      </div>
    )
  }

  private hasSelection(): boolean {
    return !!this.props.resource
  }

  private renderSelection(): React.ReactNode | undefined {
    return (
      <div className="selected-gallery">
        <ul>
          <li key={this.props.resource?.id}>
            <span>{this.props.resource?.name}</span>
            <CloseOutlined onClick={this.props.onDeselect} />
          </li>
        </ul>
      </div>
    )
  }
}

export default withTranslation('SETUP_PAGE')(Selection)