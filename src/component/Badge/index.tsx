import React from 'react'
import 'src/component/Badge/style.scss'
import CopyToClipboard from 'react-copy-to-clipboard'
import {CopyOutlined} from '@ant-design/icons/lib'
import {Tooltip} from 'antd'

export interface Description {
  name: string
  firstMessageLine: string
  secondMessageLine: string
  onlineCount: number
  onlineLimit: number
}


interface TextProperties {
  description: Description
  copyText?: string
}

class Text extends React.Component<TextProperties> {
  render() {
    return (
      <React.Fragment>
        {this.renderText()}
        <span
          className="badge-description-text-message-1 row"
          dangerouslySetInnerHTML={{__html: this.props.description.firstMessageLine}}
        />
        <span
          className="badge-description-text-message-2 row"
          dangerouslySetInnerHTML={{__html: this.props.description.secondMessageLine}}
        />
      </React.Fragment>
    )
  }

  private renderText() {
    return this.props.copyText
      ? this.renderCopyableText()
      : this.renderPlainText()
  }

  private renderCopyableText() {
    return (
      <CopyToClipboard text={this.props.copyText || 'undefined'}>
        <Tooltip color={'volcano'} title="Click to copy">
          <p className="badge-description-text-name badge-description-text-name-copy row">
            {this.props.description.name}
          </p>
        </Tooltip>
      </CopyToClipboard>
    )
  }

  private renderPlainText() {
    return (
      <p className="badge-description-text-name row">{this.props.description.name}</p>
    )
  }
}

interface Properties {
  imageSource: string
  description: Description
  small?: boolean
  shadow?: boolean
  offline?: boolean
  copyText?: string
}

export default class Badge extends React.Component<Properties> {
  render() {
    return (
      <div className={`badge ${this.props.small ? 'badge-small' : ''} ${this.props.shadow ? 'badge-shadow' : ''}`}>
        <div>
          <img
            className={`badge-favicon-image unselectable-text ${
              this.props.small ? 'Badge-favicon-image-small' : ''
            } rounded img-fluid unselectable-text`}
            unselectable="on"
            src={this.props.imageSource}
            alt="favicon"
          />
        </div>
        <div>
          <Text copyText={this.props.copyText} description={this.props.description}/>
        </div>
        {this.renderVolume()}
      </div>
    )
  }

  private renderVolume() {
    return this.props.offline
      ? (
        <span
          className={`badge-volume badge-volume-offline ${this.props.small ? 'Badge-volume-small' : ''}`}>
          offline
        </span>
      )
      : (
        <span
          className={`badge-volume ${this.props.small ? 'Badge-volume-small' : ''}`}>
          {this.props.description.onlineCount} / {this.props.description.onlineLimit}
        </span>
      )
  }
}
