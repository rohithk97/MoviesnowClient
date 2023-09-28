import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loginloader from './Loginloader';
import { API_URL } from '../config/config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [Loading,isLoading] =useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isLoading(true);
      const response = await axios.post(`${API_URL}/userapp/token/`, formData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify (response.data.user));
      console.log(response.data.user);
      isLoading(false);
      navigate('/');
    } catch (error) {
      // Handle login failure (e.g., show error message)
      isLoading(false);

      console.error('Login failed:', error.response.data);
      toast.error('Login failed. Please try again.');
    }
  };

  // useEffect to check accessToken and navigate to homepage
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    
<div class=" login-container w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div class="w-full sm:max-w-md lg:mr-36 p-5 mx-auto">
    <h2 class="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
    <form>
      <div class="mb-4">
        <label class="block mb-1" for="email">Email-Address</label>
        <input id="email" type="text" onChange={handleChange} name="email" required class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="password">Password</label>
        <input id="password" onChange={handleChange} type="password" required name="password" class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"  />
      </div>
      <div class="mt-6 flex items-center justify-between">
        {/* <div class="flex items-center">
          <input id="remember_me" type="checkbox" class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
          <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
        </div> */}
        <a href="#" class="text-sm"> Forgot your password? </a>
      </div>
      <div class="mt-6">
        <button onClick={handleSubmit} class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
          Log In
          </button>
      </div>
      <div class="mt-6 text-center">
        <Link to='/signup' class="underline">Sign up for an account</Link>
      </div>
    </form>
    
  </div>
  <ToastContainer position="top-center" autoClose={3000} />
  {Loading ? <Loginloader/> : null}

</div>
  );
};

export default Login;
