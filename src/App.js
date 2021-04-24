import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Toolbar from './components/Toolbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TodosPage from './pages/TodosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import s from './App.module.css';

function App() {
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

            <Route path="/todos">
              <TodosPage />
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

export default App;
