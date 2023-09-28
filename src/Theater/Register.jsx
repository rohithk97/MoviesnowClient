import './register.css';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import { API_URL } from '../config/config';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    licence: null,
    photo: null,
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${API_URL}/theater/register-theater/`;
  
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    try {
      await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Registration success, handle accordingly (e.g., show success message, redirect, etc.).
    } catch (error) {
      // Handle any network errors or other issues.
      // Show error message to the user.
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <Card color="slate" shadow={false} className="items-center">
        <Typography variant="h4" color="blue-gray">
          Register for business
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-5" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4 flex flex-col gap-6">
  <Input name="name" size="lg" label="Theater Name" onChange={handleInputChange} />
  <Input name="email" size="lg" label="Email" onChange={handleInputChange} />
  <Input name="contact_number" type="number" size="lg" label="Contact number" onChange={handleInputChange} />
  <Input name="licence" type="file" size="lg" label="Licence" onChange={handleFileChange} />
  <Input name="photo" type="file" size="lg" label="Photo" onChange={handleFileChange} />
  <Input name="description" type="text" size="lg" label="Description" onChange={handleInputChange} />
</div>
          
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
          
        </form>
      </Card>
    </div>
  );
}
