import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { FaUserCircle, FaEnvelope } from 'react-icons/fa'
import apiService from '../../services/api'
import './index.css'

class Profile extends Component {
  state = {
    profile: null,
    isLoading: true,
    error: false,
    userInitial: '',
    userName: '',
    userEmail: '',
  }

  componentDidMount() {
    this.fetchProfile()
    this.getUserInfo()
  }

  getUserInfo = () => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      const name = user.name || user.username
      const initial = name.charAt(0).toUpperCase()
      this.setState({ 
        userInitial: initial,
        userName: name,
        userEmail: user.email || '',
      })
    }
  }

  fetchProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    
    if (!jwtToken) {
      this.setState({ error: true, isLoading: false })
      return
    }
    
    this.setState({ isLoading: true, error: false })
    
    try {
      const data = await apiService.fetchProfile(jwtToken)
      
      if (data.profile_details) {
        const profileName = data.profile_details.name
        const profileEmail = data.profile_details.email
        
        if (profileName) {
          const initial = profileName.charAt(0).toUpperCase()
          this.setState({ 
            userInitial: initial,
            userName: profileName,
            userEmail: profileEmail || '',
          })
        }
        
        this.setState({
          profile: data.profile_details,
          error: false,
          isLoading: false,
        })
      }
    } catch (error) {
      this.getUserInfo()
      this.setState({ error: false, isLoading: false })
    }
  }

  renderLoader = () => (
    <div className="profile-loader-container">
      <TailSpin color="#6366f1" height={40} width={40} />
    </div>
  )

  renderError = () => (
    <div className="profile-error-container">
      <button 
        type="button" 
        onClick={this.fetchProfile} 
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const { userInitial, userName, userEmail } = this.state
    const displayName = userName || 'User'
    const displayEmail = userEmail || 'No email provided'
    
    return (
      <div className="profile-container">
        <div className="profile-avatar-wrapper">
          <div className="profile-initial-circle">
            {userInitial || <FaUserCircle />}
          </div>
          <div className="profile-online-dot"></div>
        </div>
        
        <h2 className="profile-name">{displayName}</h2>
        
        <div className="profile-email">
          <FaEnvelope className="email-icon" />
          <span>{displayEmail}</span>
        </div>
      </div>
    )
  }

  render() {
    const { isLoading, error } = this.state
    
    if (isLoading) {
      return this.renderLoader()
    }

    if (error) {
      return this.renderError()
    }
    
    return this.renderProfile()
  }
}

export default Profile