import React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {Input, Modal, Popconfirm, Select} from 'antd'
import {connect} from 'react-redux'
import 'src/setup/SetupPage/Step/DomainSetup/style.scss'
import {CombinedState, initialState} from 'src/state'
import {withTranslation, WithTranslation} from 'react-i18next'
import Badge from 'src/component/Badge'
import Step from '../index'
import Mode from '../../mode'
import {fetchIcons} from '../../../state/icon/actions'
import {
  createFullDomainName,
  updateDescription,
  updateIcon
} from '../../../state/wizard'
import {fetchDomainNames} from '../../../state/domain/actions'
import {DomainName} from '@joystack/protocol/realm/domain'
import {RealmIcon} from '@joystack/protocol/realm/icon'
import IconSelector from '../../IconSelector'

const {Option} = Select

interface State {
  realmName: string
  subDomain: string
  descriptionText: string
  domainName?: DomainName.AsObject
  icon?: RealmIcon.AsObject
  iconSelectorVisible: boolean
}

interface OwnProperties {
  rootPath?: '/dashboard' | '/start'
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({updateDescription, fetchDomainNames, fetchIcons, updateIcon}  , dispatch)
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    icon: state.realm.wizard.icon,
    descriptionText: state.realm.wizard.realmDescription.text,
    domainName: state.realm.wizard.realmDescription.domainName,
    realmDescription: state.realm.wizard.realmDescription,
    icons: state.realm.icon.icons,
    iconsLoaded: state.realm.icon.loaded,
    domainNames: state.realm.domain.domainNames,
    domainNamesLoaded: state.realm.domain.loaded
  }
}

interface OwnProperties {
  mode: Mode
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties =
  OwnProperties
  & StateProperties
  & DispatchProperties
  & WithTranslation

function mapPropertiesToState(properties: Properties): State {
  return {
    domainName: properties.domainName || properties.domainNames.find(() => true),
    icon: properties.icon,
    realmName: properties.realmDescription.name,
    subDomain: properties.realmDescription.subDomain,
    descriptionText: properties.descriptionText,
    iconSelectorVisible: false,
  }
}

class DomainSetup extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = mapPropertiesToState(properties)
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (previous !== this.props) {
      if (previous.icon !== this.props.icon) {
        this.setState({icon: this.props.icon})
      } else {
        this.setState(mapPropertiesToState(this.props))
      }
    }
  }

  componentDidMount() {
    this.props.fetchDomainNames()
    this.props.fetchIcons()
  }

  render() {
    const {rootPath, mode} = this.props
    return (
      <Step
        preventRedirect
        content={this.renderContent()}
        next={`${mode.path === '/dashboard/edit' ? '/dashboard/fakeID/version' : mode.path + '/world'}`}
        onProceed={() => this.submit()}
      />
    )
  }

  private renderContent() {
    const {t} = this.props
    return (
      <main className="settings-container">
        <div className="settings-content">
          <div className="badge-container">
            {this.renderBadge()}
          </div>
          <div className="main-box">
            <div className="main-box-content">
              <h5>{t('name.domain')}</h5>
              {this.renderDomainSelector()}
              <h5>{t('name.description')}</h5>
              <div className="name-content">
                <Input
                  placeholder="Description"
                  onChange={event => this.setState({descriptionText: event.target.value})}
                  value={this.state.descriptionText}
                />
              </div>
              <h5>{t('name.realm')}</h5>
              <div className="name-content">
                <Input
                  placeholder="Name"
                  onChange={event => this.setState({realmName: event.target.value})}
                  value={this.state.realmName}
                />
              </div>
              <div className="icon-selector-preview" onClick={() => this.setState({iconSelectorVisible: true})}>
                <img src={this.props.icon?.imagePath || 'https://media.joystack.com/servericons/joystack-logo.png'}/>
              </div>
              <Modal
                title="Select Icon"
                style={{ top: 20 }}
                visible={this.state.iconSelectorVisible}
                footer={() => <React.Fragment/>}
                onCancel={() => this.setState({iconSelectorVisible: false})}
              >
                <IconSelector onSelect={icon => {
                  this.props.updateIcon(icon)
                  this.setState({iconSelectorVisible: false})
                }}/>
              </Modal>
            </div>
          </div>
        </div>
        <div className="link-content">
          <span>{t('advanced-hint')}</span>
        </div>
      </main>
    )
  }

  private renderDomainSelector() {
    return (
      <div className="domain-content">
        <Input
          placeholder="Domain"
          onChange={event => this.setState({...this.state, subDomain: event.target.value})}
          value={this.state.subDomain}
        />
        <Select
          defaultValue={this.selectDefaultDomainName()}
          onChange={value => this.updateDomainName(value)}
        >
          {this.props.domainNames.map(domainName => this.renderDomainSelectorField(domainName))}
        </Select>
      </div>
    )
  }

  private updateDomainName(value: string) {
    const domainName = this.props.domainNames.find(name => name.name === value)
    if (domainName) {
      this.setState({...this.state, domainName: domainName})
    }
  }

  private selectDefaultDomainName(): string | undefined {
    if (this.state.domainName) {
      return this.state.domainName?.name
    }
    return this.props.domainNames.find(() => true)?.name
  }

  private renderDomainSelectorField(domainName: DomainName.AsObject) {
    return <Option value={domainName.name}>{domainName.name}</Option>
  }

  private renderBadge() {
    const imageUrl = this.props.icon?.imagePath || ''
    return (
      <Badge
        shadow
        imageSource={imageUrl}
        description={{
          firstMessageLine: `<p style="color: #3FE3E2">${this.state.descriptionText || 'Description'}</p>`,
          secondMessageLine: '<p style="color: #FFF65F">Hosted by joystack.com</p>',
          name: createFullDomainName(this.state.domainName, this.state.subDomain) || 'none',
          onlineCount: 0,
          onlineLimit: 10
        }}
      />
    )
  }

  private submit() {
    this.props.updateDescription({
      subDomain: this.state.subDomain,
      name: this.state.realmName,
      domainName: this.state.domainName,
      conflicts: {isDomainTaken: false, isNameTaken: false},
      text: this.state.descriptionText,
      error: ''
    })
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(withTranslation('setup')(DomainSetup))
