import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Select } from 'antd'
import advantages from 'src/dashboard/DashboardPage/Upgrade/advantages'
import 'src/dashboard/DashboardPage/Upgrade/style.scss'

const { Option } = Select

class Upgrade extends React.Component<WithTranslation> {
  render() {
    const [titleList, freeList, proList] = advantages
    const { t } = this.props
    return (
      <div className="pro-upgrade-content">
        <div className="payment-content">
          <div className="joystack-pro-image-content">
            <img src="/images/joystack_pro.png" alt="Joystack pro" />
          </div>
          <div className="advantages">
            <div>
              <img src="/images/checkmark_outlined.png" alt="checkmark" />
              <span>99% {t('PRO_UPGRADE.UPTIME')}</span>
            </div>
            <div>
              <img src="/images/checkmark_outlined.png" alt="checkmark" />
              <span>{t('PRO_UPGRADE.IMMEDIATE_DEPLOYMENT')}</span>
            </div>
            <div>
              <img src="/images/checkmark_outlined.png" alt="checkmark" />
              <span>{t('PRO_UPGRADE.SECURE_PAYMENT_PROCESSING')}</span>
            </div>
          </div>
          <div className="payment-box">
            <div className="joystack-pro-logo-content">
              <img src="/images/logo_joystack_pro.png" alt="checkmark" />
            </div>
            <div className="select-upgrade-version-content">
              <Select defaultValue="14.99$" dropdownClassName="payment-dropdown">
                <Option value="14.99$">
                  <span className="old-term">1 {t('PRO_UPGRADE.MONTH')}</span>
                  <span className="new-term">2 {t('PRO_UPGRADE.MONTHS')}</span>
                  <span>€14.99</span>
                </Option>
                <Option value="Test">Test</Option>
              </Select>
            </div>
            <div className="cart-button-content">
              <button>{t('PRO_UPGRADE.IN_THE_CART')}</button>
            </div>
          </div>
        </div>
        <p className="pro-upgrade-description">
          {t('PRO_UPGRADE.PRO_UPGRADE_DESCRIPTION')}
        </p>
        <div className="compare-free-and-pro-container">
          <div className="compare-free-and-pro-content">
            <div className="item-name-content list-box">
              <ul className="list name-list-items">
                {titleList.map(({ imageUrl, name, id }) => (
                  <li key={id}>
                    <img src={imageUrl} alt="#" />
                    <span>{t(`PRO_UPGRADE.${name}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="free-content list-box">
              <div className="title free-title">{t('PRO_UPGRADE.FREE')}</div>
              <ul className="list pro-and-free-list">
                {freeList.map(({ imageUrl, description, id }) => (
                  <li key={id}>
                    {imageUrl ? (
                      <img src={imageUrl} alt="#" width={20} />
                    ) : (
                      <span>{t(`PRO_UPGRADE.${description}`)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pro-content list-box">
              <div className="title pro-title">{t('PRO_UPGRADE.PRO')}</div>
              <ul className="list pro-and-free-list">
                {proList.map(({ imageUrl, description, id }) => (
                  <li key={id}>
                    {imageUrl ? (
                      <img src={imageUrl} alt="#" />
                    ) : (
                      <span>{t(`PRO_UPGRADE.${description}`)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(Upgrade)
