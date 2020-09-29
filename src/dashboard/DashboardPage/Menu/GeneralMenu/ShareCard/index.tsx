import * as React from 'react'
import 'src/dashboard/DashboardPage/Menu/GeneralMenu/ShareCard/style.scss'
import {
  CopyOutlined,
  ToolFilled,
  TwitterOutlined
} from '@ant-design/icons/lib'
import redirect from 'src/redirect'
import CopyToClipboard from 'react-copy-to-clipboard'
import {withTranslation, WithTranslation} from 'react-i18next'

interface State {
  isCopied: boolean
}

class ShareCard extends React.Component<WithTranslation, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      isCopied: false,
    }
  }
  render() {
    const { isCopied } = this.state
    const { t } = this.props
    const textToCopy = 'share.joystack.com/xgyawetz'
    return (
      <div className="share-card dashboard-card">
        <div className="share-card-header">
          <span className='title'>
            <img src="/images/share_server.svg" alt="Share" />
            <b>{t('menus.general.link.title')}</b>
          </span>
        </div>
        <div className="share-card-content">
          <CopyToClipboard
            text={textToCopy}
            onCopy={() =>
              this.setState({ isCopied: true }, () => {
                setTimeout(() => this.setState({ isCopied: false }), 800)
              })
            }
          >
            <div className="share-card-link">
              <p className={isCopied ? 'copied' : '' }>{isCopied ? 'Copied!' : textToCopy }</p>
              <CopyOutlined/>
            </div>
          </CopyToClipboard>
          <div className="share-card-buttons">
            <TwitterOutlined />
          </div>
          <ToolFilled onClick={() => redirect('/dashboard/data')} />
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(ShareCard)