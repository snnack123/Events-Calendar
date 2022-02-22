import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import NavBar from './Navbar'
import Register from './components/Register'
import Login from './components/Login'
import React from 'react';
import BigCalendar from './components/BigCalendar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/calendar'>
            <BigCalendar />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
