import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import CreateTask from './Components/CreateTask'; // Import your CreateTask component
import UpdateTask from './Components/UpdateTask'; // Import your UpdateTask component
import DeleteTask from './Components/DeleteTask'; // Import your DeleteTask component
import TaskDetails from './Components/TaskDetails'; // Import your TaskDetails component
import AllTasks from './Components/AllTasks';

const App = () => {

  

  // Initialize state from localStorage if available, otherwise use empty strings
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('firstname') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [loading, setLoading] = useState(true);// New state for loading

  useEffect(() => {
    // Simulating loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);


  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('firstname', username);
    localStorage.setItem('email', email);
  }, [token, username, email]);

  return (
    <div>
       {loading ? (
        // Show loader while loading
        <div className='loader'>
          <div class="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage setUsername={setUsername} setEmail={setEmail} setToken={setToken} />} />
          <Route path='/home/:email' element={<><NavBar /><Home username={username} /> </>} />
          <Route path='/createtask/:email' element={<><NavBar /><CreateTask email={email} /> </>} />
          <Route path='/updatetask/:email/:taskId' element={<><NavBar /><UpdateTask email={email} /> </>} />
          <Route path='/deletetask/:email/:taskId' element={<><NavBar /><DeleteTask email={email} /> </>} />
          <Route path='/getusertask/:email' element={<><NavBar /><TaskDetails email={email} /> </>} />
          <Route path='/tasks/:email' element={<><NavBar /><AllTasks token={token} email={email} /> </>} />

        </Routes>
      </BrowserRouter>
       )}
      <ToastContainer />
    </div>
  );
};

export default App;
