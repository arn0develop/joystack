import {connect} from 'react-redux'
import {WithTranslation, withTranslation} from 'react-i18next'
import {CombinedState, initialState} from '../../../../state'
import React from 'react'
import redirect from 'src/redirect'
import Mode from '../../mode'
import {bindActionCreators, Dispatch} from 'redux'
import {fetchProjectList} from '../../../../dashboard/state/sidebar/actions'
import {createFullDomainName} from '../../../state/wizard'
import Loading from '../../../../component/Loading'
import {createRealm, RealmCreationError, Result} from './creation'

function mapStateToProperties(state: CombinedState = initialState) {
  return {
    wizard: state.realm.wizard,
    session: state.account.session
  }
}

function mapDispatchToProperties(dispatch: Dispatch) {
  return bindActionCreators({
    fetchProjectList: fetchProjectList
  }, dispatch)
}

interface OwnProperties {
  mode: Mode
}

type Properties = OwnProperties
  & ReturnType<typeof mapStateToProperties>
  & ReturnType<typeof mapDispatchToProperties>
  & WithTranslation

interface State {
  done: boolean
  result?: Result
}

class Complete extends React.Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = { done: false }
  }

  async componentDidMount() {
    try {
      const result = await this.create()
      this.setState({done: true, result})
    } catch (error) {
      alert(error)
      this.setState({done: true, result: {realmCreationError: RealmCreationError.OTHER}})
    }
  }

  componentDidUpdate(
    previousProperties: Readonly<Properties>,
    previousState: Readonly<State>
  ) {
    if (previousState.done !== this.state.done) {
      this.stateDidUpdate()
    }
  }

  private stateDidUpdate() {
    const result = this.state.result
    console.log({result})
    if (result?.realmCreationError) {
      this.fail(result)
    } else {
      this.proceed()
    }
  }

  async proceed() {
    this.props.fetchProjectList()
    setTimeout(() => redirect('/dashboard'), 2000)
  }

  async fail(result: Result) {
    alert('failed to create realm')
    redirect('/dashboard')
  }

  private create(): Promise<Result> {
    const iconId = this.props.wizard.icon?.id
    const typeId = this.props.wizard.type?.id
    const description = this.props.wizard.realmDescription
    if (!iconId || !typeId || !this.props.session) {
      throw new Error('precondition')
    }
    const domain = createFullDomainName(description.domainName, description.subDomain)
    if (!domain) {
      throw new Error('precondition')
    }
    return createRealm({
      template: {
        resources: this.props.wizard.resources,
        iconId,
        typeId
      },
      description: {
        capacity: 20,
        name: this.props.wizard.realmDescription.name,
        domain,
        text: description.text
      },
      session: this.props.session
    })
  }

  render() {
    return <Loading/>
  }
}

export default connect(mapStateToProperties, mapDispatchToProperties)(withTranslation('setup')(Complete))