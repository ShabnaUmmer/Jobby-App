import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import apiService from '../../services/api'
import './index.css'

class RegisterRoute extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
    registerError: '',
    isRegistered: false,
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
  }

  validateForm = () => {
    const {username, email, password, confirmPassword} = this.state
    const newErrors = {}

    if (!username.trim()) {
      newErrors.username = 'Username is required'
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    this.setState({errors: newErrors})
    return Object.keys(newErrors).length === 0
  }

  handleRegister = async (event) => {
    event.preventDefault()
    
    if (!this.validateForm()) {
      return
    }

    const {username, email, password} = this.state
    
    this.setState({ isLoading: true, registerError: '' })
    
    try {
      await apiService.register({ username, email, password })
      this.setState({ isRegistered: true, isLoading: false })
      
      setTimeout(() => {
        const {history} = this.props
        history.replace('/login')
      }, 2000)
    } catch (error) {
      this.setState({ 
        registerError: error.error_msg || 'Registration failed!', 
        isLoading: false 
      })
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value}, () => {
      const {errors} = this.state
      if (errors && errors[name]) {
        this.setState({
          errors: {...errors, [name]: ''}
        })
      }
    })
  }

  togglePasswordVisibility = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }))
  }

  toggleConfirmPasswordVisibility = () => {
    this.setState(prev => ({ showConfirmPassword: !prev.showConfirmPassword }))
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errors,
      registerError,
      isRegistered,
      showPassword,
      showConfirmPassword,
      isLoading,
    } = this.state
    
    const jwtToken = Cookies.get('jwt_token')
    
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
      return null
    }
    
    if (isRegistered) {
      return (
        <div className="register-container">
          <div className="register-form-container success-animation">
            <div className="register-success-message">
              <div className="success-icon">
                <FaUserPlus />
              </div>
              <h2>Registration Successful!</h2>
              <p>Redirecting to login page...</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="register-container">
        <div className="register-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="register-website-logo"
          />
          
          {registerError && <p className="register-error-message">{registerError}</p>}
          
          <form onSubmit={this.handleRegister} className="register-form">
            <div className="register-input-container">
              <label className="register-input-label" htmlFor="username">
                USERNAME
              </label>
              <div className="input-icon-wrapper">
                <HiUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`register-input-field ${errors.username ? 'error-input' : ''}`}
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && <span className="register-error-text">{errors.username}</span>}
            </div>
            
            <div className="register-input-container">
              <label className="register-input-label" htmlFor="email">
                EMAIL
              </label>
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`register-input-field ${errors.email ? 'error-input' : ''}`}
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <span className="register-error-text">{errors.email}</span>}
            </div>
            
            <div className="register-input-container">
              <label className="register-input-label" htmlFor="password">
                PASSWORD
              </label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`register-input-field ${errors.password ? 'error-input' : ''}`}
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Create a password (min 6 characters)"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="register-error-text">{errors.password}</span>}
            </div>
            
            <div className="register-input-container">
              <label className="register-input-label" htmlFor="confirmPassword">
                CONFIRM PASSWORD
              </label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`register-input-field ${errors.confirmPassword ? 'error-input' : ''}`}
                  value={confirmPassword}
                  onChange={this.handleChange}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="register-error-text">{errors.confirmPassword}</span>}
            </div>
            
            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? <div className="register-loader"></div> : 'Register'}
            </button>
            
            <p className="register-auth-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterRoute