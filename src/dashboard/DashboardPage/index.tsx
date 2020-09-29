import React from 'react'
import Sidebar from 'src/dashboard/DashboardPage/Sidebar'
import Router from 'src/dashboard/DashboardPage/Router'
import Header from 'src/dashboard/DashboardPage/Header'
import Footer from 'src/component/Footer'
import 'src/dashboard/DashboardPage/style.scss'
import {CombinedState, initialState} from '../../state'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {fetchProjectList} from '../state/sidebar/actions'
import Loading from '../../component/Loading'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    session: state.account.session,
    projectsLoaded: state.dashboard.sidebar.loaded
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    fetchProjectList: fetchProjectList
  }, dispatch)
}

type Properties = ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>

class DashboardPage extends React.Component<Properties> {
  constructor(properties: any) {
    super(properties)
  }

  async componentDidMount() {
    this.props.fetchProjectList()
  }

  render() {
    return (
      <div className="joystack-dashboard-page joystack-page">
        <Header/>
        <main className="dashboard-page-content">
          {this.props.projectsLoaded ? this.renderLoadedContent() : this.renderLoading()}
        </main>
        <Footer/>
      </div>
    )
  }

  private renderLoading() {
    return <Loading/>
  }

  private renderLoadedContent() {
    return (
      <React.Fragment>
        <Sidebar/>
        <div className="controller">
          <Router />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(DashboardPage)