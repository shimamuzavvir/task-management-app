import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const NavBar = () => {
    const [showAdminButton, setShowAdminButton] = useState(true);
    const navigate = useNavigate();
    const{email} = useParams()

    const handleView = () => {
        navigate(`/tasks/${email}`);
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/home/${email}" className="navbar-brand">TASK MANAGEMENT APP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        {showAdminButton && <li className="nav-item">
                            <button className="btn btn-outline-primary mx-2" style={{ width: "auto" }} onClick={handleView}>All Users' Tasks</button>
                        </li>}
                    </ul>
                    <button className='btn text-center logout-button' style={{ backgroundColor: "rgb(237, 57, 57)" }} onClick={handleLogout}><i className="fa-solid fa-power-off"></i></button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
