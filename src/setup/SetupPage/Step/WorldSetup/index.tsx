import React from 'react'
import Gallery from 'src/setup/SetupPage/Gallery'
import { worldCategories } from 'src/setup/SetupPage/Gallery/category'
import MapSelection from 'src/setup/SetupPage/Step/WorldSetup/MapSelection'
import 'src/setup/SetupPage/Step/WorldSetup/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
import {Resource} from '@joystack/protocol/realm/resource'
import {CombinedState, initialState} from '../../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {addResource, removeResource} from '../../../state/wizard'
import {connect} from 'react-redux'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    world: state.realm.wizard.resources.find(resource => resource.type === Resource.Type.MAP)
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({addResource, removeResource}, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation


class WorldSelection extends React.Component<Properties> {
  constructor(properties: any) {
    super(properties)
  }

  private selectWorld(world: Resource.AsObject) {
    this.props.addResource(world)
  }

  private removeWorld() {
    const resource = this.props.world
    if (resource) {
      this.props.removeResource(resource)
    }
  }

  render() {
    const { t } = this.props
    return (
      <main className="world-selection-content">
        <Gallery.Selection
          resource={this.props.world || null}
          onDeselect={() => this.removeWorld()}
          title={t('JAVA_SERVER')}
          subTitle="Paperspigot 1.8.4"
        />
        <MapSelection />
        <Gallery
          onSelect={world => this.selectWorld(world)}
          title={t('SELECT_FROM_GALLERY')}
          categories={worldCategories}
        />
      </main>
    )
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(
  withTranslation('SETUP_PAGE')(WorldSelection)
)