import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import { TailSpin } from 'react-loader-spinner'
import { FiStar } from 'react-icons/fi'
import { BsBriefcase } from 'react-icons/bs'
import { MdLocationOn, MdAccessTime, MdWork, MdCheckCircle, MdBusiness, MdLink, MdSend } from 'react-icons/md'
import { FaRegCalendarAlt, FaBriefcase } from 'react-icons/fa'
import NavBar from '../NavBar'
import FailureView from '../FailureView'
import apiService from '../../services/api'
import './index.css'

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
    const { match } = this.props
    const { id } = match.params
    const jwtToken = Cookies.get('jwt_token')
    
    if (!jwtToken) {
      this.setState({ error: true, isLoading: false })
      return
    }
    
    try {
      const data = await apiService.fetchJobById(id)
      
      this.setState({
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs || [],
        isLoading: false,
      })
    } catch (error) {
      this.setState({ error: true, isLoading: false })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <TailSpin color="#6366f1" height={50} width={50} />
    </div>
  )

  renderJobDetails = () => {
    const { jobDetails, similarJobs } = this.state

    if (!jobDetails) {
      return null
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
      experience_required,
      requirements,
      date_posted,
      deadline,
      company_name
    } = jobDetails

    const getEmploymentTypeLabel = () => {
      switch(employment_type) {
        case 'FULLTIME': return 'Full Time';
        case 'PARTTIME': return 'Part Time';
        case 'FREELANCE': return 'Freelance';
        case 'INTERNSHIP': return 'Internship';
        default: return employment_type;
      }
    }

    return (
      <div className="job-details-wrapper">
        <div className="job-details-card">
          <div className="job-details-header">
            <img 
              src={company_logo_url} 
              alt="company logo" 
              className="job-details-logo"
              onError={(e) => {
                e.target.src = `https://img.icons8.com/color/240/${company_name?.toLowerCase()}.png`;
                e.target.onerror = () => {
                  e.target.src = "https://img.icons8.com/color/240/company.png";
                };
              }}
            />
            <div>
              <h2>{title}</h2>
              <p className="company-name">{company_name}</p>
              <div className="job-details-rating">
                <FiStar className="star-icon" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          
          <div className="job-details-meta">
            <div className="meta-left">
              <span><MdLocationOn /> {location}</span>
              <span><BsBriefcase /> {getEmploymentTypeLabel()}</span>
              <span><FaRegCalendarAlt /> {date_posted}</span>
              <span><MdAccessTime /> Deadline: {deadline}</span>
            </div>
            <p className="meta-salary">{package_per_annum}</p>
          </div>
          
          <div className="experience-badge">
            <MdWork className="experience-icon" />
            Experience Required: {experience_required}
          </div>
          
          <hr className="divider" />
          
          <div className="job-details-description">
            <div className="description-header">
              <h3>Description</h3>
              <a href={company_website_url} target="_blank" rel="noreferrer" className="visit-link">
                <MdBusiness className="link-icon" />
                Visit Company Website
                <MdLink className="external-icon" />
              </a>
            </div>
            <p>{job_description}</p>
          </div>
          
          {requirements && requirements.length > 0 && (
            <div className="requirements-section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {requirements.map((req, index) => (
                  <li key={index}>
                    <MdCheckCircle className="check-icon" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="skills-section">
            <h3>Skills Required</h3>
            <ul className="skills-list">
              {skills && skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img src={skill.image_url} alt={skill.name} />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {life_at_company && (
            <div className="life-at-company">
              <h3>Life at Company</h3>
              <div className="life-content">
                <p>{life_at_company.description}</p>
                <img src={life_at_company.image_url} alt="life at company" />
              </div>
            </div>
          )}
          
          <div className="apply-section">
            <button 
              className="apply-button"
              onClick={() => window.open(company_website_url, '_blank')}
            >
              <MdSend className="apply-icon" />
              Apply Now
            </button>
          </div>
        </div>
        
        {similarJobs.length > 0 && (
          <>
            <h2 className="similar-jobs-title">
              <FaBriefcase className="title-icon" />
              Similar Jobs
            </h2>
            <div className="similar-jobs-container">
              {similarJobs.map(job => (
                <div 
                  key={job.id} 
                  className="similar-job-card"
                  onClick={() => {
                    const { history } = this.props
                    history.push(`/jobs/${job.id}`)
                  }}
                >
                  <img 
                    src={job.company_logo_url} 
                    alt={job.title} 
                    className="similar-job-logo"
                    onError={(e) => {
                      e.target.src = `https://img.icons8.com/color/240/${job.company_name?.toLowerCase()}.png`;
                    }}
                  />
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company_name}</p>
                  <div className="similar-job-rating">
                    <FiStar className="star-icon" />
                    <span>{job.rating}</span>
                  </div>
                  <p className="similar-job-description">{job.job_description?.substring(0, 100)}...</p>
                  <div className="similar-job-meta">
                    <span><MdLocationOn /> {job.location}</span>
                    <span><BsBriefcase /> {
                      job.employment_type === 'FULLTIME' ? 'Full Time' :
                      job.employment_type === 'PARTTIME' ? 'Part Time' :
                      job.employment_type === 'FREELANCE' ? 'Freelance' : 'Internship'
                    }</span>
                  </div>
                  <p className="similar-job-salary">{job.package_per_annum}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  renderContent = () => {
    const { isLoading, error } = this.state

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
      <div className="job-details-page">
        <NavBar />
        <div className="job-details-content">
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default JobDetails