import {FiStar} from 'react-icons/fi'

import {BsBriefcase} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import NavBar from '../NavBar'
import FailureView from '../FailureView'

import './index.css'

/* eslint-disable camelcase */

class JobDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: [],
    isLoading: true,
    error: false,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
        isLoading: false,
      })
    } else {
      this.setState({error: true, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height={50} width={50} />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    if (!jobDetails) {
      return <p>Job details not available.</p>
    }
    const {
      company_logo_url,
      company_website_url,
      job_description,
      location,
      employment_type,
      title,
      rating,
      package_per_annum,
      skills,
      life_at_company,
    } = jobDetails

    return (
      <div>
        <div className="job-details">
          <div className="logo-container">
            <img
              src={company_logo_url}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h2>{title}</h2>
              <div>
                <p>
                  <FiStar color="#fbbf24" fill="#fbbf24" /> {rating}
                </p>
              </div>
            </div>
          </div>
          <div className="above-break">
            <div className="location">
              <p className="indictions">
                <MdLocationOn />
                {location}
              </p>
              <p className="indictions">
                <BsBriefcase color="#121212" fill="#f1f5f9" />
                {employment_type}
              </p>
            </div>
            <p>{package_per_annum}</p>
          </div>
          <hr className="break" />
          <div>
            <div className="description-link">
              <h2>Description</h2>
              <a
                href={company_website_url}
                target="_blank"
                style={{color: '#1165ed', textDecoration: 'none'}}
                rel="noreferrer"
              >
                Visit
              </a>
            </div>
            <p>{job_description}</p>
          </div>
          <div className="skills-section">
            <h3>Skills</h3>
            <ul className="skillset">
              {skills.map(skill => (
                <li key={skill.name} className="skill">
                  <img
                    src={skill.image_url}
                    className="skill-image"
                    alt={skill.name}
                  />
                  <p>{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Life at Company</h3>
            <div className="life-at-company-section">
              <p>{life_at_company.description}</p>
              <img src={life_at_company.image_url} alt="life at company" />
            </div>
          </div>
        </div>
        <h2 style={{paddingLeft: '40px'}}>Similar Jobs</h2>
        <div>
          <div className="similar-jobs-section">
            <ul className="similar-jobs">
              {similarJobs.map(job => (
                <li key={job.id} className="job-details">
                  <div className="logo-container">
                    <img
                      src={job.company_logo_url}
                      alt="similar job company logo"
                      className="company-logo"
                    />
                    <div>
                      <h2>{job.title}</h2>
                      <div>
                        <p>
                          <FiStar color="#fbbf24" fill="#fbbf24" /> {job.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3>Description</h3>
                    <p>{job.job_description}</p>
                  </div>
                  <div className="above-break">
                    <div className="location">
                      <p className="indictions">
                        <MdLocationOn />
                        {job.location}
                      </p>
                      <p className="indictions">
                        <BsBriefcase color="#121212" fill="#f1f5f9" />
                        {job.employment_type}
                      </p>
                    </div>
                    <p>{job.package_per_annum}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderContent = () => {
    const {isLoading, error} = this.state

    if (isLoading) {
      return this.renderLoader()
    }

    if (error) {
      return <FailureView onRetry={this.fetchJobDetails} />
    }

    return this.renderJobDetails()
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="job-details-container">
        <NavBar />
        <div className="job-details-route">{this.renderContent()}</div>
      </div>
    )
  }
}
export default withRouter(JobDetails)
