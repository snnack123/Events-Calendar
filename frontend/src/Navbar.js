import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { init } from '@emailjs/browser';
init("user_HyEzrOhNEBkhLc9eyisaW");

const NavBar = () => {
    const isLoggedIn = useSelector((state) => state.users.loggedIn);
    const history = useHistory();

    const goHome = () => {
        history.push('/');
    }

    return (
        <div className="navbar">
            <div>
                <p onClick={goHome} className="brand">Events Calendar</p>
            </div>
            <div className="divLinks">
                {isLoggedIn === false && <Link to='/login' className="links" style={{ marginRight: "20px" }}>Autentificare</Link>}
                {isLoggedIn && <Link to='#' className="links" style={{ marginRight: "20px" }}>Postarile mele</Link>}

                {isLoggedIn === false && <Link to='/register' className="links" style={{ marginRight: "20px" }}>Inregistrare</Link>}
                {isLoggedIn && <Link to='#' className="links" style={{ marginRight: "20px" }}>Profilul meu</Link>}
            </div>
        </div>
    );
}

export default NavBar;