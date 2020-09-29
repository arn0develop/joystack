import React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import 'src/component/Footer/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
import { CombinedState, initialState } from 'src/state'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as translationState from 'src/translations/state'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    language: state.translations.language
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    changeLanguage: translationState.changeLanguage,
  }, dispatch)
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = StateProperties & DispatchProperties & WithTranslation

class Footer extends React.Component<Properties> {
  render() {
    const { t, changeLanguage, language} = this.props
    const isGerman = language === 'de'
    return <div/>
    /*return (
      <div className="sign-up-footer-content">
        <Dropdown
          placement="topCenter"
          trigger={['click']}
          overlayClassName="footer-language-dropdown"
          overlay={
            <Menu className="language-dropdown">
              <Menu.Item onClick={() => changeLanguage('en')}>
                English
              </Menu.Item>
              <Menu.Item onClick={() => changeLanguage('de')}>
                Deutsch
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
            {isGerman? 'Deutsch' : 'English'}
            <DownOutlined />
          </Button>
        </Dropdown>
        <ul>
          <li>
            <a href={`https://${isGerman? 'fragen': 'help'}.joystack.com`}>{t('HELP')}</a>
          </li>
          <li>
            <Link to={`/privacy/${language}`}>{t('PRIVACY')}</Link>
          </li>
          <li>
            <Link to={`/terms/${language}`}>{t('TERMS_OF_USE')}</Link>
          </li>
        </ul>
      </div>
    )*/
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(withTranslation('SETUP_PAGE')(Footer))