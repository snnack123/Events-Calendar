import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home'
import NavBar from './Navbar'
import Register from './components/Register'
import Login from './components/Login'
import React from 'react';
import BigCalendar from './components/BigCalendar';

function App() {

  const loggedIn = useSelector((state) => state.users.loggedIn);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/calendar' /> : <Home />}
          </Route>
          <Route path='/register'>
            {loggedIn ? <Redirect to='/calendar' /> : <Register />}
          </Route>
          <Route path='/calendar'>
            {loggedIn ? <BigCalendar /> : <Redirect to='/' />}
          </Route>
          <Route path='/login'>
            {loggedIn ? <Redirect to='/calendar' /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
