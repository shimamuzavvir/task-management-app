import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style/update.css'

const UpdateTask = () => {
    const { email } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, [email]);

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

    const handleUpdateTask = async (taskId, newData) => {
        try {
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, ...newData };
                }
                return task;
            });
            setTasks(updatedTasks);
            await axios.put(`https://task-management-app-backend-e5c6.onrender.com/api/user/updatetask/${email}/${taskId}`, newData);
            toast.success('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task. Please try again.');
            fetchTasks();
        }
    };

    return (
        <div className="update-container">
            <h2>Update Tasks</h2>
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <ul className="list-group">
                    {tasks.map(task => (
                        <li key={task._id} className="list-group-item">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                            <p>Deadline: {task.deadline}</p>
                            <p>Status: {task.status}</p>
                            <UpdateTaskForm taskId={task._id} taskStatus={task.status} handleUpdateTask={handleUpdateTask} />
                        </li>
                    ))}
                </ul>
            )}
            <ToastContainer />
        </div>
    );
};

const UpdateTaskForm = ({ taskId, taskStatus, handleUpdateTask }) => {
    const initialValues = {
        status: taskStatus,
        deadline: ''
    };

    const validationSchema = Yup.object({
        status: Yup.string().required('Status is required'),
        deadline: Yup.date().required('Deadline is required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        handleUpdateTask(taskId, { status: values.status, deadline: values.deadline });
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label>Status:</label>
                        <Field as="select" className="form-control" name="status">
                            <option value="Pending">Pending</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                        <label>Deadline:</label>
                        <Field type="date" className="form-control" name="deadline" />
                        <ErrorMessage name="deadline" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating Task...' : 'Update Task'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateTask;
