import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { init } from '@emailjs/browser';
init("user_HyEzrOhNEBkhLc9eyisaW");

const NavBar = () => {
    const isLoggedIn = useSelector((state) => state.users.loggedIn);
    const savedEvents = useSelector((state) => state.events.savedEvents);
    const history = useHistory();

    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: 'users/loggedIn', payload: false });
        if (savedEvents) {
            dispatch({ type: 'events/clearAll' });
            dispatch({ type: 'users/clearAll' });
        }
        localStorage.removeItem('token');
        history.push('/login');
    }

    const goHome = () => {
        history.push('/');
    }

    return (
        <div className="navbar">
            <div>
                <p onClick={goHome} className="brand">Events Calendar</p>
            </div>
            <div className="divLinks">
                {isLoggedIn === false && <Link to='/login' className="links" style={{ marginRight: "20px" }}>Log in</Link>}
                {isLoggedIn && <Link to='#' className="links" style={{ marginRight: "20px" }}>My profile</Link>}

                {isLoggedIn === false && <Link to='/register' className="links" style={{ marginRight: "20px" }}>Register</Link>}
                {isLoggedIn && <Link to='#' className="links" style={{ marginRight: "20px" }} onClick={logout}>Log out</Link>}
            </div>
        </div>
    );
}

export default NavBar;