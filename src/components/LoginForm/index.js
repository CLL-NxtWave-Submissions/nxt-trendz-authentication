import {Component} from 'react'

import './index.css'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    loginErrorMessage: '',
  }

  onUsernameChange = usernameChangeEvent =>
    this.setState({
      username: usernameChangeEvent.target.value,
    })

  onPasswordChange = passwordChangeEvent =>
    this.setState({
      password: passwordChangeEvent.target.value,
    })

  makeLoginPostRequestAndFetchResponse = async userLoginCredentials => {
    const loginPostRequestUrl = 'https://apis.ccbp.in/login'
    const stringifiedLoginCredentials = JSON.stringify(userLoginCredentials)
    const loginPostRequestOptions = {
      method: 'POST',
      body: stringifiedLoginCredentials,
    }

    const loginPostRequestResponse = await fetch(
      loginPostRequestUrl,
      loginPostRequestOptions,
    )

    return loginPostRequestResponse
  }

  loginFailedResponseHandler = async loginFailedResponse => {
    const responseData = await loginFailedResponse.json()
    const {errorMsg} = responseData.error_msg

    this.setState({
      loginErrorMessage: errorMsg,
    })
  }

  loginSuccessResponseHandler = (
    loginSuccessResponse,
    currentLoginErrorMessage,
  ) => {
    if (currentLoginErrorMessage !== '') {
      this.setState({
        loginErrorMessage: '',
      })
    }

    const {history} = this.props
    history.replace('/')
  }

  onLoginFormSubmit = async formSubmitEvent => {
    formSubmitEvent.preventDefault()

    const {username, password, loginErrorMessage} = this.state

    const loginCredentials = {
      username,
      password,
    }

    const loginPostRequestResponse = await this.makeLoginPostRequestAndFetchResponse(
      loginCredentials,
    )

    if (!loginPostRequestResponse.ok) {
      await this.loginFailedResponseHandler(loginPostRequestResponse)
    } else {
      // login success
      this.loginSuccessResponseHandler(
        loginPostRequestResponse,
        loginErrorMessage,
      )
    }
  }

  renderLoginFormInputContainer = (
    inputId,
    inputType,
    inputLabel,
    inputValue,
    inputChangeHandler,
  ) => (
    <div className="login-form-input-container">
      <label className="login-form-input-label" htmlFor={inputId}>
        {inputLabel}
      </label>
      <input
        id={inputId}
        type={inputType}
        className="login-form-input"
        value={inputValue}
        onChange={inputChangeHandler}
      />
    </div>
  )

  renderLoginFormElement = (
    inputUsername,
    inputPassword,
    currentLoginErrorMessage,
  ) => (
    <form
      className="login-form-content-container"
      onSubmit={this.onLoginFormSubmit}
    >
      <img
        className="login-brand-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <img
        className="login-form-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="website login"
      />
      {this.renderLoginFormInputContainer(
        'input-username',
        'text',
        'USERNAME',
        inputUsername,
        this.onUsernameChange,
      )}
      {this.renderLoginFormInputContainer(
        'input-password',
        'password',
        'PASSWORD',
        inputPassword,
        this.onPasswordChange,
      )}
      <button type="submit" className="login-button">
        Login
      </button>
      {currentLoginErrorMessage.length > 0 && (
        <p className="login-error-message">{currentLoginErrorMessage}</p>
      )}
    </form>
  )

  render() {
    // const {username, password, loginErrorMessage} = this.state

    return (
      <div className="login-bg-container">
        <div className="login-content-container">
          <img
            className="login-main-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          />
          {/* {this.renderLoginFormElement(username, password, loginErrorMessage)} */}
          {this.renderLoginFormElement(...this.state)}
        </div>
      </div>
    )
  }
}
