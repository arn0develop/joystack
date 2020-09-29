import * as React from 'react'
import 'src/component/NavigationBar/style.scss'
import ProfileDropdown from 'src/component/NavigationBar/ProfileDropdown'
import {Account} from '@joystack/protocol/user/account'
import {connect} from 'react-redux'
import {CombinedState, initialState} from 'src/state'
import {withTranslation, WithTranslation} from 'react-i18next'
import SignInButton from 'src/component/NavigationBar/SignInButton'
import LanguageSelector from 'src/component/NavigationBar/LanguageSelector'

const profileDropdown = (account: Account.AsObject | null, dashboard: boolean) => {
  return <ProfileDropdown dashboard={dashboard} account={account}/>
}

const guestButtons = () => [
  <SignInButton key='guest-signin-button'/>,
  <LanguageSelector key='guest-language-selector'/>
]

class Toggler extends React.Component<any> {
  render() {
    return (
      <button
        className="navbar-toggler collapsed"
        data-target="#navbarContent"
        data-toggle="collapse"
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </button>
    )
  }
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    account: state.account?.account,
    session: state.account?.session
  }
}

interface BarProperties {
  dashboard?: boolean
}

type Properties = BarProperties & ReturnType<typeof mapStateToProperties> & WithTranslation

class NavigationBar extends React.Component<Properties> {
  render() {
    const signedIn = this.props.session != null
    const { t } = this.props
    return (
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <a href="/" className="navbar-brand">
            <img
              src="/images/logo/joystack_logo.svg"
              width="148px"
              alt="joystack"
            />
          </a>
          <Toggler />
          <div className="navbar-collapse collapse" id="navbarContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link joystack-navigation-bar-item"
                  href="/support"
                >
                  {t('SUPPORT')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link joystack-navigation-bar-item"
                  href="/forum"
                >
                  {t('FORUM')}
                </a>
              </li>
              {signedIn
                ? profileDropdown(this.props.account, this.props.dashboard || false)
                : guestButtons()
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(mapStateToProperties, {})(withTranslation('NAVIGATION_BAR')(NavigationBar))
