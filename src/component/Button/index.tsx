import React from 'react'
import 'src/component/Button/style.scss'

interface Properties {
  text: string
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  width: number
}

export default class Button extends React.Component<Properties> {
  render() {
    return (
      <button
        className="joystack-button no-outline"
        style={{width: this.props.width}}
        onClick={event => this.props.action(event)}
      >
        <p className="joystack-button__text unselectable-text" unselectable="on">
          {this.props.text}
        </p>
      </button>
    )
  }
}
