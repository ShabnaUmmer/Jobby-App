import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const NavBar = ({history}) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav 
      className="nav-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <ul className="nav-menu">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-website-logo"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>
        </li>
        <div className="nav-items">
          <li>
            <div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
          </li>
          <li>
            <div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </div>
          </li>
        </div>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(99,102,241,0.5)", "0px 0px 20px rgba(99,102,241,0.8)", "0px 0px 0px rgba(99,102,241,0.5)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(NavBar)