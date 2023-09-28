import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OwnerRegistration } from './ownerregitration';
import axios from 'axios';
import './signup.css';
import { API_URL } from '../config/config';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });

  const [isOwnerRegistrationOpen, setIsOwnerRegistrationOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.password_confirmation) {

      try {
        const response = await axios.post(`${API_URL}/userapp/user/`, formData);
        console.log('User registered successfully:', response.data);

        toast.success('Registration successful!');

        // Redirect the user to the login page or show a success message
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error.response.data);

        toast.error('Registration failed. Please try again.');
        // Handle registration failure (e.g., show error message)
      }
    }
  };

  const openOwnerRegistrationDialog = () => {
    setIsOwnerRegistrationOpen(true);
  };

  const closeOwnerRegistrationDialog = () => {
    setIsOwnerRegistrationOpen(false);
  };

  return (
    <div className=" signup-container w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md lg:mr-36 p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">Name<span className="text-red-500">*</span></label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <p className="text-gray-500 text-xs italic">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email Address<span className="text-red-500">*</span></label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              required
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <p className="text-gray-500 text-xs italic">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="phone">
              Phone number<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              onChange={handleChange}
              required
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <p className="text-gray-500 text-xs italic">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              onChange={handleChange}
              required
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to='/login' className="underline" >Already have an account?</Link>
            <span
              className="underline"
              onClick={openOwnerRegistrationDialog}
              style={{ cursor: 'pointer' }}
            >
              Sign up for business account?
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      {isOwnerRegistrationOpen && (
        <OwnerRegistration
          open={isOwnerRegistrationOpen}
          onClose={closeOwnerRegistrationDialog}
        />
      )}
    </div>
  );
};

export default Register;
