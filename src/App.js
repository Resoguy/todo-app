import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Toolbar from './components/Toolbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TodosPage from './pages/TodosPage';
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
