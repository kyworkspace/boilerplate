import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LandingPage from './compoenets/veiws/LandingPage/LandingPage';
import LoginPage from './compoenets/veiws/LoginPage/LoginPage';
import RegisterPage from './compoenets/veiws/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
