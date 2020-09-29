import React, { Fragment } from 'react'
import { Collapse, Badge } from 'antd'
import AccordingButton from 'src/component/AccordingButton'
import Item from 'src/dashboard/DashboardPage/Menu/PlayersMenu/UserSet/Item'
import { withTranslation, WithTranslation } from 'react-i18next'
import { PlusOutlined } from '@ant-design/icons'
import generateUniqueId from 'src/util/generateUniqueId'
import { DebounceInput } from 'react-debounce-input'
import findSource from 'src/util/avatar/findSource'
import 'src/dashboard/DashboardPage/Menu/PlayersMenu/UserSet/style.scss'
import ErrorMessage from 'src/component/ErrorMessage'

interface Properties extends WithTranslation {
  title: string
}

interface Users {
  id: string
  imageUrl: string
  name: string
}

interface State {
  users: Users[]
  isReadyToAdd: boolean
  userAvatar: string
  userName: string
  playersContentHeight: number
  rowCount: number
  errorMessage: null | string
}

const enterKeyCode = 13

function isEnter(event: React.KeyboardEvent): boolean {
  return event.keyCode === enterKeyCode
}

class UserCategoryList extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      users: [],
      isReadyToAdd: false,
      userAvatar: 'https://minotar.net/helm/steve',
      userName: '',
      playersContentHeight: 45,
      rowCount: 1,
      errorMessage: null
    }
  }

  private async updateSelectedOwner(target: string) {
    if(this.state.errorMessage) {
      this.modifyState((state) => (state.errorMessage = null))
    }
    this.modifyState((state) => state.userName = target)
    const avatar = await findSource(target)
    this.modifyState(state => state.userAvatar = avatar)
  }

  private setReadyToAdd(flag: boolean) {
    this.modifyState((state) => {
      state.isReadyToAdd = flag
      state.errorMessage = null
    })
  }

  private modifyState(modification: (state: State) => void) {
    const updatedState: State = Object.assign({}, this.state)
    modification(updatedState)
    this.setState(updatedState)
  }

  private addUser() {
    const { userName, userAvatar } = this.state
    if (userName.trim().length < 2 || userName.trim().length > 16) {
      this.modifyState((state) => {
        state.errorMessage = this.props.t('PLAYERS_MENU.THE_TEXT_SHOULD_INCLUDE_2_16_SYMBOLS')
      })
      return
    }
    this.modifyState((state) => {
      state.isReadyToAdd = false
      state.userName = ''
      state.userAvatar = 'https://minotar.net/helm/steve'
      state.errorMessage = null
      state.users = [
        ...state.users,
        {
          id: generateUniqueId(),
          name: userName,
          imageUrl: userAvatar,
        },
      ]
    })
  }

  private removeUser(userId: string) {
    this.modifyState((state) => {
      state.users = state.users.filter(user => user.id   !== userId)
    })
  }

  private playersContent = React.createRef<HTMLDivElement>()

  private setPlayersContentHeight () {
    if (!this.playersContent.current) {
      return
    }
    const { children, clientWidth } = this.playersContent.current

    const elementMargin = 20
    const rowHeight = 45
    let rowLength = 1
    let columnLength = 0
    Array.from(children).forEach(element => {
      if (columnLength + element.clientWidth + elementMargin >= clientWidth) {
        columnLength = 0
        rowLength++
      }
      columnLength += element.clientWidth + elementMargin
    })

    if (this.state.rowCount !== rowLength) {
      this.modifyState((state) => {
        state.playersContentHeight = rowHeight * rowLength
        state.rowCount = rowLength
      })
    }
  }

  componentDidMount() {
    this.setPlayersContentHeight()
  }

  componentDidUpdate() {
    this.setPlayersContentHeight()
  }

  render() {
    const panelHeader = (
      <span className="title">
        {this.props.title}
        <Badge count={this.state.users.length} showZero />
      </span>
    )
    return (
      <div className="user-category-list-content">
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => <AccordingButton active={isActive} />}
          defaultActiveKey="1"
        >
          <Collapse.Panel header={panelHeader} key="1">
            <div style={{height: this.state.playersContentHeight}} ref={this.playersContent} className="players-content">
              {this.renderSelectedUsers()}
              {this.renderAddContent()}
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
    )
  }

  private renderSelectedUsers() {
    return this.state.users.map(({ id, ...user }) => (
      <Fragment key={id}>
        <Item {...user} removeUser={() => this.removeUser(id)} />
      </Fragment>
    ))
  }

  private renderAddContent() {
    return (
      <div className="add-player-content">
        {this.state.isReadyToAdd ? (
          this.renderReadySelection()
        ) : (
          <div className="add-player" onClick={() => this.setReadyToAdd(true)}>
            <span className="player-name">
              {this.props.t('PLAYERS_MENU.NEW_PLAYER')}
            </span>
            <PlusOutlined />
          </div>
        )}
      </div>
    )
  }

  private renderReadySelection() {
    const { userName, userAvatar, errorMessage } = this.state
    const { t } = this.props
    return (
      <>
        <ErrorMessage message={errorMessage} />
        <DebounceInput
          className={`add-user-input ${errorMessage? 'input-error': ''}`}
          value={userName}
          onChange={(event) =>
            this.updateSelectedOwner(event.target.value)
          }
          onKeyDown={(event) =>
            isEnter(event) ? this.addUser() : null
          }
          debounceTimeout={300}
          placeholder={t('PLAYERS_MENU.NAME')}
          type="text"
          autoFocus
        />
        <img width="30" src={userAvatar} alt="user" />
        <button className="confirm" onClick={() => this.addUser()}>
          {t('PLAYERS_MENU.CONFIRM')}
        </button>
        <button className="cancel" onClick={() => this.setReadyToAdd(false)}>
          {t('PLAYERS_MENU.CANCEL')}
        </button>
      </>
    )
  }
}

export default withTranslation('dashboard')(UserCategoryList)
