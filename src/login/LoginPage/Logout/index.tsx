import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import React from 'react'
import redirect from 'src/redirect'
import * as accountState from 'src/login/state'
import { withTranslation, WithTranslation } from 'react-i18next'

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    logout: accountState.logout,
  }, dispatch)
}

interface OwnProperties {
  redirect?: string
}

type Properties = OwnProperties & ReturnType<typeof mapDispatchToProperties> & WithTranslation

/**
 * Logs the user out of the current account as soon as the DashboardPage is
 * loaded. Should be used as a temporary page and routing target for
 * every logout action.
 */
class Logout extends React.Component<Properties> {
  render() {
    const { t } = this.props
    return (<div className="animated fadeIn pt-3 text-center">{t('loading')}</div>)
  }

  componentDidMount() {
    this.props.logout()
    const destination = this.props.redirect || '/'
    redirect(destination)
  }
}

export default connect(null, mapDispatchToProperties)(withTranslation('login')(Logout))