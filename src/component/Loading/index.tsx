import React from 'react'
import 'src/component/Loading/style.scss'

class Loading extends React.Component {
  render() {
    return (
      <div {...this.props} className="spinner-box">
        <div className="circle-border">
          <div className="circle-core">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
