import {Link} from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs'
import { MdLocationOn, MdWork } from 'react-icons/md'
import './index.css'

const JobCard = ({ job }) => {
  const {
    id,
    title,
    company_name,
    company_logo_url,
    rating,
    employment_type,
    location,
    package_per_annum,
    experience_required,
    job_description,
  } = job

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
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="job-card-header">
          <img 
            src={company_logo_url} 
            alt={company_name} 
            className="job-card-logo"
            onError={(e) => {
              e.target.src = `https://img.icons8.com/color/240/${company_name.toLowerCase()}.png`;
              e.target.onerror = () => {
                e.target.src = "https://img.icons8.com/color/240/company.png";
              };
            }}
          />
          <div className="job-card-title">
            <h3>{title}</h3>
            <p className="company-name">{company_name}</p>
            <div className="job-card-rating">
              <FiStar className="star-icon" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        
        <div className="job-card-details">
          <div className="job-card-info">
            <div className="info-item">
              <MdLocationOn />
              <span>{location}</span>
            </div>
            <div className="info-item">
              <MdWork />
              <span>{getEmploymentTypeLabel()}</span>
            </div>
            <div className="info-item">
              <BsClock />
              <span>{experience_required}</span>
            </div>
          </div>
          <p className="job-card-salary">{package_per_annum}</p>
        </div>
        
        <hr className="job-card-divider" />
        
        <div className="job-card-description">
          <h4>Description</h4>
          <p>{job_description?.substring(0, 150)}...</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard