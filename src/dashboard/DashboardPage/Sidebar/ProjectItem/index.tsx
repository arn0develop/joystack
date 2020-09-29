import * as React from 'react'
import 'src/dashboard/DashboardPage/Sidebar/ProjectItem/style.scss'

export interface Properties {
  name: string
  icon: string
  description: string
  status: {
    online: boolean
    active: number
    capacity: number
  }
}

export default class ProjectItem extends React.Component<Properties>{
  render() {
    return (
      <div className="sidebar-project-item">
        <img
          className="sidebar-project-item__icon unselectable-text"
          unselectable="on"
          src={this.props.icon}
          alt="project icon"
        />
        <span className="sidebar-project-item__text">
          <h3 unselectable="on" className="unselectable-text">{this.props.name}</h3>
          <h4 unselectable="on" className="unselectable-text">{this.props.description}</h4>
        </span>
        <span className="sidebar-project-item-status">
          <p unselectable="on" className="sidebar-project-item-status__count unselectable-text">
            {this.props.status.active}/{this.props.status.capacity}
            <span className={`dot ${this.props.status.online? 'online': 'offline'}`} />
          </p>
        </span>
      </div>
    )
  }
}