import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import './Style/create.css'

const CreateTask = () => {
    const { email } = useParams();
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        description: '',
        deadline: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        deadline: Yup.date().required('Deadline is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(`https://task-management-app-backend-e5c6.onrender.com/api/user/createtask/${email}`, values);
            console.log('Task created:', response.data);
            toast.success(response.data.message);
            navigate(`/home/${email}`);
        } catch (error) {
            console.error('Error creating task:', error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred while creating the task');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h2>Create Task</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form id='create-form'>
                        <div className="form-group">
                            <label>Title:</label>
                            <Field type="text" className="form-control" name="title" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <Field as="textarea" className="form-control" name="description" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <Field type="date" className="form-control" name="deadline" />
                            <ErrorMessage name="deadline" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Task...' : 'Create Task'}
                        </button>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </div>
    );
};

export default CreateTask;
