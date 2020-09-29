import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import AccordingButton from 'src/component/AccordingButton'
import {withTranslation, WithTranslation} from 'react-i18next'
import {listGameFields, listOtherFields, listWorldFields} from './fields'
import {Collapse} from 'antd'
import 'src/dashboard/DashboardPage/Menu/SettingsMenu/style.scss'
import {initialState, CombinedState} from 'src/state'
import {fetchSettings, resetSettings} from '../../../state/settings/actions'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    realmId: state.dashboard.sidebar.active.realmId,
    saving: state.dashboard.settings.saving,
    loaded: state.dashboard.settings.loaded
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({ fetchSettings, resetSettings }, dispatch)
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = StateProperties & DispatchProperties & WithTranslation

interface State {
  showProgressBar: boolean
}

class GeneralMenu extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {showProgressBar: false}
  }

  componentDidMount() {
    this.fetchSettings()
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (previous.saving !== this.props.saving) {
      this.updateProgressBar()
    }
    if (previous.realmId !== this.props.realmId) {
      this.fetchSettings()
    }
  }

  private fetchSettings() {
    const id = this.props.realmId;
    if (id != undefined) {
      this.props.fetchSettings(id)
    }
  }

  private resetSettings() {
    const id = this.props.realmId
    if (id != undefined) {
      this.props.resetSettings(id)
    }
  }

  private updateProgressBar() {
    if (this.props.saving) {
      this.setState({...this.state, showProgressBar: true})
    } else {
      setTimeout(() => this.setState({...this.state, showProgressBar: false}), 500)
    }
  }

  render() {
    const {t} = this.props
    const { showProgressBar } = this.state
    return (
      <div className="settings-menu-content">
        {showProgressBar &&
        <div className="horizontal-loading">
          <div className="horizontal-loading-line" />
        </div>}
        <div className="position">
          {this.renderSection('gameSettings', listGameFields)}
          {this.renderSection('worldSettings', listWorldFields)}
          {this.renderSection('moreSettings', listOtherFields)}
        </div>
        {this.renderRestoreButton()}
      </div>
    )
  }

  private renderRestoreButton() {
    return (
      <div className="restore-standard-button-content">
        <button className="restore-standard-button" onClick={() => this.resetSettings()}>
          {this.props.t('menus.settings.restore')}
        </button>
      </div>
    )
  }

  private renderSection(name: string, entries: () => React.ReactNode[]) {
    return (
      <Collapse
        bordered={false}
        expandIcon={({isActive}) => (<AccordingButton active={isActive}/>)}
        defaultActiveKey={['1']}
        className="site-collapse-custom-collapse"
      >
        <Collapse.Panel
          header={<h6>{this.props.t(`menus.settings.${name}`)}</h6>}
          key="1"
          className="site-collapse-custom-panel"
        >
          {this.props.loaded ? entries() : []}
        </Collapse.Panel>
      </Collapse>
    )
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('dashboard')(GeneralMenu))

