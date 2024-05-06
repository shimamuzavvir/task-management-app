import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Style/home.css'


const Home = ({ username }) => {
    const params = useParams();
    const { email, taskId } = params;

    return (
        <div>
            <div className='container' id='box-container'>
                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-body">
                        <h1 className="card-title text-center">Hello {username}!</h1>
                        <p className="card-text text-center">Welcome to Task Management Application</p>
                        <div className='d-flex justify-content-center'>
                            <Link to={`/createtask/${email}`}><button className='btn btn-primary mr-3'>Create Task</button></Link>
                            <Link to={`/getusertask/${email}`}><button className='btn btn-success mr-3'>View My Tasks</button></Link>
                            <Link to={`/updatetask/${email}/${taskId}`}><button className='btn btn-warning mr-3'>update My Tasks</button></Link>
                            <Link to={`/deletetask/${email}/${taskId}`}><button className='btn btn-danger mr-3'>Delete My Tasks</button></Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
