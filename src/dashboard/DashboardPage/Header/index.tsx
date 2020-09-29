import React from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Button, Menu} from 'antd'
import {
  DownOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import burgerIcon from '../../../assets/images/burger.png'
import {withTranslation, WithTranslation} from 'react-i18next'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {CombinedState, initialState} from 'src/state'
import * as accountState from 'src/login/state'
import * as sidebarState from '../../state/sidebar/actions'
import 'src/dashboard/DashboardPage/Header/style.scss'
import redirect from 'src/redirect'
import {toggleSidebar} from '../../state/sidebar/actions'


function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators(
    {
      logout: accountState.logout,
      toggleSidebar: sidebarState.toggleSidebar
    },
    dispatch
  )
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    account: state.account.account,
    session: state.account.session,
    isOpenBurger: state.dashboard.sidebar.isOpen
  }
}

type StateProperties = ReturnType<typeof mapStateToProperties>
type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type Properties = StateProperties & DispatchProperties & WithTranslation

class Header extends React.Component<Properties> {
  render() {
    const {t, account,toggleSidebar} = this.props
    const accountName = account?.name || 'steve'
    return (
      <header className="dashboard-header">
        <div className=" dashboard-header-content">
          <div style={{display:'flex',alignItems:'center'}}>
            <div className={`burger ${this.props.isOpenBurger ? 'is-active' : ''}`} onClick={toggleSidebar} id="hamburger-1">
              <span className="line"/>
              <span className="line"/>
              <span className="line"/>
            </div>
            <div>
              <Link to="/">
                <img
                  width="150px"
                  src="/images/logo/joystack_logo.svg"
                  alt="joystack"
                />
              </Link>
            </div>
          </div>
          <div className="logout-content">
            <a href="https://forum.joystack.com/" className="forum">
              {t('header.forum')}
            </a>
            <Dropdown
              trigger={['click']}
              placement="bottomCenter"
              overlayClassName="header-language-dropdown"
              overlay={
                <Menu>
                  <Menu.Item onClick={() => redirect('/dashboard/profile')}
                    icon={<SettingOutlined/>}>
                    {t('header.settings')}
                  </Menu.Item>
                  <Menu.Item onClick={() => redirect('/dashboard/upgrade')}
                    icon={<ThunderboltOutlined/>}>
                    {t('header.upgradeToPro')}
                  </Menu.Item>
                  <Menu.Item key="11" onClick={() => Header.logout()}
                    icon={<LogoutOutlined/>}>
                    {t('header.logout')}
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                <img
                  className="user-image"
                  src={`https://minotar.net/helm/${accountName}`}
                  width="35"
                  alt="user"
                />
                <DownOutlined/>
              </Button>
            </Dropdown>
          </div>
        </div>
      </header>
    )
  }

  private static logout() {
    window.location.href = '/logout'
  }
}

const connected = connect(mapStateToProperties, mapDispatchToProperties)(Header)
export default withTranslation('dashboard')(connected)
