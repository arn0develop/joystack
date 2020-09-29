import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import 'src/login/LoginPage/form.scss'
import * as accountState from 'src/login/state'
import {register, Registration} from 'src/login/register'
import {login} from 'src/login'
import redirect from 'src/redirect'
import SocialButton from 'src/login/LoginPage/SocialButton'
import ErrorField from 'src/login/LoginPage/ErrorField'
import { TextField } from '@material-ui/core'
import { WithTranslation, withTranslation } from 'react-i18next'

interface State {
  [field: string]: string
  error: string
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    login: accountState.login
  }, dispatch)
}

interface OwnProperties {
  redirect?: string
  hiddenHeader?: boolean
  hiddenFooter?: boolean
  changeToLogin?: () => void
}

type Properties = OwnProperties & ReturnType<typeof mapDispatchToProperties> & WithTranslation

/**
 * Form used to register a new account via social media or directly.
 * Can be embedded in other pages (such as the signup-flow).
 * Once an account is registered, it is automatically logged in-to,
 * which has the same effect as a login via the LoginForm.
 */
class RegisterForm extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { error: '' }
  }

  render() {
    const { t } = this.props
    return (
      <div className="login-card">
        <div className="login-card__options">
          <div className="login-card__social_container">
            <div className="login-card-social-button__wrapper">
              <SocialButton
                text={t('signUpWithGoogle')}
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
                label={t('name')}
                type="text"
                name="name"
                autoComplete="username"
                onChange={(event) => this.updateField('name', event)}
              />
            </div>
            <div className="login-card__field">
              <TextField
                fullWidth
                type="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                onChange={(event) => this.updateField('email', event)}
              />
            </div>
            <div className="login-card__field">
              <TextField
                fullWidth
                type="password"
                label={t('password')}
                name="password"
                autoComplete="new-password"
                onChange={(event) => this.updateField('password', event)}
              />
            </div>
            <button
              className="login-card__button"
              type="button"
              onClick={() => this.submit()}
            >
              {t('signUp')}
            </button>
            {this.renderErrorField()}
          </form>
        </div>
        {
          this.props.hiddenFooter ||
          <div className="login-card__footer">
            <p>{t('loginInsteadHint')}</p>
            <a className="login-card__link"
              onClick={this.props.changeToLogin}>{t('signInWithExistingAccount')}</a>
          </div>
        }
      </div>
    )
  }

  private renderErrorField(): React.ReactNode | undefined {
    if (this.state.error != '') {
      return (
        <div className="error-field-container" style={{marginTop: 20}}>
          <ErrorField message={'invalid credentials'}/>
        </div>
      )
    }
    return undefined
  }

  private updateField(name: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target as HTMLInputElement
    this.setState({...this.state, [name]: field.value})
  }

  private showError(error: Error) {
    this.setState({...this.state, error: error.message})
  }

  private async submit() {
    try {
      await this.tryToRegister()
      const destination = this.props.redirect || '/dashboard'
      redirect(destination)
    } catch (error) {
      console.log({failedToRegister: error})
      this.showError(error)
    }
  }

  private createRegistration(): Registration {
    const state = this.state
    return {
      email: state['email'],
      name: state['name'],
      password: state['password']
    }
  }

  private async tryToRegister(registration: Registration = this.createRegistration()) {
    await register(registration)
    const {response, account} = await login({email: registration.email, password: registration.password})
    await this.props.login(response, account)
  }
}

export default connect(null, mapDispatchToProperties)(withTranslation('login')(RegisterForm))