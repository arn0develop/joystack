import React from 'react'
import NavigationBar from 'src/component/NavigationBar'
import Header from 'src/home/HomePage/Header'
import Slideshow from 'src/home/HomePage/Slideshow'
import Overview from 'src/home/HomePage/Overview'
import Footer from 'src/component/Footer'
import 'src/home/HomePage/style.scss'
import 'src/App.scss'

export default class HomePage extends React.Component<any> {
  render() {
    return (
      <div className="joystack-home joystack-page">
        <NavigationBar />
        <Header />
        <main className="page-content">
          <div className="container">
            <div
              className="row"
              style={{ marginTop: '100px', minHeight: '600px' }}
            >
              <div className="col-sm-12 col-md-7 slideshow-container">
                <Slideshow
                  images={[
                    {
                      source: '/images/slideshow_0.png',
                      name: 'First Image',
                      active: true,
                    },
                    {
                      source: '/images/slideshow_0.png',
                      name: 'Second Image',
                      active: false,
                    },
                    {
                      source: '/images/slideshow_0.png',
                      name: 'Third Image',
                      active: false,
                    },
                  ]}
                />
              </div>
              <div className="col-sm-offset-1 col-sm-12 col-md-4 col-sm-4">
                <Overview />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 nopadding" />
            </div>
            <div className="row">
              <div className="col-sm-12 nopadding" />
            </div>
            <div className="row">
              <div className="col-sm-12 nopadding" />
            </div>
            <div className="row">
              <div className="app-bottom" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}