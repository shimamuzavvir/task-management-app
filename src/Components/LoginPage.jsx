import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Style/Form.css';

const LoginPage = ({ setUsername, setEmail, setToken }) => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Formik setup
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const onSubmit = async (values) => {
    try {
    setLoading(true); // Set loading to true while submitting
    const res = await axios.post('https://task-management-app-backend-e5c6.onrender.com/api/user/login', values);
      setUsername(res.data.data.username);
      setEmail(values.email);
      setToken(res.data.token);
      toast.success(res.data.message);
      navigate(`/home/${values.email}`);
    } catch (error) {
      setError(error.response.data.message || 'An error occurred');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Toggle sign-in/sign-up mode
  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    navigate('/');
  };

  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={formik.handleSubmit} className="sign-in-form" id='form'>
            <h2 className="title">Sign in</h2>
            {/* Sign-in form inputs */}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.email}</span>
              </div>
            </div>
            {/* Password input */}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.password}</span>
              </div>
            </div>
            {/* Login button */}
            <button type="submit" className="btn btn-primary mt-2">
             
            </button>
            {/* Social media icons */}
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          </div>
        </div>
          {/* Sign-up link */}
          <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Create an account to access exclusive features and content.</p>
            <button className="btn btn-primary mb-3"  id="sign-up-btn" onClick={toggleMode}>
              Sign up
            </button>
        
      </div>
      </div>
      </div>
      <ToastContainer />
      {error && <div className="error-message">{error}</div>} {/* Show error message if there is an error */}
    </div>
  );
};

export default LoginPage;
