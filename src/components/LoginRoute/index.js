import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import apiService from '../../services/api'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
    isLoading: false,
    showPassword: false,
  }

  onChangeUsername = (event) => {
    this.setState({username: event.target.value, isError: false, errorMsg: ''})
  }

  onChangePassword = (event) => {
    this.setState({password: event.target.value, isError: false, errorMsg: ''})
  }

  togglePasswordVisibility = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }))
  }

  onSubmitSuccess = (jwtToken) => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = (errorMsg) => {
    this.setState({isError: true, errorMsg, isLoading: false})
  }

  submitForm = async (event) => {
    event.preventDefault()
    const {username, password} = this.state
    
    if (!username.trim()) {
      this.onSubmitFailure('Username is required')
      return
    }
    
    if (!password.trim()) {
      this.onSubmitFailure('Password is required')
      return
    }
    
    this.setState({isLoading: true, isError: false, errorMsg: ''})
    
    try {
      const result = await apiService.login({username, password})
      if (result.jwt_token) {
        this.onSubmitSuccess(result.jwt_token)
      }
    } catch (error) {
      this.onSubmitFailure(error.error_msg || 'Login failed!')
      this.setState({isLoading: false})
    }
  }

  render() {
    const {username, password, isError, errorMsg, isLoading, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
      return null
    }

    return (
      <div className="login-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          
          <form onSubmit={this.submitForm} className="login-form">
            <div className="login-input-container">
              <label className="login-input-label" htmlFor="username">
                USERNAME
              </label>
              <div className="input-icon-wrapper">
                <HiUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  className="login-input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                  placeholder="Enter username"
                />
              </div>
            </div>
            
            <div className="login-input-container">
              <label className="login-input-label" htmlFor="password">
                PASSWORD
              </label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="login-input-field"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="login-loader"></div>
              ) : (
                'Login'
              )}
            </button>
            
            {isError && (
              <p className="login-error-message">
                {errorMsg}
              </p>
            )}
            
            <p className="login-auth-footer">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute