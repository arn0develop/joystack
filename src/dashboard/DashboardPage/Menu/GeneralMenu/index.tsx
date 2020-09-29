import React from 'react'
import Console from 'src/dashboard/DashboardPage/Menu/GeneralMenu/Console'
import ServerStatus
  from 'src/dashboard/DashboardPage/Menu/GeneralMenu/ServerStatus'
import {Realm} from '@joystack/protocol/realm'
import Card from 'src/dashboard/DashboardPage/Menu/GeneralMenu/Card'
import ShareCard from 'src/dashboard/DashboardPage/Menu/GeneralMenu/ShareCard'
import {CombinedState, initialState} from 'src/state'
import {connect} from 'react-redux'
import 'src/dashboard/DashboardPage/Menu/GeneralMenu/style.scss'
import StatusBadge from './StatusBadge'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    hasRealm: state.dashboard.sidebar.active.realmId != undefined,
  }
}

type Properties = ReturnType<typeof mapStateToProperties>

class GeneralMenu extends React.Component<Properties> {
  constructor(properties: Properties) {
    super(properties)
  }

  render() {
    return this.props.hasRealm
      ? this.renderForLoadedRealm()
      : this.renderUnloadedRealm()
  }

  private renderUnloadedRealm() {
    return <p>Loading</p>
  }

  private renderForLoadedRealm() {
    return (
      <div className="general-menu-container">
        <StatusBadge/>
        <div className="general-menu-content">
          <div className="general-menu-cards">
            {this.renderVersionCard()}
            {this.renderWorldCard()}
          </div>
          <ShareCard/>
          <ServerStatus/>
          <Console expandable/>
        </div>
      </div>
    )
  }

  private renderWorldCard() {
    return (
      <Card
        name="world"
        className="dashboard-card-world"
        menuName="Selected World"
        image="/images/default_world.svg"
        link="/dashboard/worlds"
      >
        Default
      </Card>
    )
  }

  private renderVersionCard() {
    return (
      <Card
        name="version"
        className="dashboard-card-version"
        image="/images/version.svg"
        link="/dashboard/version"
        menuName="Selected Version"
      >
        Java 1.8.8 Spigot
      </Card>
    )
  }
}

export default connect(mapStateToProperties, {})(GeneralMenu)