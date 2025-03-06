import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import NavBar from '../NavBar'
import './index.css'

const HomeRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        <h1>Find the Job that Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default HomeRoute
