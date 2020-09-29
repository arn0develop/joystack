import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { login } from 'src/login'
import redirect from 'src/redirect'
import * as accountState from 'src/login/state'
import 'src/login/LoginPage/form.scss'
import SocialButton from 'src/login/LoginPage/SocialButton'
import ErrorField from 'src/login/LoginPage/ErrorField'
import { TextField } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'

interface State {
  password: string
  email: string
  error: string
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    login: accountState.login,
    logout: accountState.logout
  }, dispatch)
}

interface OwnProperties {
  hiddenHeader?: boolean
  redirect?: string
  changeToRegister?: () => void
}


type Properties = OwnProperties & ReturnType<typeof mapDispatchToProperties> & WithTranslation

class LoginForm extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      password: '',
      email: '',
      error: ''
    }
  }

  render() {
    const { t } = this.props
    return (
      <div className="login-card">
        <div className="login-card__options">
          <div className="login-card__social_container">
            <div className="login-card-social-button__wrapper">
              <SocialButton
                text={t('signInWithGoogle')}
                type="google"
                brandImage="google"
              />
            </div>
          </div>
          <span className="login-card__or-spacer">{t('loginWithEmail')}</span>
          <form className="login-card__form">
            <div className="login-card__field">
              <TextField
                fullWidth
                type="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                required
                onChange={event => this.updateEmail((event.target as HTMLInputElement).value)}
              />
            </div>
            <div className="login-card__field">
              <TextField
                fullWidth
                type="password"
                label={t('password')}
                name="password"
                autoComplete="current-password"
                required
                onChange={event => this.updatePassword((event.target as HTMLInputElement).value)}
              />
              <a className="login-card__link login-card__forgot-password" href="/forgot-password">
                {t('forgotPassword')}
              </a>
            </div>
            <button className="login-card__button" type="button" onClick={
              () => this.submit()
            }>{t('SIGN IN')}</button>
          </form>
          {this.renderErrorField()}
        </div>
        <div className="login-card__footer">
          <p>{t('registerInsteadHint')}</p>
          <a className="login-card__link" onClick={this.props.changeToRegister}>
            {t('registerAccount')}
          </a>
        </div>
      </div>
    )
  }

  private renderErrorField(): React.ReactNode | undefined {
    if (this.state.error === '') {
      return undefined
    }
    return (
      <div className="error-field-container" style={{marginTop: 20}}>
        <ErrorField message={'invalid credentials'}/>
      </div>
    )
  }

  private updateEmail(value: string) {
    this.setState({...this.state, email: value})
  }

  private updatePassword(value: string) {
    this.setState({...this.state, password: value})
  }

  private showError(error: Error) {
    this.setState({...this.state, error: error.message})
  }

  private async submit() {
    const success = await this.tryToLogin(this.state.email, this.state.password)
    if (success) {
      redirect('/dashboard')
    }
  }

  private async tryToLogin(email: string, password: string): Promise<boolean> {
    try {
      const {response, account} = await login({email, password})
      await this.props.login(response, account)
      return true
    } catch (error) {
      console.log({message: 'failed to log in', error})
      this.showError(error)
      return false
    }
  }
}

export default connect(null, mapDispatchToProperties)(withTranslation('login')(LoginForm))