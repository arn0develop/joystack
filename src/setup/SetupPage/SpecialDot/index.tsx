import React from 'react'
import {Popover} from 'antd'

interface SpecialDotParameters {
  dot: any
  status: string
  index: number
}

export class SpecialDot extends React.Component<SpecialDotParameters> {
  render() {
    return  (
      <Popover
        content={
          <span>
            step {this.props.index} status: {this.props.status}
          </span>
        }>
        {this.props.dot}
      </Popover>
    )
  }
}

interface DotCreationParameters {
  index: number
  status: string
  title: string
  description: string
}

export function createSpecialDot(iconDot: any, parameters: DotCreationParameters): React.ReactNode {
  return <SpecialDot
    dot={iconDot}
    status={parameters.status}
    index={parameters.index}
  />
}

