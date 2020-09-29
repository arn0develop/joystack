import React from 'react'
import {Select, Tooltip} from 'antd'
import {SelectValue} from 'antd/lib/select'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import * as setupState from 'src/setup/state/wizard'
import ProceedButton from 'src/setup/SetupPage/ProceedButton'
import 'src/setup/SetupPage/Step/BeginStep/style.scss'
import redirect from 'src/redirect'
import {CombinedState, initialState} from 'src/state'
import {withTranslation, WithTranslation} from 'react-i18next'
import Mode from '../../mode'
import {fetchTypes} from '../../../state/type/actions'
import {RealmType} from '@joystack/protocol/realm/type/type_service_pb'
import {reset, updateType} from '../../../state/wizard'

interface State {
  openTabName?: string
  selected?: RealmType.AsObject
}

interface OwnProperties {
  rootPath?: '/dashboard' | '/start'
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({fetchTypes, updateType, reset}, dispatch)
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    types: state.realm.type.types,
    typesLoaded: state.realm.type.loaded
  }
}

interface OwnProperties {
  mode: Mode
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties =
  OwnProperties
  & DispatchProperties
  & StateProperties
  & WithTranslation

class BeginStep extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {openTabName: undefined, selected: undefined}
  }

  componentDidMount() {
    this.props.reset()
    this.props.fetchTypes()
  }

  render() {
    // const {type} = this.state
    const {t, mode} = this.props
    return (
      <main
        className={`server-type-content ${mode.isDashboard && 'dashboard-page'}`}>
        {!mode.isDashboard && this.renderHeader()}
        <div className="servers-content">
          {this.renderTabs()}
        </div>
      </main>
    )
  }

  private renderHeader() {
    return (
      <div className="server-type-description">
        <h2>Willkommen</h2>
        <h3>Konfiguriere hier deinen ersten Server</h3>
      </div>
    )
  }

  private renderTabs() {
    console.log(this.props.types)
    const names = this.props.types.map(type => type.name)
    const differentTypes = Array.from(new Set(names))
    return differentTypes.map(name => this.renderType(name))
  }

  private renderType(name: string) {
    const versions = this.props.types.filter(type => type.name === name)
    return versions.length <= 1
      ? this.renderSingleVersionType()
      : this.renderTypeWithVersions(name, versions)
  }

  private renderSingleVersionType() {
    return <div style={{marginBottom: 30}}/>
  }

  private renderTypeWithVersions(name: string, versions: RealmType.AsObject[]) {
    const isSelected = this.state.openTabName === name
    const activeClass = isSelected ? 'selected-server' : ''
    return (
      <div
        key={`type-${name}`}
        className={`main-box minecraft ${activeClass}`}
        onClick={() => this.toggleOpenTab(name, versions)}
      >
        <embed src={'/images/setup/minecraft.svg'}/>
        {this.renderTypeCardTitle(name)}
        <div className="options-content">
          {this.renderVersionSelection(versions)}
        </div>
        <ProceedButton centered submit={() => {this.submit()}}/>
      </div>
    )
  }

  private toggleOpenTab(name: string, versions: RealmType.AsObject[]) {
    const currentTab = this.state.openTabName
    if (currentTab === name) {
      this.setState({...this.state, openTabName: ''})
    } else {
      this.setState({...this.state, openTabName: name, selected: versions.length == 0 ? undefined : versions[0]})
    }
  }

  private renderTypeCardTitle(name: string) {
    return (
      <div>
        <div className="box-title-content">
          <span>{BeginStep.capitalize(name)}</span>
          <Tooltip placement="top" title={this.props.t('INFO')}>
            <div className="info">?</div>
          </Tooltip>
        </div>
      </div>
    )
  }

  private renderVersionSelection(versions: RealmType.AsObject[]) {
    const [first] = versions
    const value = this.state.selected?.version || first.version
    return (
      <Select
        key={`version-selector-${first.name}`}
        placeholder={this.props.t('VERSION')}
        onSelect={value => this.updateSelectedType(Number(value))}
        onClick={event => event.stopPropagation()}
        value={value}
      >
        {this.renderVersionSelectionEntries(versions)}
      </Select>
    )
  }

  private renderVersionSelectionEntries(versions: RealmType.AsObject[]) {
    return versions.slice()
      .sort((left, right) => left.name.localeCompare(right.name))
      .map(version => this.renderVersionSelectionEntry(version))
  }

  private static capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  private renderVersionSelectionEntry(version: RealmType.AsObject) {
    const key = `version-selector-option-${version.name}-${version.version}`
    return (
      <Select.Option key={key} value={version.id}>
        {version.version}
      </Select.Option>
    )
  }

  private updateSelectedType(id: number) {
    const type = this.props.types.find(type => type.id === id)
    this.setState({...this.state, selected: type})
  }

  private submit(type: RealmType.AsObject | undefined = this.state.selected) {
    if (type) {
      this.props.updateType(type)
      redirect(`${this.props.mode.path}/minecraft`)
    } else {
      alert('no type was configured')
    }
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('SETUP_PAGE')(BeginStep))