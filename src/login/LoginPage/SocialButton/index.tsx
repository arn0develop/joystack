import * as React from 'react'
import './style.scss'

interface Properties {
  text: string
  type: string
  brandImage: string
}

export default class SocialButton extends React.Component<Properties> {
  render() {
    const socialClass = 'social-' + this.props.type
    return (
      <button className={`social-button ${socialClass}`}>
        <span className='social-button__icon-container'>
          <img src={`/images/brands/${this.props.brandImage}.svg`} alt={`${this.props.type} logo`}/>
        </span>
        <p className={`social-button__text ${socialClass}`}>
          {this.props.text}
        </p>
      </button>
    )
  }
}