import React from 'react'
import { Tooltip, Upload } from 'antd'
import 'src/setup/SetupPage/Step/WorldSetup/MapSelection/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'

class MapSelection extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <div className="map-selection-content">
        <span className="title">{t('MAP_SELECTION')}</span>
        <hr />
        <div className="map-generator">
          <div className="auto-map-generator">
            <span className="description">{t('AUTO_MAP_GENERATION')}</span>
            <button className="map-generator-button">{t('GENERATE_NEW_MAP')}</button>
            <Tooltip placement="top" title={t('INFO')}>
              <div className="info">?</div>
            </Tooltip>
          </div>
          <div className="upload">
            <span className="description">{t('UPLOAD_YOUR_OWN')}</span>
            <Upload>
              <span>{t('BROWSE')}</span>
              <div className="icon-content">
                <img src="/images/upload.png" alt="upload" />
              </div>
            </Upload>
            <Tooltip placement="top" title={t('INFO')}>
              <div className="info">?</div>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('SETUP_PAGE')(MapSelection)
