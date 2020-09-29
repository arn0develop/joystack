import * as React from 'react'
import ProceedButton from 'src/setup/SetupPage/ProceedButton'
import redirect from '../../../redirect'
import './style.scss'
import BackButton from '../BackButton'

interface Properties {
  preventRedirect?: boolean
  next: string
  hideNavigation?: boolean
  content: React.ReactNode
  onProceed?: () => void
}

export default class Step extends React.Component<Properties> {
  render() {
    return (
      <div className="step-container">
        <div className="step-content">
          {this.props.content}
        </div>
        {!this.props.hideNavigation && this.renderNavigation()}
      </div>
    )
  }

  private renderNavigation() {
    const version = this.props.next.split('/').slice(-1)[0]

    return (
      <div className="step-navigation">
        <BackButton/>
        <ProceedButton titleT={version === 'version' ? 'REINSTALL': null} submit={() => {
          const proceedListener = this.props.onProceed
          if (proceedListener) {
            proceedListener()
          }
          redirect(this.props.next)
        }}/>
      </div>
    )
  }
}