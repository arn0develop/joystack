import React from 'react'
import {CloseOutlined} from '@ant-design/icons'
import './style.scss'

interface Properties {
  imageUrl: string
  name: string
  removeUser: () => void
}

export default class Item extends React.Component<Properties> {
  render() {
    const {imageUrl, name, removeUser} = this.props
    return (
      <div className="user-category-item">
        <img src={imageUrl} width="30" alt="user"/>
        <span>{name}</span>
        <CloseOutlined onClick={() => removeUser()}/>
      </div>
    )
  }
}