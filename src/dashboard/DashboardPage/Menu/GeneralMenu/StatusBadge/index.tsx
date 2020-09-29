import React from 'react'
import {CombinedState, initialState} from 'src/state'
import Badge from '../../../../../component/Badge'
import {Realm} from '@joystack/protocol/realm'
import {connect} from 'react-redux'
import {findProjectByRelativeId} from '../../../../state/sidebar/state'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    project: findProjectByRelativeId(
      state.dashboard.sidebar.active.relativeId,
      state.dashboard.sidebar.projects
    ),
    realmStatus: state.dashboard.sidebar.active.status
  }
}

type Properties = ReturnType<typeof mapStateToProperties>

class StatusBadge extends React.Component<Properties> {
  render() {
    const isOffline = true
    return (
      <div className="badge-container">
        <Badge
          shadow
          copyText={this.props.project?.name + '.joystack.host' || 'not found'}
          imageSource={this.props.project?.icon || 'https://media.joystack.com/servericons/joystack-logo.png'}
          description={{
            firstMessageLine: `<p><span style="color: #3FE3E2">${this.props.project?.description}</span></p>`,
            secondMessageLine: '<p style="color: #FFF65F">Hosted by joystack.com</p>',
            name: this.props.project?.name || 'undefined',
            onlineCount: 0,
            onlineLimit: 0
          }}
          offline={isOffline}
        />
        <span className={`dot ${isOffline? 'offline': 'online'}`} />
      </div>
    )
  }
}

export default connect(mapStateToProperties, {})(StatusBadge)