import { useState } from "react";
import { url_users, url_events, globalRequestParameters } from "../utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [thisUser, setThisUser] = useState([]);

  const setLogIn = () => {
    dispatch({ type: "users/loggedIn", payload: true });
  };

  const addUser = () => {
    dispatch({ type: "users/addUser", payload: thisUser });
  };

  const setActivated = () => {
    dispatch({ type: "users/setActivated", payload: 1 });
  };

  const login = (e) => {
    e.preventDefault();

    let data = { email, password };
    let requestParameters = { ...globalRequestParameters };
    requestParameters.method = "POST";
    requestParameters.body = JSON.stringify(data);

    fetch(url_users + "login", requestParameters).then((res) =>
      res.json().then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          document.getElementById("error").innerHTML = "Te-ai autentificat cu succes!";
          document.getElementById("error").style.color = "green";
          thisUser.push(res.user);
          setLogIn();
          addUser();

          let userId = { id: res.user.id }

          let requestParameters = { ...globalRequestParameters };
          requestParameters.method = "POST";
          requestParameters.body = JSON.stringify(userId);
          fetch(url_events + "allEventsForUser", requestParameters)
            .then((res) => res.json()
              .then(res => {
                dispatch({ type: "events/setEvents", payload: res });
              }))

          history.push("/calendar");
        } else if (res.msg === "Trebuie sa activezi contul!") {
          document.getElementById("hideEmailPass").style.display = "none";
          document.getElementById("showCheckCode").style.display = "block";
        } else {
          document.getElementById("error").innerHTML = res.msg;
          document.getElementById("error").style.color = "tomato";
        }
      })
    );
  };

  function checkMyCode(e) {
    e.preventDefault();
    if (checkCode === thisUser.activation_code) {
      let activate = { email: thisUser.email };

      let requestParameters = { ...globalRequestParameters };
      requestParameters.method = "PUT";
      requestParameters.body = JSON.stringify(activate);

      fetch(url_users + "activeAccount/" + thisUser.id, requestParameters).then(
        (res) =>
          res.json().then((res) => {
            if (res.token) {
              localStorage.setItem("token", res.token);
              setLogIn();
              setActivated();
              history.push("/calendar");
            } else {
              console.log(res);
            }
          })
      );
    } else {
      document.getElementById("error_activate").innerHTML =
        "Codul de activare este gresit!";
      document.getElementById("error_activate").style.color = "tomato";
    }
  }

  return (
    <div className="create">
      <h1>User login page</h1>
      <div id="hideEmailPass">
        <form onSubmit={login}>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="btnAuth">Login</button>
          <p id="error"></p>
        </form>
      </div>
      <div id="showCheckCode" style={{ display: "none" }}>
        <form onSubmit={checkMyCode}>
          <div>
            <label>Verification code received by email:</label>
            <input
              type="text"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
            />
          </div>
          <button id="btnActivate">Account activation</button>
          <p id="error_activate"></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
