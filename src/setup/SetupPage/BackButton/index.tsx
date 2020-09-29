import React from 'react'
import 'src/setup/SetupPage/ProceedButton/style.scss'
import {withTranslation, WithTranslation} from 'react-i18next'
import {ArrowLeftOutlined} from '@ant-design/icons/lib'
import redirect from 'src/redirect'
import {RouteComponentProps, withRouter} from 'react-router'
import 'src/setup/SetupPage/BackButton/style.scss'

interface Properties {
  previousPage?: string
  className?: string
}

class BackButton extends React.Component<WithTranslation & Properties & RouteComponentProps> {
  render() {
    return (
      // <button className='back-button' onClick={() => redirect(this.props.previousPage)}>
      <div className={`back-button-container ${this.props.className}`}>
          <button className={`back-button`} onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined/> {this.props.t('BACK')}
        </button>
      </div>
    )
  }
}

export default withTranslation('SETUP_PAGE')(withRouter(BackButton))