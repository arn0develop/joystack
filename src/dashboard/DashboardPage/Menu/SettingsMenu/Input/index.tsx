import React from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Input as AntInput } from 'antd'
import 'src/dashboard/DashboardPage/Menu/SettingsMenu/Input/style.scss'

interface Properties {
  editableTag?: keyof JSX.IntrinsicElements
  editableText: string
}

interface State {
  editValue: string
  enabled: boolean
}

const enterKeyCode = 13

function isEnter(event: React.KeyboardEvent): boolean {
  return event.keyCode === enterKeyCode
}

export default class Input extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      editValue: this.props.editableText,
      enabled: false,
    }
  }

  private updateEditable(flag: boolean) {
    this.modifyState((state) => (state.enabled = flag))
  }

  private updateEditValue(target: string) {
    this.modifyState((state) => (state.editValue = target))
  }

  private modifyState(modification: (state: State) => void) {
    const updatedState: State = Object.assign({}, this.state)
    modification(updatedState)
    this.setState(updatedState)
  }

  render() {
    return this.state.enabled
      ? this.renderEnabled()
      : this.renderDisabled()
  }

  private renderEnabled() {
    const { editableTag: EditableTag = 'li' } = this.props
    return (
      <EditableTag className="input-for-edit-content">
        <AntInput
          type="text"
          className="input-for-edit"
          value={this.state.editValue}
          onChange={(event) => this.updateEditValue(event.target.value)}
          onBlur={() => this.updateEditable(false)}
          onKeyUp={(event) => isEnter(event) ? this.updateEditable(false) : null}
          autoFocus
        />
      </EditableTag>
    )
  }

  private renderDisabled() {
    const { editableTag: EditableTag = 'li' } = this.props
    return (
      <EditableTag
        onClick={() => this.updateEditable(true)}
        className="editable-text-content"
      >
        <span className="editable-text">{this.state.editValue}</span>
        <EditOutlined />
      </EditableTag>
    )
  }
}
