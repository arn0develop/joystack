import React, { Fragment } from 'react'
import { Tabs, Input, Collapse, Skeleton } from 'antd'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import { Category } from 'src/setup/SetupPage/Gallery/category'
import Item from 'src/setup/SetupPage/Gallery/Item'
import 'src/setup/SetupPage/Gallery/style.scss'
import Pagination from 'src/setup/SetupPage/Gallery/Pagination'
import AccordingButton from 'src/component/AccordingButton'
import Selection from 'src/setup/SetupPage/Gallery/Selection'
import ListSelection from 'src/setup/SetupPage/Gallery/ListSelection'
import { ResourceServicePromiseClient } from '@joystack/protocol/realm/resource'
import config from '../../../config'
import { Resource, ListResourceRequest } from '@joystack/protocol/realm/resource'
import Popup from '../../../dashboard/DashboardPage/Popup'
import { bindActionCreators, Dispatch } from 'redux'
import { openPopup, closePopup } from './../../../dashboard/state/popup/actions'
import { connect } from 'react-redux'
const { TabPane } = Tabs
const { Panel } = Collapse

interface OwnProperties {
  title: string
  categories: Category[]
  onSelect: (resource: Resource.AsObject) => void
  selectMultiple?: boolean
  collapsed?: boolean
  entries?: Resource.AsObject[]
}

interface State {
  resources: Resource.AsObject[]
}

function mapStateToProperties(state: any) {
  return {
    isPopupOpen: state.dashboard.popup.isPopupOpen,
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    openPopup,
    closePopup
  },dispatch
  )
}

type DispatchProperties = ReturnType<typeof mapDispatchToProperties>
type StateProperties = ReturnType<typeof mapStateToProperties>
type Properties = OwnProperties & DispatchProperties & StateProperties

class Gallery extends React.Component<Properties, State> {
  static Selection = Selection
  static ListSelection = ListSelection

  constructor(properties: any) {
    super(properties)
    this.state = {
      resources: this.props.entries || [],
    }
  }

  private updateTabKey(key: string) {
    console.log(key)
  }

  async componentDidMount() {
    if (!this.props.entries) {
      const resourceClient = new ResourceServicePromiseClient(config.apiHost)
      const response = await resourceClient.list(new ListResourceRequest(), {})
      this.setState({
        resources: response.getResourcesList().map((resource) => resource.toObject()),
      })
    }
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (previous.entries !== this.props.entries) {
      if (this.props.entries) {
        this.setState({ resources: this.props.entries || [] })
      }
    }
  }

  onItemClick =()=> {
    this.props.openPopup()
  }

  render() {
    const { title, categories, collapsed, openPopup, closePopup, isPopupOpen } = this.props

    return (
      <>
        <div className="gallery-content">
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <AccordingButton active={isActive} />}
            defaultActiveKey={collapsed ? [] : ['1']}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header={<span className="title">{title}</span>}
              key={'1'}
              className="site-collapse-custom-panel"
            >
              <div className="tab-and-search">
                <div className="search-content">
                  <Input suffix={<SearchOutlined />} />
                </div>
                <Tabs defaultActiveKey="1" onChange={this.updateTabKey}>
                  {categories.map((category) => (
                    <TabPane tab={category.name} key={category.id}>
                      <div className="galleries" onClick={this.onItemClick}>
                        {this.renderResources(category)}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
              <Pagination />
            </Panel>
          </Collapse>
          <Popup
            renderButtons={() => (
              <>
                <button
                  onClick={openPopup}
                  key="yes" className="">
                  <DownloadOutlined />
                  Install
                </button>
              </>
            )}
            isOpen={isPopupOpen}
            closePopup={closePopup}
            modalClassName={'map-popup'}
            title={title === 'AVAILABLE_PLUGINS' ? 'Modpack details' : 'Map details'}
          >
            <div className="info-container">
              <img src="https://staticmapmaker.com/img/google.png" alt="" />
              <div className="map-info">
                <h4>Modpack name</h4>
                <p>
                  <span>Creator:</span>
                  <span>UserName</span>
                </p>
                <p>
                  <span>Version:</span>
                  <span>Map Version</span>
                </p>
                <p>
                  <span>Mr.Version:</span>
                  <span>Map MC Version</span>
                </p>
                <p>
                  <span>Players:</span>
                  <span>x - y Players</span>
                </p>
                <p>
                  <span>Category:</span>
                  <span>Category Name</span>
                </p>
              </div>
              <div className="description">
                <h3>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium blanditiis
                  deleniti ex, expedita explicabo facilis fugit laudantium maxime minima nam
                  obcaecati placeat quas, recusandae reiciendis repudiandae sed suscipit veniam
                  voluptatum.
                </p>
              </div>
            </div>
          </Popup>
        </div>
      </>
    )
  }

  private renderResources(category: Category) {
    if (this.state.resources.length === 0) {
      return Array(6).map((value, index) => (
        <Skeleton.Image
          key={index}
          style={{
            height: 100,
            width: 100,
          }}
        />
      ))
    }
    return this.state.resources.filter(category.filter).map((resource, index) => (
      <Fragment key={index}>
        <Item

          resource={resource}
          selectMultiple={this.props.selectMultiple}
          onSelect={this.props.onSelect}
        />
      </Fragment>
    ))
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(Gallery)
