import {Route, Switch, Redirect} from 'react-router-dom'
import JobRoute from './components/JobRoute'
import JobDetails from './components/JobDetails'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/jobs" component={JobRoute} />
      <Route exact path="/jobs/:id" component={JobDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
