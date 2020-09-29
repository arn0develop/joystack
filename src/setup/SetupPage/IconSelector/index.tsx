import React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {CombinedState, initialState} from '../../../state'
import {fetchIcons} from '../../state/icon/actions'
import {Card, Tooltip} from 'antd'
import {RealmIcon} from '@joystack/protocol/realm/icon/icon_service_pb'
import './style.scss'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    icons: state.realm.icon.icons,
    loaded: state.realm.icon.loaded
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({fetchIcons}, dispatch)
}

type Properties =
  & { onSelect: (icon: RealmIcon.AsObject) => void }
  & ReturnType<typeof mapDispatchToProperties>
  & ReturnType<typeof mapStateToProperties>

class IconSelector extends React.Component<Properties> {
  componentDidMount() {
    this.props.fetchIcons()
  }

  render() {
    return (
      <div className="icon-selector" style={{maxWidth: 350}}>
        <ul>
          {this.props.icons.map(icon => this.renderIcon(icon))}
        </ul>
      </div>
    )
  }

  private renderIcon(icon: RealmIcon.AsObject) {
    return (
      <li>
        <div className="icon-item" onClick={() => this.props.onSelect(icon)}>
          <img key={icon.name} alt={icon.name} src={icon.imagePath}/>
        </div>
      </li>
    )
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(IconSelector)