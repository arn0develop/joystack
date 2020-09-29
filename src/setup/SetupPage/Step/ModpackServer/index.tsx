import React from 'react'
import Gallery from 'src/setup/SetupPage/Gallery'
import { pluginCategories } from 'src/setup/SetupPage/Gallery/category'
import { withTranslation, WithTranslation } from 'react-i18next'
import 'src/setup/SetupPage/Step/ModpackServer/style.scss'
import {Resource} from '@joystack/protocol/realm/resource'
import {bindActionCreators, Dispatch} from 'redux'
import * as setupState from '../../../state/wizard'
import {CombinedState, initialState} from '../../../../state'
import {connect} from 'react-redux'

interface State {
  resource: Resource | null
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    addResource: setupState.addResource,
    removeResource: setupState.removeResource
  }, dispatch)
}

function mapStateToProperties(state: CombinedState = initialState) {
  const { type, resources } = state.realm.wizard
  return {
    type,
    resource: resources.find(resource => resource.type === Resource.Type.MOD_PACK)
  }
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = StateProperties & DispatchProperties & WithTranslation

export class ModPackServer extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
  }

  private selectResource(resource: Resource.AsObject) {
    const currentSelection = this.props.resource
    if (currentSelection) {
      this.props.removeResource(currentSelection)
    }
    this.props.addResource(resource)
  }

  private deselectResource() {
    const { resource } = this.props
    if (resource) {
      this.props.removeResource(resource)
    }
  }

  render() {
    const { t, resource  } = this.props
    return (
      <div className="minecraft-server-content">
        <Gallery.Selection
          title={t('MODPACK_SERVER')}
          subTitle={this.props.type?.version || 'unknown'}
          resource={resource || null}
          onDeselect={() => this.deselectResource()}
        />
        <Gallery
          onSelect={resource => this.selectResource(resource)}
          title={t('AVAILABLE_MODPACKS')}
          categories={pluginCategories}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(withTranslation('SETUP_PAGE')(ModPackServer))