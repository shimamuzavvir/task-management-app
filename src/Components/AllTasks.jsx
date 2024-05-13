import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { ToastContainer, toast } from 'react-toastify';
import './Style/taskdetail.css'

import { useParams } from 'react-router-dom';

const AllTasks = ({ token }) => {
    const [usersWithTasks, setUsersWithTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const { email } = useParams(); // Extract email from URL

   // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const response = await axios.get(`https://task-management-app-backend-e5c6.onrender.com/api/user/tasks/${email}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setUsersWithTasks(response.data.data);
               // setLoading(false);
              //  toast.success('You are authorized to view all tasks.');
            } catch (error) {
                console.error('Error fetching all tasks:', error);
               // setLoading(false);
                setError('Unauthorized! You are not authorized to view all tasks.');
              //  toast.error('Unauthorized! You are not authorized to view all tasks.');
            }
        };

        fetchAllTasks();
    }, [token]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://task-management-app-backend-e5c6.onrender.com/api/user/search/${email}?keyword=${searchTerm}`);
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error searching tasks:', error);
        }
    };

    return (
        <div className="task-container">
            <h2>All Users and Their Tasks</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search tasks by title or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
            
            {error ? (
                <p>{error}</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                         tasks.map(task => (
                            <tr key={task.taskId}>
                                <td>{task.user && `${task.user.firstname} ${task.user.lastname}`}</td>
                                <td>
                                    <strong>{task.title}</strong>
                                    <p>Description: {task.description}</p>
                                    <p>Deadline: {task.deadline}</p>
                                    <p>Status: {task.status}</p>
                                </td>
                            </tr>
                        )
                        )
                        ) : (
                            usersWithTasks.map(user => (
                                <tr key={user._id}>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>
                                        <ul>
                                            {user.tasks.map(task => (
                                                <li key={task._id}>
                                                    <strong>{task.title}</strong>
                                                    <p>Description: {task.description}</p>
                                                    <p>Deadline: {task.deadline}</p>
                                                    <p>Status: {task.status}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        

        </div>
    );
};

export default AllTasks;
