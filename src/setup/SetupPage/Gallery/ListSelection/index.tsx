import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import 'src/setup/SetupPage/Gallery/Selection/style.scss'
import {Resource} from '@joystack/protocol/realm/resource'

interface Properties {
  resources: Resource.AsObject[]
  title: string
  subTitle?: string
  onDeselect: (resource: Resource.AsObject) => void
}

interface State {
  listHeight: number
  selectionCount: number
}

export default class ListSelection extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      listHeight: 0,
      selectionCount: 0
    }
  }

  private galleryContent = React.createRef<HTMLUListElement>()

  private setListHeight () {
    const { current } = this.galleryContent
    const { selectionCount, listHeight } = this.state
    const { resources } = this.props
    if (resources.length === 0 && listHeight !== 0) {
      this.setState({
        listHeight: 0
      })
    }
    if (current && resources.length !== selectionCount) {
      const listItemWidth = 220
      const listItemHeight = 55
      const contentHeight = 70
      const rowCount = Math.floor(current.clientWidth / listItemWidth)
      const columnCount = Math.ceil(resources.length / rowCount) * listItemHeight
      const listHeight =  contentHeight + columnCount
      this.setState({
        listHeight,
        selectionCount: resources.length
      })
    }
  }

  componentDidMount() {
    this.setListHeight()
  }

  componentDidUpdate() {
    this.setListHeight()
  }

  render() {
    const { resources } = this.props
    const { listHeight } = this.state
    return (
      <div
        className={`selected-gallery-content ${ resources.length !== 0 ? 'opened' : '' }`}
        style={{ height: listHeight }}
      >
        <div className="title">
          <span>{this.props.title}</span>
          {this.props.subTitle ? <span>{this.props.subTitle}</span> : null}
        </div>
        {this.renderSelection()}
      </div>
    )
  }

  private renderSelection(): React.ReactNode | undefined {
    const { resources } = this.props
    const items = resources.map((item) => this.renderSelectionEntry(item))
    return (
      <div className="selected-gallery">
        <ul ref={this.galleryContent}>{items}</ul>
      </div>
    )
  }

  private renderSelectionEntry(resource: Resource.AsObject): React.ReactNode | undefined {
    return (
      <li key={resource.id}>
        <span> {resource.name} </span>
        <CloseOutlined onClick={() => this.props.onDeselect(resource)} />
      </li>
    )
  }
}