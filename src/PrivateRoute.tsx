import * as React from 'react'
import {connect} from 'react-redux'
import { Route, Redirect } from  'react-router-dom'
import {CombinedState, initialState} from './state'

function mapStateToProperties(state: CombinedState = initialState) {
  return { account: state.account.account }
}

interface RouteProperties {
  render: (properties: any) => React.ReactNode
  path: string
  name: string
  exact: boolean
}

type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = StateProperties & RouteProperties

class PrivateRoute extends React.Component<Properties> {
  render() {
    const loggedIn = this.props.account != null
    return loggedIn
      ? <Route path={this.props.path} name={this.props.name} exact={this.props.exact} render={this.props.render}/>
      : <Redirect to="/login"/>
  }
}

export default connect(mapStateToProperties, {})(PrivateRoute)