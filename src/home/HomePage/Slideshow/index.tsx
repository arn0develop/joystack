import React from 'react'
import { NavLink } from 'react-router-dom'
import 'src/home/HomePage/Slideshow/style.scss'

interface Image {
  source: string
  name: string
  active?: boolean
}

interface Properties {
  images: Image[]
}

export default class Slideshow extends React.Component<Properties> {
  render() {
    return (
      <div
        id="joystack-slideshow"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {this.props.images.map((image, index) => (
            <div
              key={'image-' + index}
              className={`carousel-item ${image.active ? 'active' : ''}`}
            >
              <img
                className="d-block w-100"
                src={image.source}
                alt={image.name}
              />
            </div>
          ))}
        </div>
        <NavLink
          className="carousel-control-prev"
          to="#joystack-slideshow"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </NavLink>
        <NavLink
          className="carousel-control-next"
          to="#joystack-slideshow"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </NavLink>
        <ol className="carousel-indicators">
          {this.props.images.map((image, index) => (
            <li
              key={'indicator-' + index}
              className={`${image.active ? 'active' : ''}`}
              data-target="#joystack-slideshow"
              data-slide-to={`"${index}"`}
            />
          ))}
        </ol>
      </div>
    )
  }
}
