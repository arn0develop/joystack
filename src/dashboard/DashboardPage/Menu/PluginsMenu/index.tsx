import React from 'react'
import {withTranslation, WithTranslation} from 'react-i18next'
import {pluginCategories,} from 'src/setup/SetupPage/Gallery/category'
import Gallery from 'src/setup/SetupPage/Gallery'
import './style.scss'
import {
  ListResourceRequest,
  Resource,
  ResourceServicePromiseClient
} from '@joystack/protocol/realm/resource'
import config from '../../../../config'
import {EditOutlined} from '@ant-design/icons/lib'
import {CombinedState, initialState} from '../../../../state'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {
  fetchPlugins,
  SinglePluginUpdateMethod,
  updatePluginList,
  updateSinglePlugin
} from '../../../state/plugins/actions'
import {Tooltip} from 'antd'
import {Link} from 'react-router-dom'

interface State {
  entries: Resource.AsObject[]
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    realmId: state.dashboard.sidebar.active.realmId,
    plugins: state.dashboard.plugins.plugins,
    session: state.account.session
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    fetchPlugins,
    updateSinglePlugin,
    updatePluginList
  }, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class PluginsMenu extends React.Component<Properties, State> {
  constructor(properties: Properties & WithTranslation) {
    super(properties)
    this.state = {
      entries: []
    }
  }

  componentDidMount() {
    this.fetchEntries()
    if (this.props.realmId !== undefined) {
      this.props.fetchPlugins()
    }
  }

  componentDidUpdate(properties: Properties & WithTranslation) {
    if (properties.realmId != this.props.realmId && this.props.realmId != undefined) {
      this.fetchEntries()
      this.props.fetchPlugins()
    }
  }

  private async fetchEntries() {
    const entries = await this.loadAllPlugins()
    this.setState({...this.state, entries})
  }

  private async loadAllPlugins(): Promise<Resource.AsObject[]> {
    const resourceClient = new ResourceServicePromiseClient(config.apiHost)
    const response = await resourceClient.list(new ListResourceRequest(), {'Authentication': this.props.session?.accessToken || 'none'})
    return response.getResourcesList().map(resource => resource.toObject())
  }

  private addResource(resource: Resource.AsObject) {
    if (!this.hasResource(resource)) {
      this.props.updateSinglePlugin(resource.id, SinglePluginUpdateMethod.ADD)
    }
  }

  private hasResource(resource: Resource.AsObject): boolean {
    return this.props.plugins.some(existingId => existingId === resource.id)
  }

  private removeGallery(resource: Resource.AsObject) {
    if (this.hasResource(resource)) {
      this.props.updateSinglePlugin(resource.id, SinglePluginUpdateMethod.REMOVE)
    }
  }

  render() {
    const {t,realmId} = this.props
    const selected = this.props.plugins
      .map(pluginId => this.state.entries.find(entry => entry.id === pluginId))
      .filter(resource => resource != undefined)
      .map(resource => resource as Resource.AsObject) // TODO: There must be a more elegant way

    return (
      <div className="plugins-menu-content">
        <div className='box modpack'>
          <embed src={'/images/setup/modpacks.svg'}/>
          <div className="box-title-content">
            <span>{this.props.t('MODPACK_SERVER')}</span>
            <Link to={'/dashboard/edit'}>
              <Tooltip placement="top" title={this.props.t('EDIT')}>
                <div className="info">
                  <EditOutlined/>
                </div>
              </Tooltip>
            </Link>
          </div>
        </div>
        <Gallery.ListSelection
          title={t('PLUGINS_MENU.SELECTED_PLUGINS')}
          resources={selected}
          onDeselect={resource => this.removeGallery(resource)}
        />
        <Gallery
          selectMultiple
          onSelect={resource => this.addResource(resource)}
          title={t('WORLD_MENU.SELECT_FROM_GALLERY')}
          entries={this.state.entries}
          categories={pluginCategories}
        />
      </div>
    )
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(withTranslation('dashboard')(PluginsMenu))