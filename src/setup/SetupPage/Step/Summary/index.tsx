import React from 'react'
import {connect} from 'react-redux'
import SignUpForm from 'src/login/LoginPage/RegisterForm'
import {CombinedState, initialState} from 'src/state'
import 'src/setup/SetupPage/Step/Summary/style.scss'
import {withTranslation, WithTranslation} from 'react-i18next'
import Badge from 'src/component/Badge'
import Mode from '../../mode'
import ProceedButton from '../../ProceedButton'
import redirect from '../../../../redirect'
import {createFullDomainName} from '../../../state/wizard'
import BackButton from '../../BackButton';

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    icon: state.realm.wizard.icon,
    realmDescription: state.realm.wizard.realmDescription
  }
}

interface OwnProperties {
  mode: Mode
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & WithTranslation

class Summary extends React.Component<Properties> {
  render() {
    const {t,mode} = this.props
    return (
      <>
        <main className={`status-card-body ${mode.isDashboard && 'dashboard-page'}`}>
          <div className="badge-content">
            <h4>
              {t('summary.title')}
            </h4>
            <span className="description">{t('summary.description')}</span>
            <Badge
              shadow
              imageSource={this.props.icon?.imagePath || ''}
              description={{
                firstMessageLine: `<p style="color: #3FE3E2">${this.props.realmDescription.text} Server</p>`,
                secondMessageLine: '<p style="color: #FFF65F">hosted by joystack.com</p>',
                name: createFullDomainName(this.props.realmDescription.domainName, this.props.realmDescription.subDomain) || 'none',
                onlineCount: 0,
                onlineLimit: 10
              }}
            />
          </div>
          {mode.isDashboard
            ? <div className="step-navigation">
              <BackButton/>
              <ProceedButton
                submit={() => redirect(`${mode.path}/complete`)}/>
            </div>
            :
            <div className="signup-container">
              <SignUpForm hiddenHeader hiddenFooter redirect={`${mode.path}/complete`}/>
            </div>
          }
        </main>
        {mode.isDashboard || <BackButton className='summary-page'/>}
      </>
    )
  }
}

export default connect(mapStateToProperties, {})(withTranslation('setup')(Summary))