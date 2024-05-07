import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Style/taskdetail.css'


const TaskDetails = () => {
    const { email } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://task-management-app-backend-e5c6.onrender.com/api/user/getusertask/${email}`);
                setTasks(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [email, searchTerm]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://task-management-app-backend-e5c6.onrender.com/api/user/search/${email}?keyword=${searchTerm}`);
            setTasks(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error searching tasks:', error);
        }
    };

    return (
        
        <div className="task-container">
            <h2>My Tasks</h2>
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
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <ul className="list-group">
                    {tasks.length === 0 ? (
                        <p>No tasks found.</p>
                    ) : (
                        tasks.map(task => (
                            <li key={task.taskId} className="list-group-item"> {/* Use taskId as key */}
                                <h5>{task.title}</h5>
                                <p>{task.description}</p>
                                <p>Deadline: {task.deadline}</p>
                                <p>Status: {task.status}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
        
    );
};


export default TaskDetails;
