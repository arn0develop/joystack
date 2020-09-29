import React from 'react'
import { createPortal } from 'react-dom'
import 'src/component/FullScreen/style.scss'

interface Properties { 
  children: React.ReactNode
  additionalClassName?: string
}

class FullScreen extends React.Component<Properties> {
  render() {
    const { children, additionalClassName = '' } = this.props
    return createPortal(
      <div className={`fullscreen ${additionalClassName}`}>{children}</div>,
      document.body
    )
  }
}

export default FullScreen
