import React from 'react'
import {CombinedState, initialState} from '../../../state'
import {withTranslation, WithTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {Button} from 'antd'
import redirect from '../../../redirect'
import Loading from '../../../component/Loading'
import {Project} from '../../state/sidebar/state'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    projects: state.dashboard.sidebar.projects,
    hasRealm: state.dashboard.sidebar.loaded
  }
}

type Properties = ReturnType<typeof mapStateToProperties> & WithTranslation

class Landing extends React.Component<Properties> {
  componentDidMount() {
    if (this.props.projects.length !== 0) {
      this.openIfNonEmpty(this.props.projects)
    }
  }

  componentDidUpdate(previousProperties: Readonly<Properties>) {
    if (this.props.projects !== previousProperties.projects) {
      this.projectsDidUpdate(previousProperties.projects)
    }
  }

  private projectsDidUpdate(previous: Project[]) {
    if (previous.length === 0) {
      this.openIfNonEmpty(this.props.projects)
    }
    this.setState({...this.state, projects: this.props.projects})
  }

  private openIfNonEmpty(projects: Project[]) {
    if (projects.length !== 0) {
      this.openLatest(projects)
    }
  }

  private openLatest(projects: Project[]) {
    const sorted = projects.slice().sort((left, right) => left.realm.relativeId - right.realm.relativeId)
    const latest = sorted[sorted.length - 1]
    this.openProject(latest)
  }

  private openProject(project: Project) {
    redirect(`/dashboard/${project.realm.relativeId}/general`)
  }

  render() {
    return this.props.hasRealm
      ? this.renderNoProjects()
      : this.renderLoading()
  }

  private renderLoading() {
    return <Loading/>
  }

  private renderNoProjects() {
    return (
      <div className="centered">
        <h1>You do not have any realms yet</h1>
        <Button title="Create Realm" onClick={() => redirect('/dashboard/new')}/>
      </div>
    )
  }
}

export default connect(mapStateToProperties, {})(withTranslation('dashboard')(Landing))