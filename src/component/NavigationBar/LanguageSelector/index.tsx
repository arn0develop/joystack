import React from 'react'
import {Button, Dropdown, Menu} from 'antd'
import LanguageButton from 'src/component/NavigationBar/LanguageButton'
import 'src/component/NavigationBar/style.scss'
import { CombinedState, initialState } from 'src/state'
import { bindActionCreators, Dispatch} from 'redux'
import { connect } from 'react-redux'
import * as translationState from 'src/translations/state'

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
type Properties = StateProperties & DispatchProperties

class LanguageSelector extends React.Component<Properties> {
  render() {
    const { changeLanguage, language } = this.props

    const flagFromLanguage = {
      en: 'gb',
      de: 'de'
    }

    const link = `https://www.countryflags.io/${flagFromLanguage[language]}/flat/48.png`
    return (
      <li className="nav-item dropdown joystack-navigation-bar-item">
        <Dropdown
          placement="bottomCenter"
          trigger={['click']}
          overlay={
            <Menu className="language-dropdown">
              <Menu.Item>
                <LanguageButton onClick={() => changeLanguage('en')} language="en" flag="gb" />
              </Menu.Item>
              <Menu.Item>
                <LanguageButton onClick={() => changeLanguage('de')} language="de" flag="de" />
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
            <img src={link} alt={language}/>
          </Button>
        </Dropdown>
      </li>
    )
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(LanguageSelector)