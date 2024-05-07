import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Style/home.css'

const Home = ({ username }) => {
    const params = useParams();
    const { email, taskId } = params;

    return (
        <div className='box-container'>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Hello {username}!</h1>
                    <p className="card-text text-center">Welcome to Task Management Application</p>
                    <div className='home-btn-container'>
                        <Link to={`/createtask/${email}`}><button className='home-btn home-btn-primary mr-3'>Create Task</button></Link>
                        <Link to={`/getusertask/${email}`}><button className='home-btn home-btn-success mr-3'>View My Tasks</button></Link>
                        <Link to={`/updatetask/${email}/${taskId}`}><button className='home-btn home-btn-warning mr-3'>Update My Tasks</button></Link>
                        <Link to={`/deletetask/${email}/${taskId}`}><button className='home-btn home-btn-danger'>Delete My Tasks</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
