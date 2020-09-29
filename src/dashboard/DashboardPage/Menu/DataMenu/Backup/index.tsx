import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { SyncOutlined, DownloadOutlined } from '@ant-design/icons'
import './style.scss'

interface Properties extends WithTranslation {
  generateImage: () => React.ReactNode
  title: string
  backupName: string
}

class Backup extends React.Component<Properties> {
  render() {
    const {
      t,
      generateImage,
      title,
      backupName,
    } = this.props
    return (
      <div className="backup-content">
        <div className="title">{title}</div>
        <div className="main-content">
          {generateImage()}
          <div className="description">
            <span>
              <b>{backupName}</b>
            </span>
            <span>{t('DATA_MENU.FROM')}</span>
          </div>
          <div className="options-content">
            <SyncOutlined />
            <DownloadOutlined />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(Backup)