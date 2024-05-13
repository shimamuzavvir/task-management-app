import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/delete.css'

const DeleteTask = ({ email }) => {
    const [tasks, setTasks] = useState([]);
   // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://task-management-app-backend-e5c6.onrender.com/api/user/getusertask/${email}`);
                setTasks(response.data.data);
                //setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
               // setLoading(false);
            }
        };

        fetchTasks();
    }, [email]);

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://task-management-app-backend-e5c6.onrender.com/api/user/deletetask/${email}/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
           
                <div className="delete-container">
            <h2>User Tasks</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.deadline}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default DeleteTask;
