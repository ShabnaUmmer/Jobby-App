import {Link} from 'react-router-dom'
import {FiStar} from 'react-icons/fi'
import {BsBriefcase} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

/* eslint-disable camelcase */

const JobCard = ({job}) => {
  const {
    id,
    company_logo_url,
    title,
    rating,
    location,
    employment_type,
    package_per_annum,
    job_description,
  } = job
  return (
    <div className="jobcard">
      <Link to={`/jobs/${id}`}>
        <div className="logo-container">
          <img
            src={company_logo_url}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h3>{title}</h3>
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
          <h3>Description</h3>
          <p>{job_description}</p>
        </div>
      </Link>
    </div>
  )
}
export default JobCard
