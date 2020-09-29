import React from 'react'
import { InputNumber, Slider } from 'antd'
import './style.scss'

interface Properties {
  name: string
  value: number
  limit: number
  onChange: (value: number) => void
}

interface State {
  value: any
}

export default class Slide extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      value: this.props.value,
    }
  }

  private update(value: any) {
    this.setState({value: value})
    this.props.onChange(value as number)
  }

  render() {
    const { value } = this.state
    return (
      <div className="slide-container">
        <span>{this.props.name}</span>
        <InputNumber onChange={(updatedValue: any) => this.update(updatedValue)} min={1} max={this.props.limit} value={value} />
        <Slider onChange={(updatedValue: any) => this.update(updatedValue)} max={this.props.limit} defaultValue={this.props.value} value={value} />
      </div>
    )
  }
}
