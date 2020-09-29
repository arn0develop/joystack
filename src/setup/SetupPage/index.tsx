import React from 'react'
import {Steps} from 'antd'
import {Link} from 'react-router-dom'
import {RouteComponentProps, withRouter} from 'react-router'
import Footer from 'src/component/Footer'
import 'src/setup/SetupPage/style.scss'
import redirect from 'src/redirect'
import {connect} from 'react-redux'
import {CombinedState, initialState} from 'src/state'
import {withTranslation, WithTranslation} from 'react-i18next'
import {createSpecialDot} from './SpecialDot'
import Router from './Router'
import {findRouteForLocation} from './steps'
import Mode from './mode'
import BackButton from './BackButton'
import SkipButton from './SkipButton'

function mapStateToProperties(state: CombinedState = initialState) {
  return { configuration: state.realm.wizard }
}

interface OwnProperties {
  mode: Mode
}

type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties =
  OwnProperties
  & RouteComponentProps<any>
  & StateProperties
  & WithTranslation

class SetupPage extends React.Component<Properties> {
  render() {

    const {mode, location} = this.props
    console.log('mode',mode)
    return (
      <div
        className={`setup-up-container ${mode.isDashboard && 'setup-up-container-dashboard'}`}>
        <div className="steps-content">
          {!mode.isDashboard && this.renderHeader()}
          {this.renderSteps()}
        </div>
        <div className="setup-step-container">
          <Router mode={mode}/>
          {(location.pathname === '/start' || location.pathname === '/dashboard/new') &&
          <SkipButton/>}
        </div>
        {!mode.isDashboard && <Footer/>}
      </div>
    )
  }

  private renderHeader() {
    return (
      <div className="logo">
        <Link to="/">
          <img width="150px" src={'/images/logo/joystack_logo.svg'} alt="logo"/>
        </Link>
      </div>
    )
  }

  private renderSteps() {
    const {t, location} = this.props
    return (
      <Steps
        current={findRouteForLocation(location.pathname)}
        progressDot={createSpecialDot}
      >
        <Steps.Step
          className={this.isPartialStep() ? 'half' : ''}
          onClick={() => redirect(location.pathname.includes('/start') ? '/start' : '/dashboard/new')}
          title={t('SERVER_TYPE')}
        />
        {!this.props.mode.path.includes('/dashboard/edit') &&
          <>
            <Steps.Step title={t('DOMAIN')}/>
            <Steps.Step title={t('WORLD_SELECTION')}/>
            <Steps.Step title={t('START_THE_SERVER')}/>
          </>
        }
      </Steps>
    )
  }

  private isPartialStep(): boolean {
    const {location: {pathname}} = this.props
    return ['/modpack', '/minecraft'].includes(pathname)
  }
}

export default connect(mapStateToProperties)(withTranslation('SETUP_PAGE')(withRouter(SetupPage)))