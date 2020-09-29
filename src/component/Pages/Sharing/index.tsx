import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Select, Input } from 'antd'
import NavigationBar from 'src/component/NavigationBar'
import 'src/component/Pages/Sharing/style.scss'

class Sharing extends React.Component<WithTranslation> {
  render() {
    const background = `url(${process.env.PUBLIC_URL}/images/sharing_background.png`
    const { t } = this.props
    return (
      <div className="sharing-container" style={{ background }}>
        <NavigationBar />
        <div className="sharing-content">
          <div className="welcome-bubicraft-server-content">
            <div className="bubicraft-image-content">
              <img src="/images/sharing_bubicraft.png" alt="Bubicraft" />
            </div>
            <div className="welcome-bubicraft-server-description">
              <h5>{t('BUBICRAFTS_WELCOME_SERVER')}</h5>
              <p>
                <b>{t('DESCRIPTION')}:</b>{' '}
                <span>{t('ABOUT_WELCOME_SERVER')}</span>
              </p>
              <p>
                <b>{t('LAST_CHANGE')}:</b>{' '}
                <span>14.05.20 17:56 {t('P_M')}</span>
              </p>
              <p>
                <b>{t('CREATED_BY')}:</b> <span>Ehrenoma</span>
              </p>
            </div>
          </div>
          <div className="server-details">
            <p>
              <img src="/images/sharing_checked.png" alt="checked" />
              <span>
                {t('THIS_SERVER_PROJECT_CAN_BE_IMPORTED_AND_STARTED')}
              </span>
            </p>
            <p>
              <img src="/images/sharing_unchecked.png" alt="unchecked" />
              <span>
                {t(
                  'THE_CREATOR_HAS_DETERMINED_THAT_THIS_PROJECT_WILL_NOT_CONTINUE'
                )}
              </span>
            </p>
          </div>
          <div className="select-server-content">
            <Input placeholder="Bubbicraft" />
            <Select defaultValue=".xyz.mc">
              <Select.Option value=".xyz.mc">.xyz.mc</Select.Option>
              <Select.Option value="test">Test</Select.Option>
            </Select>
          </div>
          <div className="import-button-content">
            <button>
              {t('IN')}
              <img src="/images/sharing_joystack.png" alt="joystack" />
              {t('IMPORT')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('SHARING_PAGE')(Sharing)
