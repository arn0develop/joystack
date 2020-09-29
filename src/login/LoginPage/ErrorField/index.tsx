import * as React from 'react'
import 'src/login/LoginPage/ErrorField/style.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
import {Alert} from 'antd'

interface Properties extends WithTranslation {
  message: string
}

class ErrorField extends React.Component<Properties> {
  render() {
    return (
      <Alert message="Error" type="error" showIcon />
    )
  }
}

export default withTranslation('login')(ErrorField)