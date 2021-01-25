import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LandingPage from './compoenets/veiws/LandingPage/LandingPage';
import LoginPage from './compoenets/veiws/LoginPage/LoginPage';
import RegisterPge from './compoenets/veiws/RegisterPage/RegisterPge';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPge}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
