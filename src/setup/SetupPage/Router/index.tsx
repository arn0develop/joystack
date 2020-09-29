import React from 'react'
import StepContainer from '../Step'
import {Route, Switch} from 'react-router-dom'
import BeginStep from '../Step/BeginStep'
import MinecraftServer from '../Step/MinecraftServer'
import ModpackServer from '../Step/ModpackServer'
import WorldSelection from '../Step/WorldSetup'
import DomainSetup from '../Step/DomainSetup'
import Summary from '../Step/Summary'
import Complete from '../Step/Complete'
import Mode from '../mode'

interface Properties {
  mode: Mode
}

export default class Router extends React.Component<Properties> {
  render() {
    const routePrefix = this.props.mode.path
    console.log(routePrefix)
    return (
      <Switch>
        <Route exact path={routePrefix} render={() => <BeginStep mode={this.props.mode} />}/>
        {[
          this.route({
            path: `${routePrefix}/minecraft`,
            component: <MinecraftServer/>,
            next: routePrefix === '/dashboard/edit' ? '/dashboard/fakeID/version': 'domain'
          }),
          this.route({
            path: `${routePrefix}/modpack`,
            component: <ModpackServer/>,
            next: routePrefix === '/dashboard/edit' ? '/dashboard/fakeID/version': 'domain'
          }),
          this.route({
            path: `${routePrefix}/world`,
            component: <WorldSelection/>,
            next: `${routePrefix}/summary`
          })
        ]}
        <Route path={`${routePrefix}/domain`} render={() => <DomainSetup mode={this.props.mode}/>}/>
        <Route path={`${routePrefix}/summary`} component={() => <Summary mode={this.props.mode}/>}/>
        <Route path={`${routePrefix}/complete`} component={() => <Complete mode={this.props.mode}/>}/>
      </Switch>
    )
  }

  private route(properties: {path: string; next: string; component: React.ReactNode; exact?: boolean; hideNavigation?: boolean}) {
    const step = (
      <StepContainer
        next={properties.next}
        hideNavigation={properties.hideNavigation}
        content={properties.component}
      />
    )
    return (
      <Route key={'route-' + properties.path} exact={properties.exact} path={properties.path} render={() => step}/>
    )
  }
}