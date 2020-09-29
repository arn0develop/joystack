import React, {ChangeEvent} from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { EditOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { connect } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import {Account} from '@joystack/protocol/user/account'
import Field from 'src/component/Field'
import {CombinedState, initialState} from 'src/state'
import findSource from 'src/util/avatar/findSource'
import Switch from 'src/dashboard/DashboardPage/Menu/SettingsMenu/Switch'
import 'src/dashboard/DashboardPage/Profile/style.scss'
import ErrorMessage from 'src/component/ErrorMessage'
interface State {
  fields: {
    username: string
    email: string
    newPassword: string
    oldPassword: string
    advertisedBy: string
  }
  avatarUrl: string
  isUsernameEditable: boolean
  avatarName: string
  errorMessage: null | string
}

const enterKeyCode = 13

function isEnter(event: React.KeyboardEvent): boolean {
  return event.keyCode === enterKeyCode
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    account: state.account.account,
    session: state.account.session
  }
}

interface OwnProperties {
  account?: Account.AsObject
}

type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = OwnProperties & WithTranslation & StateProperties

class ProfileMenu extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      fields: {
        username: properties.account?.name || '',
        email: properties.account?.email || '',
        newPassword: '',
        oldPassword: '',
        advertisedBy: '',

      },
      avatarUrl: `https://minotar.net/helm/${properties.profile?.avatar || 'steve'}`,
      isUsernameEditable: false,
      avatarName: '',
      errorMessage: null
    }
    this.fieldsChangeHandler = this.fieldsChangeHandler.bind(this)
  }

  render() {
    const { t } = this.props
    const {
      fields,
      avatarUrl,
      isUsernameEditable,
      avatarName,
      errorMessage
    } = this.state
    return (
      <div className="dashboard-settings-content">
        <div className="title">{t('SETTINGS.PROFILE_SETTINGS')}</div>
        <div className="select-settings-content">
          <div className="profile-picture-content">
            <span>{t('SETTINGS.PROFILE_PICTURE')}</span>
            <div className="edit-profile-picture">
              <img src={avatarUrl} alt="User" />
              {isUsernameEditable ? (
                <>
                  <ErrorMessage message={errorMessage} />
                  <DebounceInput
                    value={avatarName}
                    className="ant-input"
                    onChange={(event) =>
                      this.updateSelectedOwner(event.target.value)
                    }
                    onKeyDown={(event) =>
                      isEnter(event) && this.confirmEditChanges()
                    }
                    debounceTimeout={300}
                    placeholder={t('SETTINGS.NAME')}
                    type="text"
                    autoFocus
                  />
                  <button className="confirm" onClick={() => this.confirmEditChanges()}>
                    {t('SETTINGS.CONFIRM')}
                  </button>
                  <button className="cancel" onClick={() => this.resetEditChanges()}>
                    {t('SETTINGS.CANCEL')}
                  </button>
                </>
              ) : (
                <>
                  <EditOutlined onClick={() => this.updateEditable(true)} />
                  <span
                    onClick={() => this.resetEditChanges()}
                    className="delete-avatar"
                  >
                    {t('SETTINGS.DELETE_AVATAR')}
                  </span>
                </>
              )}
            </div>
          </div>
          <Field
            type="text"
            label={t('SETTINGS.USERNAME')}
            name="username"
            value={this.state.fields.username}
            onChange={this.fieldsChangeHandler}
          />
          <Field
            type="text"
            label={t('SETTINGS.E_MAIL_ADDRESS')}
            name="email"
            value={this.state.fields.email}
            onChange={this.fieldsChangeHandler}
          />
          <div className="select-language-content">
            <span>{t('SETTINGS.LANGUAGE')}</span>
            <Select className="activity-state" defaultValue="Deutsch">
              <Select.Option value="Deutsch">
                <img
                  src="https://www.countryflags.io/de/flat/24.png"
                  alt="de"
                />
                Deutsch
              </Select.Option>
              <Select.Option value="English">
                <img
                  src="https://www.countryflags.io/gb/flat/24.png"
                  alt="gb"
                />
                English
              </Select.Option>
            </Select>
          </div>
          <Field
            type="password"
            label={t('SETTINGS.NEW_PASSWORD')}
            name="newPassword"
            onChange={this.fieldsChangeHandler}
          />
          <Switch initial={false} name={t('SETTINGS.2_FA_ACTIVATE')} />
          <Field
            type="password"
            label={t('SETTINGS.OLD_PASSWORD')}
            name="oldPassword"
            onChange={this.fieldsChangeHandler}
            containerClassName={!fields.newPassword.length ? 'hidden' : ''}
          />
          <Field
            type="text"
            label={t('SETTINGS.ADVERTISED_BY')}
            name="advertisedBy"
            onChange={this.fieldsChangeHandler}
          />
        </div>
        <div className="save-data-content">
          <button>{t('SETTINGS.SAVE_DATA')}</button>
        </div>
      </div>
    )
  }

  private fieldsChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value,
      },
    })
  }

  private async updateSelectedOwner(target: string) {
    this.modifyState((state) => {
      state.avatarName = target
      state.errorMessage = null
    })
    const avatarSource = await findSource(target)
    if (this.state.avatarUrl !== avatarSource) {
      this.modifyState((state) => (state.avatarUrl = avatarSource))
    }
  }

  private updateEditable(flag: boolean) {
    this.modifyState((state) => (state.isUsernameEditable = flag))

  }

  private confirmEditChanges() {
    const { avatarName } = this.state
    if (avatarName.trim().length < 2 || avatarName.trim().length > 16) {
      this.modifyState((state) => {
        state.errorMessage = this.props.t('PLAYERS_MENU.THE_TEXT_SHOULD_INCLUDE_2_16_SYMBOLS')
      })
      return
    }
    if(this.state.errorMessage) {
      this.modifyState((state) => (state.errorMessage = null))
    }
    this.updateEditable(false)
  }

  private resetEditChanges() {
    this.modifyState((state) => {
      state.isUsernameEditable = false
      state.avatarUrl = 'https://minotar.net/helm/steve'
      state.avatarName = ''
      state.errorMessage = null
    })
  }

  private modifyState(modification: (state: State) => void) {
    const updatedState: State = Object.assign({}, this.state)
    modification(updatedState)
    this.setState(updatedState)
  }
}

const connected = connect(mapStateToProperties, {})(ProfileMenu)
export default withTranslation('dashboard')<WithTranslation>(connected)