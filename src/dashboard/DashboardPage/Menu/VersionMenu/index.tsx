import React from 'react'
import {DownloadOutlined} from '@ant-design/icons'
import {Button, Select} from 'antd'
import {withTranslation, WithTranslation} from 'react-i18next'
import 'src/dashboard/DashboardPage/Menu/VersionMenu/style.scss'

class VersionMenu extends React.Component<WithTranslation> {
  render() {
    const {t} = this.props
    return (
      <div className="version-menu-content">
        <div className="upload-server-content dashboard-card">
          <span className="title">{t('VERSION_MENU.JAVA_SERVER')}</span>
          <hr/>
          <div>
            <Select defaultValue="Version">
              <Select.Option value="1.14">1.14</Select.Option>
              <Select.Option value="1.8.8">1.8.8</Select.Option>
            </Select>
            <Button>
              <DownloadOutlined/>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(VersionMenu)