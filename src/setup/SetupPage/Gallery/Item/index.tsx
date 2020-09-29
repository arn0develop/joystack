import React from 'react'
import 'src/setup/SetupPage/Gallery/Item/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib'
import {Resource} from '@joystack/protocol/realm/resource'

interface Properties extends WithTranslation {
  resource: Resource.AsObject
  selectMultiple?: boolean
  onSelect: (resource: Resource.AsObject) => void
}

class Item extends React.Component<Properties> {
  render() {
    const imagePath = this.props.resource.imagePath || 'https://via.placeholder.com/100'
    return (
      <div className="gallery-item-content" onClick={() => this.props.onSelect(this.props.resource)}>
        <div className="image-content">
          <div className="add-gallery" >
            {this.props.selectMultiple ? <PlusOutlined/> : <CheckOutlined/>}
          </div>
          <img src={imagePath} alt={this.props.resource.name} />
        </div>
        <div className="about-gallery">
          <span className="title">{this.props.resource.name}</span>
          <span className="description">{this.selectDescription()}</span>
          <span className="downloads">by {this.props.resource.authorName}</span>
        </div>
      </div>
    )
  }

  private selectDescription(): string {
    const descriptions = new Map(this.props.resource.descriptionsMap)
    switch (this.props.i18n.language) {
    case 'en':
      return descriptions.get('english') || 'no description'
    case 'de':
    default:
      return descriptions.get('german') || 'no description'
    }
  }

}

export default withTranslation('SETUP_PAGE')(Item)