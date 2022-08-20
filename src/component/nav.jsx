import React from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";


export default function Nav() {
    const navigate = useNavigate();
    // for login out clear all the tokens in local storage
    const logout = ()=>{
        localStorage.clear()
        // redirect to login page after clear all the tokens in local storage
        navigate('/login')
    }


    const location = useLocation()
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Love singh kalbhor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about" >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} to="/home">Home</Link>
                        </li>


                    </ul>
                    <div >
                       {!localStorage.token ?  <Link to="/login" className="btn btn-primary btn-block ms-3">Login</Link>:
                      <button onClick={logout} className="btn btn-primary btn-block ms-3">Logout</button>}

                        <Link to="/signup" className="btn btn-primary btn-block ms-3">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
