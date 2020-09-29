import React from 'react'
import {ToolFilled} from '@ant-design/icons/lib'
import redirect from 'src/redirect'
import 'src/dashboard/DashboardPage/Menu/GeneralMenu/Card/style.scss'

interface Properties {
  name: string
  menuName: string
  image: string
  link: string
  className?: string
}

export default class Card extends React.Component<Properties> {
  render() {
    return (
      <div className={`${this.props.className || ''} dashboard-goto-card dashboard-card`}>
        <div className="dashboard-goto-card-description">
          <img src={this.props.image} alt={this.props.name}/>
          <div className="title">
            <b>{this.props.menuName}</b>
            <br />
            <span>{this.props.children}</span>
          </div>
        </div>
        <ToolFilled onClick={() => redirect(this.props.link)}/>
      </div>
    )
  }
}
