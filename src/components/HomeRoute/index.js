import {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

class HomeRoute extends Component {
  render() {
    return (
      <div className="home-container">
        <NavBar />
        
        <div className="animated-bg">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
        
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-title">
              Find Your
              <span className="gradient-text"> Dream Job</span>
            </h1>
            
            <p className="home-description">
              Discover thousands of job opportunities with top companies. 
              Find the perfect role that matches your skills and career goals.
            </p>
            
            <Link to="/jobs">
              <button className="home-button">
                Find Jobs
                <span className="button-arrow">→</span>
              </button>
            </Link>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Job Openings</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeRoute