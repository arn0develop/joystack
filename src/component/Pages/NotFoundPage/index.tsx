import React from 'react'
import { Link } from 'react-router-dom'
import NavigationBar from 'src/component/NavigationBar'
import Footer from 'src/component/Footer'
import 'src/component/Pages/NotFoundPage/style.scss'
import 'src/App.scss'
import { withTranslation, WithTranslation } from 'react-i18next'

class NotFoundPage extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <div className="joystack-not-found">
        <NavigationBar/>
        <main className="not-found-content">
          <div>
            <img src="/images/404.png" alt="Not found"/>
          </div>
          <Link to="/">
            <button className="go-home-button">{t('GO_BACK_TO_HOME')}</button>
          </Link>
        </main>
        <Footer/>
      </div>
    )
  }
}

export default withTranslation('NOT_FOUND_PAGE')(NotFoundPage)