import React from 'react'
import 'src/component/AccordingButton/style.scss'

interface Properties extends React.HTMLProps<HTMLDivElement> {
  active?: boolean
}

export default class AccordingButton extends React.Component<Properties> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      toggler: true,
    }
  }

  render() {
    const {active, ...passedProperties} = this.props
    const disabledClass = 'accordion-button-disabled'
    return (
      <div
        {...passedProperties}
        className={'accordion-button ' + (active ? disabledClass : '')}
      >
        <span/>
        <span/>
      </div>
    )
  }
}