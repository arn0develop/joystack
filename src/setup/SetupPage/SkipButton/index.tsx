import React from 'react'
import 'src/setup/SetupPage/ProceedButton/style.scss'
import {withTranslation, WithTranslation} from 'react-i18next'
import redirect from '../../../redirect';
import {ArrowRightOutlined} from '@ant-design/icons/lib'
import {RouteComponentProps, withRouter} from 'react-router'
import 'src/setup/SetupPage/SkipButton/style.scss'

class SkipButton extends React.Component<WithTranslation & RouteComponentProps> {

  handleClick = () => {
    if (this.props.location.pathname === '/start') {
      redirect('/start/minecraft')
    } else {
      redirect('/dashboard/new/minecraft')
    }
  }

  render() {
    return (
      <div className='skip-button-container'>
        <button className="next-button" onClick={this.handleClick}>
          {this.props.t('SKIP')} <ArrowRightOutlined/>
        </button>
      </div>
    )
  }
}

export default withTranslation('SETUP_PAGE')(withRouter(SkipButton))