import React from 'react'
import UserSet from 'src/dashboard/DashboardPage/Menu/PlayersMenu/UserSet'
import {withTranslation, WithTranslation} from 'react-i18next'
import 'src/dashboard/DashboardPage/Menu/PlayersMenu/style.scss'

class PlayersMenu extends React.Component<WithTranslation> {
  render() {
    const {t} = this.props
    return (
      <div className="players-menu-content">
        <UserSet title={t('PLAYERS_MENU.OPERATOR')}/>
        <UserSet title={t('PLAYERS_MENU.WHITELIST')}/>
        <UserSet title={t('PLAYERS_MENU.BANNED_USERS')}/>
        <UserSet title={t('PLAYERS_MENU.BANNED_IPS')}/>
      </div>
    )
  }
}

export default withTranslation('dashboard')(PlayersMenu)
