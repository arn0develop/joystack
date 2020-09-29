import React from 'react'
import SettingsMenu from 'src/dashboard/DashboardPage/Menu/SettingsMenu'
import GeneralMenu from 'src/dashboard/DashboardPage/Menu/GeneralMenu'
import VersionMenu from 'src/dashboard/DashboardPage/Menu/VersionMenu'
import WorldMenu from 'src/dashboard/DashboardPage/Menu/WorldMenu'
import PluginsMenu from 'src/dashboard/DashboardPage/Menu/PluginsMenu'
import PlayersMenu from 'src/dashboard/DashboardPage/Menu/PlayersMenu'
import StatisticsMenu from 'src/dashboard/DashboardPage/Menu/StatisticsMenu'
import DataMenu from 'src/dashboard/DashboardPage/Menu/DataMenu'
import Profile from 'src/dashboard/DashboardPage/Profile'
import Upgrade from 'src/dashboard/DashboardPage/Upgrade'
import SetupPage from 'src/setup/SetupPage'
import { Switch, Route } from 'react-router-dom'
import {Realm} from '@joystack/protocol/realm'
import {Session} from '../../../login/state'
import {dashboardMode, editMode} from '../../../setup/SetupPage/mode'
import {RouteComponentProps, withRouter} from 'react-router'
import Landing from '../Landing'
import C from '../Menu/EditMenu'
import EditMenu from '../Menu/EditMenu';

interface Properties {
  realm?: Realm
  session?: Session
}

interface RouteParameters {
  realm: string
}

class Router extends React.Component<Properties & RouteComponentProps<RouteParameters>> {
  render() {
    return (
      <Switch>
        <Route exact path="/dashboard" component={Landing}/>
        <Route strict={false} path="/dashboard/edit" render={() => <SetupPage mode={editMode}/>}/>
        <Route strict={false} path="/dashboard/new" render={() => <SetupPage mode={dashboardMode}/>}/>
        <Route exact strict={false} path="/dashboard/upgrade" component={Upgrade}/>
        <Route exact strict={false} path="/dashboard/profile" component={Profile}/>
        <Route exact strict={false} path="/dashboard/:realm" component={GeneralMenu}/>
        <Route exact strict={false} path="/dashboard/:realm/general" component={GeneralMenu}/>
        <Route exact strict={false} path="/dashboard/:realm/settings" component={SettingsMenu}/>
        {/*<Route exact strict={false} path="/dashboard/:realm/version" component={VersionMenu}/>*/}
        <Route exact strict={false} path="/dashboard/:realm/worlds" component={WorldMenu}/>
        <Route exact strict={false} path="/dashboard/:realm/version" component={PluginsMenu}/>
        <Route exact strict={false}  path="/dashboard/:realm/players" component={PlayersMenu}/>
        <Route exact strict={false} path="/dashboard/:realm/statistics" component={StatisticsMenu}/>
        <Route exact strict={false} path="/dashboard/:realm/data" component={DataMenu}/>
      </Switch>
    )
  }
}

export default withRouter(Router)