import * as React from 'react'
import { Helmet } from 'react-helmet'
import SignInForm from 'src/login/LoginPage/LoginForm'
import SignUpForm from 'src/login/LoginPage/RegisterForm'
import 'src/login/LoginPage/style.scss'

const inlineBox = (content: JSX.Element) => (
  <div style={{ margin: 100, display: 'inline-block' }}>{content}</div>
)

export enum Type {
  LOGIN,
  REGISTER,
}

export interface Properties {
  type: Type
}

interface State {
  type: Type
}


export default class LoginPage extends React.Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { type: properties.type }
  }

  render() {
    return this.state.type === Type.LOGIN
      ? <SignInForm changeToRegister={() => this.setState({type: Type.REGISTER})}/>
      : <SignUpForm changeToLogin={() => this.setState({type: Type.LOGIN})}/>
  }
}
