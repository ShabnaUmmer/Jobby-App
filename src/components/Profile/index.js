import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Profile extends Component {
  state = {
    profile: null,
    isLoading: true,
    error: false,
  }
  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isLoading: true, error: false})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profile: data.profile_details,
        error: false,
        isLoading: false,
      })
    } else {
      this.setState({error: true, isLoading: false})
    }
  }
  renderLoader = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    )
  }
  render() {
    const {profile, isLoading, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    if (isLoading) {
      return <div>{this.renderLoader()}</div>
    }

    if (error) {
      return (
        <div>
          <button onClick={this.fetchProfile}>Retry</button>
        </div>
      )
    }
    return (
      <div className="profile-container">
        <img src={profile.profile_image_url} alt="profile" width={100} />
        <h2>{profile.name}</h2>
        <p>{profile.short_bio}</p>
      </div>
    )
  }
}
export default Profile
