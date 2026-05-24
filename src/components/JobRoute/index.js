import {Component} from 'react'
import Cookies from 'js-cookie'
import { TailSpin } from 'react-loader-spinner'
import { BsSearch, BsFilter, BsSortUp } from 'react-icons/bs'
import { MdLocationOn, MdWork, MdAttachMoney } from 'react-icons/md'
import JobCard from '../JobCard'
import Profile from '../Profile'
import NavBar from '../NavBar'
import FailureView from '../FailureView'
import apiService from '../../services/api'
import './index.css'

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
]

const salaryRangesList = [
  { salaryRangeId: '500000', label: '5 LPA and above' },
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '1500000', label: '15 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'salary_high', label: 'Salary: High to Low' },
  { value: 'salary_low', label: 'Salary: Low to High' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'recent', label: 'Most Recent' },
]

const experienceRanges = [
  { value: '0', label: 'Fresher (0-1 years)' },
  { value: '1', label: '1-3 years' },
  { value: '3', label: '3-5 years' },
  { value: '5', label: '5-8 years' },
  { value: '8', label: '8+ years' },
]

class JobRoute extends Component {
  state = {
    jobsList: [],
    employmentFilters: [],
    salaryFilters: '',
    locationSearch: '',
    sortBy: 'relevance',
    minExperience: '',
    maxExperience: '',
    isLoading: true,
    error: false,
    search: '',
    showFilters: false,
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    const { 
      employmentFilters, 
      salaryFilters, 
      locationSearch, 
      search, 
      sortBy,
      minExperience,
      maxExperience 
    } = this.state
    
    this.setState({ isLoading: true, error: false })

    const params = {
      search,
      employment_type: employmentFilters,
      minimum_package: salaryFilters,
      location: locationSearch,
      sort_by: sortBy,
      min_experience: minExperience,
      max_experience: maxExperience
    }

    const jwtToken = Cookies.get('jwt_token')
    
    if (!jwtToken) {
      this.setState({ error: true, isLoading: false })
      return
    }

    try {
      const data = await apiService.fetchJobs(params)
      this.setState({ jobsList: data.jobs || [], isLoading: false, error: false })
    } catch (error) {
      console.error('Fetch jobs error:', error)
      this.setState({ error: true, isLoading: false })
    }
  }

  handleEmploymentFilterChange = event => {
    const { employmentFilters } = this.state
    const { value, checked } = event.target

    const updatedFilters = checked
      ? [...employmentFilters, value]
      : employmentFilters.filter(id => id !== value)

    this.setState({ employmentFilters: updatedFilters }, this.fetchJobs)
  }

  handleSalaryFilterChange = event => {
    const { value } = event.target
    this.setState({ salaryFilters: value }, this.fetchJobs)
  }

  handleLocationSearchChange = event => {
    this.setState({ locationSearch: event.target.value })
  }

  handleSortChange = event => {
    this.setState({ sortBy: event.target.value }, this.fetchJobs)
  }

  handleExperienceChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value }, this.fetchJobs)
  }

  onSearch = event => {
    this.setState({ search: event.target.value })
  }

  searchSubmit = event => {
    event.preventDefault()
    this.fetchJobs()
  }

  applyLocationSearch = () => {
    this.fetchJobs()
  }

  toggleFilters = () => {
    this.setState(prev => ({ showFilters: !prev.showFilters }))
  }

  clearFilters = () => {
    this.setState({
      employmentFilters: [],
      salaryFilters: '',
      locationSearch: '',
      sortBy: 'relevance',
      minExperience: '',
      maxExperience: '',
      search: '',
    }, this.fetchJobs)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <TailSpin color="#6366f1" height={50} width={50} />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs matching your criteria. Try adjusting your filters.</p>
      <button className="clear-filters-btn" onClick={this.clearFilters}>
        Clear All Filters
      </button>
    </div>
  )

  renderJobsList = () => {
    const { jobsList } = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <ul className="jobs-list-ul">
        {jobsList.map((job) => (
          <li key={job.id} className="job-card-wrapper">
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const { isLoading, error } = this.state

    if (isLoading) {
      return this.renderLoader()
    }

    if (error) {
      return <FailureView onRetry={this.fetchJobs} />
    }

    return this.renderJobsList()
  }

  render() {
    const { 
      search, 
      locationSearch, 
      sortBy, 
      minExperience, 
      showFilters,
      employmentFilters,
      salaryFilters,
      jobsList
    } = this.state

    const hasActiveFilters = employmentFilters.length > 0 || salaryFilters || locationSearch || minExperience || sortBy !== 'relevance'

    return (
      <div className="jobs-page">
        <NavBar />
        <div className="jobs-container">
          {/* Sidebar Filters */}
          <div className={`sideBar ${showFilters ? 'mobile-open' : ''}`}>
            <Profile />
            <hr className="break" />
            
            <div className="filters-header">
              <h3>Filters</h3>
              {hasActiveFilters && (
                <button className="clear-filters-link" onClick={this.clearFilters}>
                  Clear all
                </button>
              )}
            </div>
            
            <div className="filters">
              {/* Location Search */}
              <div className="filter-group">
                <h4>
                  <MdLocationOn className="filter-icon" />
                  Location
                </h4>
                <div className="location-search">
                  <input
                    type="text"
                    className="location-input"
                    value={locationSearch}
                    onChange={this.handleLocationSearchChange}
                    placeholder="City, country or region..."
                    onKeyPress={(e) => e.key === 'Enter' && this.applyLocationSearch()}
                  />
                  <button onClick={this.applyLocationSearch} className="location-apply-btn">
                    Apply
                  </button>
                </div>
              </div>

              <hr className="break-small" />

              {/* Employment Type */}
              <div className="filter-group">
                <h4>
                  <MdWork className="filter-icon" />
                  Employment Type
                </h4>
                <ul className="filter-list">
                  {employmentTypesList.map(({ label, employmentTypeId }) => (
                    <li key={employmentTypeId}>
                      <label className="filter-label">
                        <input
                          type="checkbox"
                          value={employmentTypeId}
                          checked={employmentFilters.includes(employmentTypeId)}
                          onChange={this.handleEmploymentFilterChange}
                        />
                        {label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="break-small" />

              {/* Salary Range */}
              <div className="filter-group">
                <h4>
                  <MdAttachMoney className="filter-icon" />
                  Salary Range
                </h4>
                <ul className="filter-list">
                  {salaryRangesList.map(({ salaryRangeId, label }) => (
                    <li key={salaryRangeId}>
                      <label className="filter-label">
                        <input
                          type="radio"
                          name="salary"
                          value={salaryRangeId}
                          checked={salaryFilters === salaryRangeId}
                          onChange={this.handleSalaryFilterChange}
                        />
                        {label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="break-small" />

              {/* Experience Range */}
              <div className="filter-group">
                <h4>Experience</h4>
                <select 
                  className="experience-select"
                  name="minExperience"
                  value={minExperience}
                  onChange={this.handleExperienceChange}
                >
                  <option value="">Select Experience</option>
                  {experienceRanges.map(exp => (
                    <option key={exp.value} value={exp.value}>{exp.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="job-list">
            {/* Search and Sort Bar */}
            <div className="search-section">
              <form onSubmit={this.searchSubmit} className="search-container">
                <input
                  type="search"
                  className="search"
                  value={search}
                  placeholder="Search by job title, company, skills..."
                  onChange={this.onSearch}
                />
                <button type="submit" className="search-button">
                  <BsSearch className="search-icon" />
                </button>
              </form>
              
              {/* Sort Dropdown */}
              <div className="sort-container">
                <BsSortUp className="sort-icon" />
                <select value={sortBy} onChange={this.handleSortChange} className="sort-select">
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Mobile Filter Toggle */}
              <button className="mobile-filter-toggle" onClick={this.toggleFilters}>
                <BsFilter /> Filters
              </button>
            </div>
            
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span>Active filters:</span>
                {employmentFilters.map(filter => {
                  const filterLabel = employmentTypesList.find(t => t.employmentTypeId === filter)?.label || filter;
                  return (
                    <span key={filter} className="filter-tag">
                      {filterLabel}
                      <button onClick={() => {
                        this.setState({
                          employmentFilters: employmentFilters.filter(f => f !== filter)
                        }, this.fetchJobs)
                      }}>×</button>
                    </span>
                  );
                })}
                {salaryFilters && (
                  <span className="filter-tag">
                    {salaryRangesList.find(s => s.salaryRangeId === salaryFilters)?.label}
                    <button onClick={() => this.setState({ salaryFilters: '' }, this.fetchJobs)}>×</button>
                  </span>
                )}
                {locationSearch && (
                  <span className="filter-tag">
                    📍 {locationSearch}
                    <button onClick={() => this.setState({ locationSearch: '' }, this.fetchJobs)}>×</button>
                  </span>
                )}
                {minExperience && (
                  <span className="filter-tag">
                    {experienceRanges.find(e => e.value === minExperience)?.label}
                    <button onClick={() => this.setState({ minExperience: '' }, this.fetchJobs)}>×</button>
                  </span>
                )}
                {sortBy !== 'relevance' && (
                  <span className="filter-tag">
                    Sort: {sortOptions.find(s => s.value === sortBy)?.label}
                    <button onClick={() => this.setState({ sortBy: 'relevance' }, this.fetchJobs)}>×</button>
                  </span>
                )}
              </div>
            )}
            
            {/* Results Count */}
            <div className="results-count">
              Found {jobsList.length} job{jobsList.length !== 1 ? 's' : ''}
            </div>
            
            {/* Jobs List */}
            <div className="jobs-list">{this.renderContent()}</div>
          </div>
        </div>
        
        {/* Mobile Filters Drawer */}
        {showFilters && (
          <div className="mobile-filters-drawer" onClick={this.toggleFilters}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <h3>All Filters</h3>
                <button onClick={this.toggleFilters}>✕</button>
              </div>
              <div className="drawer-body">
                <Profile />
                <hr className="break" />
                <div className="filters">
                  <div className="filter-group">
                    <h4>
                      <MdLocationOn className="filter-icon" />
                      Location
                    </h4>
                    <div className="location-search">
                      <input
                        type="text"
                        className="location-input"
                        value={locationSearch}
                        onChange={this.handleLocationSearchChange}
                        placeholder="City, country or region..."
                      />
                      <button onClick={() => {
                        this.applyLocationSearch();
                        this.toggleFilters();
                      }} className="location-apply-btn">
                        Apply
                      </button>
                    </div>
                  </div>

                  <hr className="break-small" />

                  <div className="filter-group">
                    <h4>
                      <MdWork className="filter-icon" />
                      Employment Type
                    </h4>
                    <ul className="filter-list">
                      {employmentTypesList.map(({ label, employmentTypeId }) => (
                        <li key={employmentTypeId}>
                          <label className="filter-label">
                            <input
                              type="checkbox"
                              value={employmentTypeId}
                              checked={employmentFilters.includes(employmentTypeId)}
                              onChange={this.handleEmploymentFilterChange}
                            />
                            {label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="break-small" />

                  <div className="filter-group">
                    <h4>
                      <MdAttachMoney className="filter-icon" />
                      Salary Range
                    </h4>
                    <ul className="filter-list">
                      {salaryRangesList.map(({ salaryRangeId, label }) => (
                        <li key={salaryRangeId}>
                          <label className="filter-label">
                            <input
                              type="radio"
                              name="salary-mobile"
                              value={salaryRangeId}
                              checked={salaryFilters === salaryRangeId}
                              onChange={this.handleSalaryFilterChange}
                            />
                            {label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="break-small" />

                  <div className="filter-group">
                    <h4>Experience</h4>
                    <select 
                      className="experience-select"
                      name="minExperience"
                      value={minExperience}
                      onChange={this.handleExperienceChange}
                    >
                      <option value="">Select Experience</option>
                      {experienceRanges.map(exp => (
                        <option key={exp.value} value={exp.value}>{exp.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="apply-filters-btn" onClick={this.toggleFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default JobRoute