import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Toolbar from './components/Toolbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TodosPage from './pages/TodosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { connect } from 'react-redux';
import {setJwt, setUser} from './store/actions';
import s from './App.module.css';
import React from 'react';
import UserDetailsPage from './pages/UserDetailsPage';

const meApi = 'http://localhost:1337/users/me';


const PrivateRoute = ({path, children, ...props}) => {
  const jwt = window.localStorage.getItem('jwt');

  return (
    <Route path={path} {...props}>
      {
        jwt ?
        children :
        <Redirect to={{pathname: '/login'}} />
      }
    </Route>
  )
}


class App extends React.Component {
  componentDidMount() {
    this.tryLogin();
  }

  tryLogin = async () => {
    const jwt = window.localStorage.getItem('jwt');
    
    if (jwt) {
      const response = await fetch(meApi, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
      const data = await response.json();
      
      console.log(data);
      this.props.dispatch(setJwt(jwt));
      this.props.dispatch(setUser(data));
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Toolbar />
          
          <div className="container">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
  
              <Route path="/about">
                <AboutPage />
              </Route>
  
              <PrivateRoute path="/todos">
                <TodosPage />
              </PrivateRoute>

              <Route path="/users/:id">
                <UserDetailsPage />
              </Route>
  
              <Route path="/login">
                <LoginPage />
              </Route>
  
              <Route path="/register">
                <RegisterPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null)(App);
