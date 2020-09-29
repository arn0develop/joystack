import React, {ReactNode} from 'react'
import Modal from 'antd/lib/modal/Modal'
import './stlye.scss'
// import {nlNL} from "@material-ui/core/locale";

interface Properties {
  title: string
  modalClassName?: string
  closePopup: () => void
  isOpen: boolean
  renderButtons?: () => ReactNode
}

export default class Popup extends React.Component<Properties> {
  render() {
    const {title,children, modalClassName,isOpen,closePopup,renderButtons} = this.props
    return (
      <div>
        <Modal
          className={modalClassName}
          title={title}
          visible={isOpen}
          centered
          footer={null}
          onOk={closePopup}
          onCancel={closePopup}
        >
          {children}
          <div className='popup-buttons-container'>
            {renderButtons ? renderButtons() : ''}
          </div>
        </Modal>
      </div>
    )
  }
}
