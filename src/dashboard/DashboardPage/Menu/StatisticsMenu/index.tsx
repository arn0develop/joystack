import React from 'react'
import {withTranslation, WithTranslation} from 'react-i18next'
import {Progress, Tooltip} from 'antd'
import './style.scss'

class StatisticsMenu extends React.Component<WithTranslation> {
  render() {
    const {t} = this.props
    return (
      <div className="statistics-menu-content">
        <div className="statistic-top-boxes-content">
          <div className="statistic-top-box dashboard-card">
            <img src="/images/start_project.svg" alt="Start project"/>
            <div className="description">
              <span>
                <b>23.05.2020</b>
              </span>
              <span>{t('STATISTICS_MENU.PROJECT_STARTED')}</span>
            </div>
          </div>
          <div className="statistic-top-box dashboard-card">
            <img src="/images/unique_server.svg" alt="Message"/>
            <div className="description">
              <span>
                <b>432</b>
              </span>
              <span>{t('STATISTICS_MENU.UNIQUE_USER')}</span>
            </div>
          </div>
          <div className="statistic-top-box dashboard-card">
            <img src="/images/mail_server.svg" alt="Start project"/>
            <div className="description">
              <span>
                <b>524</b>
              </span>
              <span>{t('STATISTICS_MENU.MAIL_SERVER_STARTED')}</span>
            </div>
          </div>
          <div className="statistic-top-box dashboard-card">
            <img src="/images/plugins_in_use.svg" alt="Upload"/>
            <div className="description">
              <span>
                <b>4</b>
              </span>
              <span>{t('STATISTICS_MENU.PLUGINS_IN_USE')}</span>
            </div>
          </div>
        </div>
        <div className="share-link-statistics-content dashboard-card">
          <span className="title">
            {t('STATISTICS_MENU.SHARE_LINK_STATISTICS')}
            <Tooltip placement="top" title="info" >
              <div className="info">?</div>
            </Tooltip>
          </span>
          <div className="import-description-content">
            <div className="total-imports description-item">
              <div className="logo-content">
                <img src="/images/total_imports.svg" alt="Total"/>
              </div>
              <div>
                <b>0</b> <br/>
                <span>Total imports</span>
              </div>
            </div>
            <div className="last-imports description-item">
              <div className="logo-content">
                <img src="/images/last_import.svg" alt="Total"/>
              </div>
              <div>
                <b>2 days ago</b> <br/>
                <span>Last import</span>
              </div>
            </div>
            <div className="link-expires description-item">
              <div className="logo-content">
                <img src="/images/link_expires.svg" alt="Total"/>
              </div>
              <div>
                <b>3d 54min</b> <br/>
                <span>Last expires</span>
              </div>
              <Tooltip placement="top" title="info" >
                <div className="info">?</div>
              </Tooltip>
            </div>
          </div>
          {/* <p>{t('STATISTICS_MENU.USERS_HAVE_TO_IMPORT_YOUR_PROJECT')}</p> */}
          {/* <p className="helper-text">
            {t(
              'STATISTICS_MENU.YOU_CAN_FIND_YOUR_SHARE_LINK_UNDER_DATA_ABOUT_WHICH_OTHER_USERS_CAN_IMPORT_YOUR_PROJECT'
            )}
          </p> */}
        </div>
        <div className="server-performance-content dashboard-card">
          <span className="title">
            {t('STATISTICS_MENU.SERVER_PERFORMANCE')}
            <Tooltip placement="top" title="info" >
              <div className="info">?</div>
            </Tooltip>
          </span>
          <div className="progress-content">
            <div className="memory-information">
              <span>{t('STATISTICS_MENU.STORAGE_SPACE')}</span>
              <div className="progress-bar-content">
                <span>12.6</span>
                <Progress percent={50} showInfo={false}/>
                <span>15 GB</span>
              </div>
            </div>
            <div className="memory-information">
              <span>{t('STATISTICS_MENU.RANDOM_ACCESS_MEMORY')}</span>
              <div className="progress-bar-content">
                <span>83%</span>
                <Progress percent={83} showInfo={false}/>
                <span>2010 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(StatisticsMenu)
