import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import NavBar from './Navbar'
import Register from './components/Register'
import Login from './components/Login'
import React, { useEffect, useState } from 'react';
import BigCalendar from './components/BigCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { url_events, globalRequestParameters, url_users } from './utils'

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const [check_account, setCheckAccount] = useState(0);

  useEffect(() => {
    if (check_account === 0) {
        setCheckAccount(1);
        if (performance.navigation.type === 1) {
            let token = localStorage.getItem('token');
      
            if(token) {
              let object = {};
              object.token = token;
      
              let requestParameters = { ...globalRequestParameters };
              requestParameters.method = "POST";
              requestParameters.body = JSON.stringify(object);
      
              fetch(url_events + "check", requestParameters)
              .then(res => res.json()
              .then(res => {
                if(res.message) {
                  alert(res.message);
                } else {
                  dispatch({ type: 'users/loggedIn', payload: true });
                  let email = {email: res.email};
                  requestParameters.body = JSON.stringify(email);
      
                  fetch(url_users + 'getAccount', requestParameters)
                  .then(res => res.json()
                  .then(res => {
                    if(res.found === 1) {
                        let thisUser = [];
                        thisUser.push(res.user);
                        dispatch({ type: "users/addUser", payload: thisUser });

                        let id = {id: thisUser[0].id};
                        requestParameters.body = JSON.stringify(id);

                        fetch(url_events + 'allEventsForUser', requestParameters)
                        .then(res => res.json()
                        .then(res => {
                            dispatch({ type: "events/setEvents", payload: res });
                        }))


                    } else {
                      console.log(res.msg);
                    }
                  }))
                }
              }))
            }
          }
    }
  });
  console.log(loggedIn);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={loggedIn ? BigCalendar : Home} />
          <Route exact path='/register' component={loggedIn ? BigCalendar : Register} />
          <Route exact path='/calendar' component={loggedIn ? BigCalendar : Home} />
          <Route exact path='/login' component={loggedIn ? BigCalendar :  Login}/>
          <Route path='*' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
