import React from 'react'
import {Button, Collapse, Dropdown, Input, Menu} from 'antd'
import {
  AppstoreOutlined,
  FolderOutlined,
  GlobalOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha'
import SortIcon from '@material-ui/icons/Sort'
import DateRangeIcon from '@material-ui/icons/DateRange'
import PersonIcon from '@material-ui/icons/Person'
import {withTranslation, WithTranslation} from 'react-i18next'
import 'src/dashboard/DashboardPage/Sidebar/style.scss'
import redirect from 'src/redirect'
import {RouteComponentProps, withRouter, Link} from 'react-router-dom'
import ProjectItem from './ProjectItem'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons/lib'
import {CombinedState, initialState} from '../../../state'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {sortByName, sortByPlayers, SortCriteria} from './sorting'
import {Project} from '../../state/sidebar/state'
import {subscribeRealmUpdates} from '../../state/sidebar/actions'

interface State {
  collapsed: boolean
  selectedProjectKey: string
  sortCriteria: SortCriteria
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    hasRealm: state.dashboard.sidebar.loaded,
    realmId: state.dashboard.sidebar.active.realmId,
    statusEntries: state.dashboard.display.entries,
    projects: state.dashboard.sidebar.projects,
    relativeId: state.dashboard.sidebar.active.relativeId,
    openedSidebar: state.dashboard.sidebar.isOpen
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    subscribeRealmUpdates: subscribeRealmUpdates
  }, dispatch)
}

type Properties = RouteComponentProps<any>
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

class Sidebar extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      collapsed: false,
      selectedProjectKey: 'realm-' + properties.relativeId,
      sortCriteria: sortByName
    }
  }

  componentDidMount() {
    this.maybeWatchRealmUpdates()
  }

  componentDidUpdate(previous: Readonly<Properties>) {
    if (previous.relativeId !== this.props.relativeId) {
      this.setState({
        ...this.state,
        selectedProjectKey: 'realm-' + this.props.relativeId
      })
    }
    if (previous.realmId !== this.props.realmId) {
      this.maybeWatchRealmUpdates()
    }
  }

  private maybeWatchRealmUpdates() {
    const realmId = this.props.realmId
    if (this.props.hasRealm && realmId) {
      this.props.subscribeRealmUpdates(realmId)
    }
  }

  private selectActiveFlagForPath(path: string) {
    return this.props.location.pathname === path ? 'active' : ''
  }

  private updateSortCriteria(criteria: SortCriteria) {
    this.setState({...this.state, sortCriteria: criteria})
  }

  private updateSelectedTab(key: string) {
    const {selectedProjectKey} = this.state
    this.setState({selectedProjectKey: key || selectedProjectKey})
  }

  private navigateTo(link: string) {
    window.location.href = link
  }

  render() {
    return (
      <div
        className={`sidebar-container ${this.props.openedSidebar ? 'opened': ''}`}>
        <div className="sidebar-searchbar">
          <div className="sidebar-searchbar-input">
            <Input suffix={<SearchOutlined/>}/>
          </div>
          <PlusOutlined onClick={() => redirect('/dashboard/new')}/>
          {this.renderFilterDropdown()}
        </div>
        <Collapse
          bordered={false}
          accordion={true}
          destroyInactivePanel={true}
          onChange={(key) => this.updateSelectedTab(key as string)}
          activeKey={this.state.selectedProjectKey}
        >
          {this.renderProjects()}
        </Collapse>
        <div className="create-project-content">
          <Link to="/dashboard/new">
            <Button>
              <PlusOutlined/>
              <span>Create Project</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  private renderProjects() {
    return this.props.projects.slice()
      .sort(this.state.sortCriteria)
      .map(project => this.renderPanel(project))
  }

  private renderFilterDropdown() {
    const {t} = this.props
    return (
      <Dropdown
        trigger={['click']}
        placement="bottomCenter"
        overlay={
          <Menu className="sort-menu">
            <Menu.Item
              onClick={() => this.updateSortCriteria(sortByName)}
              icon={<SortByAlphaIcon/>}
            >
              {t('sidebar.sort.name')}
            </Menu.Item>
            <Menu.Item icon={<DateRangeIcon/>}>
              {t('sidebar.sort.lastChange')}
            </Menu.Item>
            <Menu.Item icon={<ImportExportIcon/>}>
              {t('sidebar.sort.imported')}
            </Menu.Item>
            <Menu.Item
              onClick={() => this.updateSortCriteria(sortByPlayers)}
              icon={<PersonIcon/>}
            >
              {t('sidebar.sort.activeUsers')}
            </Menu.Item>
          </Menu>
        }
      >
        <Button className="sort">
          <SortIcon/>
        </Button>
      </Dropdown>
    )
  }

  private renderPanel(project: Project) {
    return (
      <Collapse.Panel showArrow={false} key={project.key} header={
        <ProjectItem
          name={project.name}
          icon={project.icon}
          description={project.description}
          status={{
            online: true,
            active: 0,
            capacity: 0
          }}
        />
      }>
        {this.renderMenu(project.realm.relativeId)}
      </Collapse.Panel>
    )
  }

  private renderMenu(relativeRealmId: number): React.ReactNode {
    return (
      <Menu className="dashboard-sidebar sidebar-opened">
        {this.listLinks(relativeRealmId)}
      </Menu>
    )
  }

  private listLinks(relativeRealmId: number) {
    return [
      this.link('sidebar.links.general', `/dashboard/${relativeRealmId}/general`,
        <PlayCircleOutlined/>),
      this.link('sidebar.links.settings', `/dashboard/${relativeRealmId}/settings`,
        <UnorderedListOutlined/>),
      this.link('sidebar.links.worlds', `/dashboard/${relativeRealmId}/worlds`,
        <GlobalOutlined/>),
      this.link('sidebar.links.plugins', `/dashboard/${relativeRealmId}/plugins`,
        <AppstoreOutlined/>),
      this.link('sidebar.links.players', `/dashboard/${relativeRealmId}/players`,
        <UserOutlined/>),
      this.link('sidebar.links.statistics', `/dashboard/${relativeRealmId}/statistics`,
        <PieChartOutlined/>),
      this.link('sidebar.links.data', `/dashboard/${relativeRealmId}/data`,
        <FolderOutlined/>)
    ]
  }

  private link(name: string, link: string, icon: React.ReactNode) {
    return (
      <Menu.Item
        key={name}
        className={this.selectActiveFlagForPath(link)}
        onClick={() => redirect(link)}
        icon={icon}
      >
        {this.props.t(name)}
      </Menu.Item>
    )
  }
}

export default withRouter(
  connect(mapStateToProperties, mapDispatchToProperties
  )(withTranslation('dashboard')(Sidebar)))