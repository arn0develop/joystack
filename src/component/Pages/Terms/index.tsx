import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Axios from 'axios'
import Loading from 'src/component/Loading'
import Footer from 'src/component/Footer'
import {CombinedState, initialState} from 'src/state'
import { connect } from 'react-redux'
import NavigationBar from 'src/component/NavigationBar'
import 'src/component/Pages/Terms/style.scss'

interface State {
  content: string
  errorMessage: null | string
}

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    language: state.translations.language,
  }
}

interface RouteParameters {
  language: 'de' | 'en'
}

type Properties = ReturnType<typeof mapStateToProperties> & RouteComponentProps<RouteParameters>

class Terms extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      content: '',
      errorMessage: null
    }
  }

  private async fetchContent () {
    const { language } = this.props
    const languageUrls = {
      en: 'https://www.iubenda.com/api/terms-and-conditions/99442124/no-markup',
      de: 'https://www.iubenda.com/api/nutzungsbedingungen/69638684/no-markup'
    }
    
    try {
      const response = await Axios(languageUrls[language])
      this.setState({
        content: response.data.content,
        errorMessage: null
      })
    } catch (error) {
      this.setState({
        errorMessage: error
      })
    }
  }

  componentDidMount() {
    this.fetchContent()
  }

  componentDidUpdate(prevProps: Properties) {
    if (this.props.language !== prevProps.language) {
      this.fetchContent()
    }
  }

  render() {
    const { match: {params}, language } = this.props
    const { content } = this.state
    if (params.language !== language) {
      return <Redirect to={`/terms/${language}`} />
    }
    return (
      <div>
        <NavigationBar />
        <div className="terms-content">
          {content ? <div dangerouslySetInnerHTML={{__html: content}} />: <Loading />}
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProperties)(Terms)
