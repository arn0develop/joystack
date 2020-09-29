import React from 'react'
import 'src/component/ErrorMessage/style.scss'
import { ExclamationCircleFilled } from '@ant-design/icons'

interface Properties extends React.HTMLAttributes<HTMLDivElement> {
  message: string | null
}

class ErrorMessage extends React.Component<Properties> {
  render() {
    const { message, ...contentProps } = this.props
    if (!message) {
      return null
    }
    return (
      <div {...contentProps} className="error-message-content">
        <span className="error-message">
          <ExclamationCircleFilled />
          {message}
        </span>
      </div>
    )
  }
}

export default ErrorMessage
