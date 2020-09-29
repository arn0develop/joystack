import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import Button from 'src/component/Button'
import Badge from 'src/component/Badge'
import 'src/home/HomePage/Header/style.scss'

class Header extends React.Component<WithTranslation> {
  private static generateRandomInBounds = (begin: number, end: number): number => {
    return Math.floor(Math.random() * (end - begin + 1)) + begin
  }

  private static selectRandomItem = (items: string[]): string => {
    return items[Math.floor(Math.random() * items.length)]
  }

  private createBadge = () => {
    const { t } = this.props
    const onlineCount = Header.generateRandomInBounds(0, 1000)
    return (
      <Badge
        imageSource="https://media.joystack.com/servericons/joystack-logo.png"
        description={{
          name: t('HEADER.ONE_OF_YOUR_FREE_SERVERS'),
          firstMessageLine: `
            <p>
              <span style="color: #FFF65F">${t('HEADER.FREE')}</span>
              <span style="color: #3FE3E2">${t('HEADER.FULL_CONTROL')}</span>
              <span style="color: #3FE343">${t('HEADER.MODS_PLUGINS')}</span>
              <span style="color: #B767F0">(1.8-1.14.3)</span>
            </p>`,
          secondMessageLine: `
            <p style="color: #F86A3E">
              ${t('HEADER.PICK_YOUR_OWN_DOMAIN_HOSTED_BY_JOYSTACK')}
            </p>`,
          onlineCount: onlineCount,
          onlineLimit: 100,
        }}
      />
    )
  }

  render() {
    const background = 'url(/images/background.png)'
    const { t } = this.props
    return (
      <header className="app-header" style={{background}}>
        <div className="home-catchphrase">
          <h1>
            {t('HEADER.A_NEW_WAY_TO_CREATE_MINECRAFT_SERVERS_AND_SHARE_CONTENT')}
          </h1>
        </div>
        <div className="home-badge">{this.createBadge()}</div>
        <Button
          action={() => {window.location.href = '/start'}}
          text={t('HEADER.START_SERVER_FOR_FREE')}
          width={300}
        />
      </header>
    )
  }
}

export default withTranslation('HOME_PAGE')(Header)
