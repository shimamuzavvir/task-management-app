import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
    import { useFormik } from 'formik';
    import  './Style/Form.css'


const RegisterPage = () => {
    const[responseMsg, setResponseMsg]=useState("")
    const navigate = useNavigate()

    const initialValues = { firstname: '',lastname: '', email: '', password: '', role: '' }

    const validationSchema = Yup.object({
        firstname: Yup.string().matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/g, 'Invalid Username').required('Firstname is Required'),
        lastname: Yup.string().matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/g, 'Invalid Username').required('Lastname is Required'),
        email: Yup.string().email('Invalid email address').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address').required('Email is Required'),
        password: Yup.string().min(8).required('Password is Required'),
        role:Yup.string().required('Please Select Your Role')
    });


    const onSubmit = async (values) => {
        console.log("Register Api Payloads", values);
        try {
          
            const registerRes = await axios.post('https://task-management-app-backend-e5c6.onrender.com/api/user/register',values);
            setResponseMsg(registerRes.data.message);
            toast.success(registerRes.data.message);
          
                navigate('/login')
         
        } catch (err) {
            if (err.response) {
             
                setResponseMsg(err.response.data.message);
                toast.error(err.response.data.message);
            } else if (err.request) {
                
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', err.message);
            }
        }

    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    const [signUpMode, setSignUpMode] = useState(false)
    const toggleMode = () => {
        setSignUpMode(prevMode => !prevMode);
        navigate('/login')
    };
    return (
    
              <div class={`form-container ${signUpMode ? 'sign-up-mode' : ''}`}>
            <div class="forms-container">
                <div class="signin-signup">
                <form onSubmit={formik.handleSubmit} id='form'>
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" className="form-control" id="firstname" aria-describedby="emailHelp" value={formik.values.firstname} onChange={formik.handleChange} placeholder="Firstname" />
                                <div className='errors'>
                                    <span className="text-danger">{formik.errors.firstname}</span>
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp" value={formik.values.lastname} onChange={formik.handleChange} placeholder="Lastname" />
                                <div className='errors'>
                                    <span className="text-danger">{formik.errors.lastname}</span>
                                </div>
                            </div>
                            <div className="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" />
                                <div className='errors'>
                                    <span className="text-danger">{formik.errors.email}</span>
                                </div>
                            </div>
                            <div className="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" className="form-control" id="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
                                <div className='errors'>
                                    <span className="text-danger">{formik.errors.password}</span>
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <select
                                    className="dropdown-toggle ms-2"
                                    id="dropdown"
                                    value={formik.values.role}
                                    name="role"
                                    onChange={formik.handleChange}>
                                    <option value="">Select your Role</option>
                                    <option value="admin">Admin</option>        
                                    <option value="user">User</option>          
                                </select>
                                <div className='errors'>
                                    <span className="text-danger">{formik.errors.role}</span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                            <p class="social-text">Or Sign up with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                </div>
            </div>
            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>
                         Enter your email and password to log in to your account.
                        </p>
                        <button class="btn btn-primary" id="sign-in-btn" onClick={toggleMode} >
                            Sign in
                        </button>
                    </div>
                    <img src="/register.svg" class="image" alt="" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
     
export default RegisterPage;