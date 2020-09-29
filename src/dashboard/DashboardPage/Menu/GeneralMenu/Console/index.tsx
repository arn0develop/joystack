import React from 'react'
import {FullscreenOutlined} from '@ant-design/icons'
import {withTranslation, WithTranslation} from 'react-i18next'
import './style.scss'
import {CloseCircleOutlined} from '@ant-design/icons/lib'

import {List} from 'antd'

import FullScreen from 'src/component/FullScreen'
import {CombinedState, initialState} from '../../../../../state'
import {connect} from 'react-redux'
import {
  executeCommand,
  subscribeConsoleMessages
} from '../../../../state/console/action'

import {bindActionCreators, Dispatch} from 'redux'
import {ConsoleMessage} from '@joystack/protocol/realm/console'

interface State {
  command: string
  expanded: boolean
}

const fakeState = {
  recentEntries: []
}

interface OwnProperties {
  expandable?: boolean
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    realmId: state.dashboard.sidebar.active.realmId,
    messages: state.dashboard.console.messages
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    executeCommand: executeCommand,
    subscribeConsoleMessages: subscribeConsoleMessages
  }, dispatch)
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class Console extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      expanded: false,
      command: '',
    }
  }

  render() {
    if (this.state.expanded) {
      return <FullScreen additionalClassName="console-fullscreen">{this.renderSmall()}</FullScreen>
    }
    return this.renderSmall()
  }

  private renderSmall() {
    const {t} = this.props
    return (
      <div className="console dashboard-card">
        <div className="title">
          <span>{t('menus.general.console.title')}</span>
          {this.props.expandable && this.renderToggleButton()}
        </div>
        <List
          bordered={false}
          dataSource={this.props.messages}
          renderItem={item => this.renderItem(item)}
        />
        <div className="console-command-input-container">
          <span>&gt;</span>
          <input
            className="console-command-input"
            placeholder="Enter command"
            value={this.state.command}
            onChange={event => this.updateCommand(event)}
            onKeyDown={event => this.submitCommand(event)}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.realmId != undefined) {
      this.receiveUpdates()
    }
  }

  componentDidUpdate(properties: Properties & WithTranslation) {
    if(properties.realmId != this.props.realmId && this.props.realmId != undefined) {
      this.receiveUpdates()
    }
  }

  receiveUpdates() {
    this.props.subscribeConsoleMessages()
  }

  private updateCommand(event: React.FormEvent<HTMLInputElement>) {
    const field = event.target as HTMLInputElement
    this.setState({...this.state, command: field.value})
  }

  private renderItem(message: ConsoleMessage.AsObject) {
    return (
      <List.Item>
        <span>
          <span className="console-entry-time">{message.time}</span>
          <span className="console-entry-message">{message.message}</span>
        </span>
      </List.Item>
    )
  }

  private static enterKey = 13

  private submitCommand(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode != Console.enterKey) {
      return
    }
    const inputField = event.target as HTMLInputElement
    const command = inputField.value
    this.props.executeCommand(command)
  }

  private renderToggleButton() {
    return this.state.expanded
      ? <CloseCircleOutlined
        onClick={() => this.setState({...this.state, expanded: false})}/>
      : <FullscreenOutlined
        onClick={() => this.setState({...this.state, expanded: true})}/>
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('dashboard')(Console))