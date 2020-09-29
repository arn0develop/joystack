import React from 'react'
import Gallery from 'src/setup/SetupPage/Gallery'
import { pluginCategories } from 'src/setup/SetupPage/Gallery/category'
import { withTranslation, WithTranslation } from 'react-i18next'
import {Resource} from '@joystack/protocol/realm/resource'
import {bindActionCreators, Dispatch} from 'redux'
import * as setupState from 'src/setup/state/wizard'
import {CombinedState, initialState} from 'src/state'
import 'src/setup/SetupPage/Step/MinecraftServer/style.scss'
import {connect} from 'react-redux'

interface State {
  resources: Resource.AsObject[]
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    addResource: setupState.addResource,
    removeResource: setupState.removeResource
  }, dispatch)
}

function mapStateToProperties(state: CombinedState = initialState) {
  const { type, resources } = state.realm.wizard
  return { type, resources }
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = StateProperties & DispatchProperties & WithTranslation

class MinecraftServer extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
  }

  private addPlugin(target: Resource.AsObject) {
    this.props.addResource(target)
  }

  private removePlugin(resource: Resource.AsObject) {
    this.props.removeResource(resource)
  }

  render() {
    const { resources } = this.props
    const { t } = this.props
    return (
      <div className="minecraft-server-content">
        <Gallery.ListSelection
          title={t('JAVA_SERVER')}
          subTitle={this.props.type?.version || 'unknown'}
          resources={resources}
          onDeselect={resource => this.removePlugin(resource)}
        />
        <Gallery
          selectMultiple
          onSelect={resource => this.addPlugin(resource)}
          title={t('AVAILABLE_PLUGINS')}
          categories={pluginCategories}
        />
      </div>
    )
  }
}


export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('SETUP_PAGE')(MinecraftServer))