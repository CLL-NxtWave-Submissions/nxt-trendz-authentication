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

  loginFailedResponseHandler = loginFailedResponseData => {
    const errorMsg = loginFailedResponseData.error_msg

    this.setState({
      loginErrorMessage: errorMsg,
    })
  }

  loginSuccessResponseHandler = currentLoginErrorMessage => {
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

    const loginResponseData = await loginPostRequestResponse.json()
    const loginResponseStatusCode = loginResponseData.status_code

    if (loginResponseStatusCode === undefined) {
      // login success
      this.loginSuccessResponseHandler(loginErrorMessage)
    } else {
      this.loginFailedResponseHandler(loginResponseData)
    }
  }

  renderLoginFormInputContainer = (
    inputId,
    inputType,
    inputLabel,
    inputPlaceholder,
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
        placeholder={inputPlaceholder}
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
      {/* <img
        className="login-brand-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      /> */}
      <img
        className="login-main-brand-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <img
        className="login-form-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="website login"
      />
      <div className="login-form-input-content-container">
        <img
          className="login-form-brand-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        {this.renderLoginFormInputContainer(
          'input-username',
          'text',
          'USERNAME',
          'Username',
          inputUsername,
          this.onUsernameChange,
        )}
        {this.renderLoginFormInputContainer(
          'input-password',
          'password',
          'PASSWORD',
          'Password',
          inputPassword,
          this.onPasswordChange,
        )}
        <button type="submit" className="login-button">
          Login
        </button>
        {currentLoginErrorMessage.length > 0 && (
          <p className="login-error-message">{`*${currentLoginErrorMessage}`}</p>
        )}
      </div>

      {/* {this.renderLoginFormInputContainer(
        'input-username',
        'text',
        'USERNAME',
        'Username',
        inputUsername,
        this.onUsernameChange,
      )}
      {this.renderLoginFormInputContainer(
        'input-password',
        'password',
        'PASSWORD',
        'Password',
        inputPassword,
        this.onPasswordChange,
      )}
      <button type="submit" className="login-button">
        Login
      </button>
      {currentLoginErrorMessage.length > 0 && (
        <p className="login-error-message">{currentLoginErrorMessage}</p>
      )} */}
    </form>
  )

  render() {
    const {username, password, loginErrorMessage} = this.state

    return (
      <div className="login-bg-container">
        <div className="login-content-container">
          {/* <img
            className="login-main-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          /> */}
          {this.renderLoginFormElement(username, password, loginErrorMessage)}
          {/* {this.renderLoginFormElement(...this.state)} */}
        </div>
      </div>
    )
  }
}
