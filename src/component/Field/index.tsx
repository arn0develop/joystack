import React, { Component } from 'react'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'

interface Properties extends InputProps {
  label: string
  containerClassName?: string
}

export default class InputItem extends Component<Properties> {
  render() {
    const { label, containerClassName = '', ...inputProps } = this.props
    return (
      <div className={`input-item-content ${containerClassName}`}>
        <span>{label}</span>
        <Input {...inputProps} />
      </div>
    )
  }
}
