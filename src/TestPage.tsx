import * as React from 'react'
import {login} from './login'
import {Button, Card, Checkbox, Form, Input, Modal} from 'antd'

interface Response {
  success: boolean
  content: string
}

interface State {
  email: string
  password: string
  response?: Response
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export default class TestPage extends React.Component<{}, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      response: undefined,
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="container" style={{marginTop: 50}}>
        <div className="row">
          <div className="col-md-5">
            {this.renderInputCard()}
            {this.state.response && this.renderErrorCard()}
          </div>
        </div>
      </div>
    )
  }

  private renderInputCard() {
    return (
      <Card
        title="Login"
        bordered
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => this.click()}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input onChange={event => this.setState({email: event.target.value})} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={event => this.setState({password: event.target.value})}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  private renderErrorCard() {
    return (
      <Modal
        title={this.state.response?.success ? 'Success Response' : 'Error Response'}
        visible={this.state.response != undefined}
        onOk={() => this.setState({response: undefined, email: '', password: ''})}
        onCancel={() => this.setState({response: undefined})}
      >
        <pre>
          {this.state.response?.content}
        </pre>
      </Modal>
    )
  }

  private async click() {
    try {
      const response = await login({...this.state})
      const message = {
        account: response.account.toObject(),
        response: response.response.toObject()
      }
      this.setState({
        response: {
          success: true,
          content: JSON.stringify(message, null, 2)
        }
      })
    } catch (error) {
      console.log({message: 'got an error', error})
      this.setState({
        response: {
          success: false,
          content: JSON.stringify(error, null, 2)
        }
      })
    }
  }
}