import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/nav.css'

const NavBar = () => {
    const [showAdminButton, setShowAdminButton] = useState(true);
    const navigate = useNavigate();

    const handleView = () => {
        navigate('/tasks');
        setShowAdminButton(false);
    };

    const handleLogout = () =>{
        // Clear LocalStorage items related to authentication
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        navigate('/login')
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">TASK MANAGEMENT APP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {showAdminButton && <li className="nav-item">
                            <button className="btn btn-outline-primary mx-2" onClick={handleView}>All Users' Tasks</button>
                        </li>}
                    </ul>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
