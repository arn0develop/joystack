import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import {Popover} from 'antd'
import LoginPage, { Type } from 'src/login/LoginPage'
import 'src/component/NavigationBar/style.scss'

class SignInButton extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <li className="nav-item signin-item">
        <Popover className="login-popover" placement="bottom" content={<LoginPage type={Type.LOGIN}/>} trigger="click">
          <button className="signin-button nav-link signin-link d-flex justify-content-center align-content-between">
            <i className="material-icons-outlined mr-1">{t('LOCK')}</i>
            <span>{t('LOG_IN')}</span>
          </button>
        </Popover>

      </li>
    )
  }
}

export default withTranslation('NAVIGATION_BAR')(SignInButton)