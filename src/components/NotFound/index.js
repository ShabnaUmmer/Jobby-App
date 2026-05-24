import { Link } from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div 
    className="not-found-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button
        className="go-home-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back Home
      </button>
    </Link>
  </div>
)

export default NotFound