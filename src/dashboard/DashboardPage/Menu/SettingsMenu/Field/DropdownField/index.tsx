import { Select as AntSelect, Tooltip } from 'antd'
import * as React from 'react'
import {WithTranslation, withTranslation} from 'react-i18next'
import './style.scss'
import { DownOutlined } from '@ant-design/icons'

interface State {
  value: number
  selectedColor: null | string
}

export interface Option {
  id: number
  value: string
  color?: string
}

interface DropdownProperties {
  name: string
  options: Option[]
  value: number
  onUpdate: (value: number) => void
}

type Properties = DropdownProperties & WithTranslation

class DropdownField extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = {
      value: properties.value,
      selectedColor: null
    }
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (this.props.value !== previous.value) {
      this.setState({...this.state, value: this.props.value})
    }
  }

  render() {
    const { options } = this.props
    const { selectedColor } = this.state
    return (
      <div className="select-container">
        <span>{this.props.t(`menus.settings.fields.${this.props.name}`)}</span>
        <AntSelect
          dropdownClassName="settings-menu-select"
          value={this.props.options[this.state.value].value}
          onSelect={(value, option) => {
            const index = Number(option.key)
            this.setState({ value: index })
            this.props.onUpdate(index)
          }}
          suffixIcon={<DownOutlined/>}
        >
          {this.renderOptions()}
        </AntSelect>
        <Tooltip placement="top" title={this.props.t(`menus.settings.descriptions.${this.props.name}`)}>
          <div className="info">?</div>
        </Tooltip>
      </div>
    )
  }

  private renderOptions() {
    return this.props.options.map(option => this.renderOption(option))
  }

  private renderOption(option: Option) {
    const color = option.color
    return color
      ? this.renderColoredOption(option, color)
      : this.renderPlainOption(option)
  }

  private renderPlainOption(option: Option) {
    console.log(option,'option')
    return (
      <AntSelect.Option key={option.id} value={option.value}>
        {option.value}
      </AntSelect.Option>
    )
  }

  private renderColoredOption(option: Option, color: string) {
    return (
      <AntSelect.Option key={option.id} value={option.value}>
        <div
          className="select-container-color-dot"
          style={{backgroundColor: color}}>
          &nbsp;
        </div>
        {option.value}
      </AntSelect.Option>
    )
  }
}

export default withTranslation('dashboard')(DropdownField)