import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { CopyOutlined, FileTextOutlined, MoreOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'
import Backup from 'src/dashboard/DashboardPage/Menu/DataMenu/Backup'
import { files, entries } from 'src/dashboard/DashboardPage/Menu/DataMenu/dataMenuFakeData'
import DragAndDrop from 'src/dashboard/DashboardPage/Menu/DataMenu/DragAndDrop'
import Editable from 'src/dashboard/DashboardPage/Menu/SettingsMenu/Input'
import 'src/dashboard/DashboardPage/Menu/DataMenu/style.scss'
import Activity, { Entry } from './Activity'
import { Switch } from 'antd'
import Popup from '../../Popup'

interface State {
  isCopied: boolean
  entries: Entry[]
  isModalOpen: boolean
}

interface RenderItem {
  id: string
  size: string
  name: string
}

class DataMenu extends React.Component<WithTranslation, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      isCopied: false,
      entries: [],
      isModalOpen: false,
    }
  }

  setModalVisibility = (isModalOpen: boolean): void => {
    this.setState({ isModalOpen })
  }

  render() {
    const textToCopy = 'xyz.com/server/aaa'
    const { isCopied, isModalOpen } = this.state

    const { t } = this.props

    return (
      <div className="data-menu-content">
        <div className="share-project-content dashboard-card">
          <div className="title">{t('DATA_MENU.SHARE_YOUR_PROJECT_VIA_LINK')}</div>
          <div className="main">
            <div className="editable-item">
              <span>
                <b>{t('DATA_MENU.DESCRIPTION')}: </b>
              </span>
              <p>
                <Editable editableTag="span" editableText={t('DATA_MENU.DESCRIPTION_DETAIL')} />
              </p>
            </div>
            <div className="activity">
              <b>Status:</b>
              <span>Active</span>
              <Switch defaultChecked />
            </div>
            <div className="expire-time">
              <b>Expires:</b>
              <span>12 days</span>
              <Tooltip placement="top" title={t('DATA_MENU.INFO')}>
                <div className="info">?</div>
              </Tooltip>
            </div>
            <div className="copy-to-clipboard-content">
              <CopyToClipboard
                text={textToCopy}
                onCopy={() =>
                  this.setState({ isCopied: true }, () => {
                    setTimeout(() => this.setState({ isCopied: false }), 800)
                  })
                }
              >
                <div className="copy-link-content">
                  <p className={isCopied ? 'copied' : ''}>{isCopied ? 'Copied!' : textToCopy}</p>
                  <CopyOutlined />
                </div>
              </CopyToClipboard>
            </div>
            <div className="link-button-content">
              <button>Link customization</button>
            </div>
            <div className="last-change">
              <span>
                <b>{t('DATA_MENU.LAST_CHANGE')}: </b>
              </span>
              <span>14.05.2020, 17:56</span>
            </div>
            <div className="link-button-content">
              <button>{t('DATA_MENU.UPDATE_LINK')}</button>
            </div>
          </div>
        </div>
        <Backup
          title={t('DATA_MENU.SERVER_BACKUP')}
          backupName="Bubicraft.net"
          generateImage={() => (
            <img src="/images/dashboard_joystack.png" alt="Dashboard joystack" />
          )}
        />
        <Backup
          title={t('DATA_MENU.WORLD_BACKUP')}
          backupName="Blockwars"
          generateImage={() => <img src="/images/Blockwars.png" alt="Blockwars" />}
        />
        <div className="file-manager-content dashboard-card">
          <div className="title">{t('DATA_MENU.FILE_MANAGER')}</div>
          <DragAndDrop
            renderItem={({ id, size, name }: RenderItem) => (
              <div className="file-content" key={id}>
                <FileTextOutlined />
                <span>{name}</span>
                <span className="file-size">{size}</span>
                <MoreOutlined />
              </div>
            )}
            draggableItems={files}
          />
        </div>
        <Backup
          title={t('DATA_MENU.DATABASE_BACKUP')}
          backupName="Bubicraft.net"
          generateImage={() => (
            <img src="/images/dashboard_joystack.png" alt="Dashboard joystack" />
          )}
        />
        <div className="my-sql-access-content dashboard-card">
          <div className="title">{t('DATA_MENU.MYSQL_ACCESS')}</div>
          <span>
            <b>Database -123435.ud-joystack.net</b>
          </span>
          <div className="database-details">
            <span>{t('DATA_MENU.NAME')} dbu1234</span>
            <span>{t('DATA_MENU.USER')} Ich1234</span>
          </div>
        </div>
        <Activity entries={entries} />
        <div className="google-sign-in-content dashboard-card">
          <span className="title">{t('DATA_MENU.CONNECT_TO_GOOGLE_TO_SYNC')}</span>
          <button>
            <img src="/images/google.png" alt="google" />
            <span>{t('DATA_MENU.signInWithGoogle_ACCOUNT')}</span>
          </button>
        </div>
        <div className="restore-standard-button-content">
          {/* <Popup
            renderButtons={() => (
              <>
                <button
                  onClick={() => this.setModalVisibility(false)}
                  key="no"
                  className="light-gray"
                >
                  No
                </button>
                <button onClick={() => this.setModalVisibility(false)} key="yes" className="">
                  Yes
                </button>
              </>
            )}
            isOpen={isModalOpen}
            setModalVisibility={this.setModalVisibility}
            modalClassName={'delete-popup'}
            title={'Really want delete project?'}
          ></Popup> */}
          <button onClick={() => this.setModalVisibility(true)} className="restore-standard-button">
            {t('DATA_MENU.PROJECT_DELETE')}
          </button>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(DataMenu)
