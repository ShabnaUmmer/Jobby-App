import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import Profile from '../Profile'
import NavBar from '../NavBar'
import FailureView from '../FailureView'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {
    locationId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationId: 'CHENNAI',
    label: 'Chennai',
  },
  {
    locationId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationId: 'MUMBAI',
    label: 'Mumbai',
  },
]

class JobRoute extends Component {
  state = {
    jobsList: [],
    employmentFilters: [],
    salaryFilters: '',
    locationFilters: [],
    isLoading: false,
    error: false,
    search: '',
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    const {
      employmentFilters,
      salaryFilters,
      search,
      locationFilters,
    } = this.state
    this.setState({isLoading: true, error: false})

    let apiUrl = `https://apis.ccbp.in/jobs?search=${search}`
    apiUrl += `&employment_type=${employmentFilters.join(',')}`
    apiUrl += `&minimum_package=${salaryFilters}`
    apiUrl += `&location=${locationFilters.join(',')}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({jobsList: data.jobs, isLoading: false})
    } else {
      this.setState({error: true, isLoading: false})
    }
  }

  handleEmploymentFilterChange = event => {
    const {employmentFilters} = this.state
    const {value, checked} = event.target

    const updatedFilters = checked
      ? [...employmentFilters, value]
      : employmentFilters.filter(id => id !== value)

    this.setState({employmentFilters: updatedFilters}, this.fetchJobs)
  }

  handleSalaryFilterChange = event => {
    const {value} = event.target
    this.setState({salaryFilters: value}, this.fetchJobs)
  }

  handleLocationFilterChange = event => {
    const {locationFilters} = this.state
    const {value, checked} = event.target

    const updatedFilters = checked
      ? [...locationFilters, value]
      : locationFilters.filter(id => id !== value)

    this.setState({locationFilters: updatedFilters}, this.fetchJobs)
  }

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  searchSubmit = event => {
    event.preventDefault()
    this.fetchJobs()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <ul>
        {jobsList.map(job => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {isLoading, error} = this.state

    if (isLoading) {
      return this.renderLoader()
    }

    if (error) {
      return <FailureView onRetry={this.fetchJobs} />
    }

    return this.renderJobsList()
  }

  render() {
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <NavBar />
        <div className="jobs-container">
          <div className="sideBar">
            <Profile />
            <hr className="break" />
            <div className="filters">
              <h3>Type of Employment</h3>
              <ul className="filter-list">
                {employmentTypesList.map(({label, employmentTypeId}) => (
                  <li key={employmentTypeId}>
                    <label>
                      <input
                        type="checkbox"
                        value={employmentTypeId}
                        onChange={this.handleEmploymentFilterChange}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>

              <hr className="break" />

              <h3>Salary Range</h3>
              <ul className="filter-list">
                {salaryRangesList.map(({salaryRangeId, label}) => (
                  <li key={salaryRangeId}>
                    <label>
                      <input
                        type="radio"
                        name="salary"
                        value={salaryRangeId}
                        onChange={this.handleSalaryFilterChange}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>

              <hr className="break" />

              <h3>Locations</h3>
              <ul className="filter-list">
                {locationsList.map(({locationId, label}) => (
                  <li key={locationId}>
                    <label>
                      <input
                        type="checkbox"
                        value={locationId}
                        onChange={this.handleLocationFilterChange}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="break" />
            </div>
          </div>

          <div className="job-list">
            <div className="search-container">
              <input
                type="search"
                className="search"
                value={search}
                placeholder="search"
                onChange={this.onSearch}
              />

              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.searchSubmit}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-list">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobRoute
