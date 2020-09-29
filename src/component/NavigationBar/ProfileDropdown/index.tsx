import React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {Button, Dropdown, Menu} from 'antd'
import {
  DownOutlined,
  LogoutOutlined, SettingOutlined,
  ThunderboltOutlined
} from '@ant-design/icons/lib'
import {Account} from '@joystack/protocol/user/account'
import 'src/component/NavigationBar/ProfileDropdown/style.scss'
import * as accountState from 'src/login/state'
import { withTranslation, WithTranslation } from 'react-i18next'
import redirect from '../../../redirect'

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    logout: accountState.logout,
  }, dispatch)
}

interface DropdownProperties {
  account: Account.AsObject | null
  dashboard: boolean
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type Properties = DropdownProperties & DispatchProperties & WithTranslation

class ProfileDropdown extends React.Component<Properties> {
  render() {
    const name = this.props.account?.name || 'steve'
    const { t } = this.props
    return (
      <Dropdown
        trigger={['click']}
        placement="bottomCenter"
        overlayClassName="header-dropdown"
        overlay={
          <Menu
          >
            {this.props.dashboard
              ? <Menu.Item onClick={() => redirect('/dashboard/settings')}
                icon={<SettingOutlined/>}>{t('SETTINGS')}</Menu.Item>
              : <Menu.Item onClick={() => redirect('/dashboard')}
                icon={<SettingOutlined/>}>{t('DASHBOARD')}</Menu.Item>
            }
            <Menu.Item onClick={() => redirect('/dashboard/upgrade')} icon={<ThunderboltOutlined/>}>{t('UPGRADE')}</Menu.Item>
            <Menu.Item onClick={() => redirect('/logout')} icon={<LogoutOutlined/>}>{t('LOGOUT')}</Menu.Item>
          </Menu>
        }>
        <Button>
          <img
            className="user-image"
            src={`https://minotar.net/helm/${name}`}
            width="35"
            alt="user"
          />
          <DownOutlined/>
        </Button>
      </Dropdown>
    )
  }
}

export default connect(null, mapDispatchToProperties)(withTranslation('NAVIGATION_BAR')(ProfileDropdown))