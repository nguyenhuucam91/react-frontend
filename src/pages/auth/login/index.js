import React, { useState } from 'react'
import { Form, Input, Icon, Checkbox, Typography, Row, Col, Button, Alert } from 'antd';
import styles from './index.css'
import authService from '@/services/authService';
import { LOCAL_STORAGE_AUTH_PREFIX, AUTH_TOKEN_KEY } from '@/utils/request';
import { router } from 'umi';
import { buildRelativeUrl } from '@/utils/url';
import { routes } from '@/constants/routes';

const { Title } = Typography;

const Login = (props) => {

  document.title = "Login"

  const [ hasErrorMessage, toggleErrorMessage ] = useState(false);

  const [ loginErrorMessage, setLoginErrorMessage ] = useState("")

  const { form } = props;

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (error, value) => {
      if (!error) {
        const result = await authService.login(value)
        if (!result.success) {
          return toggleErrorMessage(false)
        }
        // handling success situation
        toggleErrorMessage(true);
        setLoginErrorMessage("Check email and password")
        localStorage.setItem(LOCAL_STORAGE_AUTH_PREFIX+AUTH_TOKEN_KEY, result.data.access_token)
        router.push(buildRelativeUrl(routes.api.paths.dashboard))
      }
      //if error exists
      else {
        toggleErrorMessage(true);
        setLoginErrorMessage("Check validation before login")
      }
    })
  }

  return (
    <Row align="middle" justify="space-around">
      <Col md={8} xl={9} sm={6}></Col>
      <Col md={8} xl={6} sm={12}>
        <Title level={2}>Login form</Title>
        {/* Alert */}
        {hasErrorMessage && <Alert type="error" message={loginErrorMessage} closable afterClose={toggleErrorMessage(false)}></Alert>}
        {/* Form */}
        <Form className={styles.login} onSubmit={handleSubmit}>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Email should be in correct format'}
              ],
              validateTrigger: 'onBlur',
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              validateTrigger: 'onBlur',
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Remember me</Checkbox>)}
          </Form.Item>

          <Button block type="primary" htmlType="submit" onClick={handleSubmit}>Login</Button>
        </Form>
      </Col>
      <Col md={8} xl={9} sm={6}></Col>
    </Row>
  );
}

export default Form.create()(Login)
