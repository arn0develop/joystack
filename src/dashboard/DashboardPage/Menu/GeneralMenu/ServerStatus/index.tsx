import React from 'react'
import {withTranslation, WithTranslation} from 'react-i18next'
import {
  Realm
} from '@joystack/protocol/realm'
import 'src/dashboard/DashboardPage/Menu/GeneralMenu/ServerStatus/style.scss'
import {FieldTimeOutlined} from '@ant-design/icons'
import Loading from 'src/component/Loading'
import redirect from 'src/redirect'
import {CombinedState, initialState} from '../../../../../state'
import {bindActionCreators, Dispatch} from 'redux'

import {connect} from 'react-redux'
import {
  fetchRealmStatus,
  subscribeRealmUpdates,
  updateRealmStatus
} from '../../../../state/sidebar/actions'
import {RealmStatus} from '@joystack/protocol/realm/status'

interface State {
  progress: number
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    realmId: state.dashboard.sidebar.active.realmId,
    status: state.dashboard.sidebar.active.status?.stage
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    subscribeRealmUpdates,
    updateRealmStatus,
    fetchRealmStatus
  }, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class ServerStatus extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = {progress: 0}
  }

  componentDidMount() {
    if (this.props.realmId) {
      this.props.fetchRealmStatus(this.props.realmId)
    }
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (previous.realmId !== this.props.realmId) {
      if (this.props.realmId) {
        this.props.fetchRealmStatus(this.props.realmId)
      }
    }
  }

  render() {
    const { t } = this.props
    const status = this.props.status || RealmStatus.Stage.UNKNOWN
    const inProgress = status == RealmStatus.Stage.STARTING || status == RealmStatus.Stage.STOPPING
    return (
      <div className="status-card dashboard-card">
        <div className="status-card-header">
          <span className="title">
            <img src="/images/start_server.svg" alt="Start server" className="logo" />
            <b>{t('menus.general.status.title')}</b>
          </span>
        </div>
        <div className="status-card-body">
          <div className="status-card-button-container">
            {this.renderButton()}
            {inProgress && this.renderProgressLoader()}
            <br/>
          </div>
          {inProgress && this.renderProgressStatus(status)}
          {this.renderFooter(status)}
        </div>
      </div>
    )
  }

  private renderProgressLoader() {
    return (
      <div className="loading-content">
        <Loading />
      </div>
    )
  }

  private renderProgressStatus(status: RealmStatus.Stage) {
    return (
      <div className="loading-text">
        <span>{status == RealmStatus.Stage.STARTING ? 'Starting' : 'Stopping'}</span>
      </div>
    )
  }

  private renderFooter(status: RealmStatus.Stage) {
    const inProgress = status == RealmStatus.Stage.STARTING || status == RealmStatus.Stage.STOPPING
    return inProgress
      ? this.renderInProgressFooter()
      : this.renderSkipFooter()
  }

  private renderInProgressFooter() {
    return (
      <div className="status-footer">
        <span className="time">
          <FieldTimeOutlined /> 5:15 min
        </span>
      </div>
    )
  }

  private renderSkipFooter() {
    return (
      <div className="status-footer">
        <div className="skip-button-container">
          <button
            className="skip-button"
            onClick={() => redirect('/dashboard/upgrade')}
          >
            {this.props.t('menus.general.status.proStart')}
          </button>
          <br/>
          <span className="description">
            {this.props.t('menus.general.status.description')}
          </span>
        </div>
      </div>
    )
  }

  private renderButton() {
    const name = this.selectButtonName()
    return (
      <button
        className={`status-update-button ${this.selectButtonColor()}`}
        onClick={() => this.updateStatus()}
      >
        {this.props.t(`menus.general.status.${name}`)}
      </button>
    )
  }

  private selectButtonName(): string {
    switch (this.props.status) {
    case RealmStatus.Stage.IDLE:
      return 'start'
    case RealmStatus.Stage.RUNNING:
      return 'stop'
    case RealmStatus.Stage.STARTING:
    case RealmStatus.Stage.STOPPING:
      return 'cancel'
    default:
      return 'loading'
    }
  }

  private selectButtonColor(): string {
    switch (this.props.status || RealmStatus.Stage.UNKNOWN) {
    case RealmStatus.Stage.IDLE:
      return 'status-update-button-idle'
    case RealmStatus.Stage.RUNNING:
      return 'status-update-button-running'
    case RealmStatus.Stage.STARTING:
      return 'status-update-button-starting'
    case RealmStatus.Stage.STOPPING:
      return 'status-update-button-stopping'
    default:
      return 'status-update-button-loading'
    }
  }

  private updateStatus() {
    const id = this.props.realmId
    if (id) {
      switch (this.props.status) {
      case RealmStatus.Stage.IDLE:
        this.props.updateRealmStatus(id, RealmStatus.Stage.STARTING)
        break
      case RealmStatus.Stage.RUNNING:
        this.props.updateRealmStatus(id, RealmStatus.Stage.STOPPING)
        break
      }
    }
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('dashboard')(ServerStatus))