import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OwnerMovieadding } from './ownermovieadding';
import { RegistrationForm } from '../Theater/Register';
import { TheaterUpdate } from './theaterinfoupdate';

import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

import './ownerstheater.css'; // Import your custom CSS for styling
import { ToastContainer } from 'react-toastify';
import { FooterWithLogo } from '../components/footer';
import { API_URL } from '../config/config';

const Ownertheaters = () => {
  const [theaters, setTheaters] = useState([]);

  const fetchTheatersData = () => {
    // Fetch the theater data from the backend using Axios
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;
    axios
      .get(`${API_URL}/theater/ownertheaters/`, {
        params: { email: email },
      })
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching theaters:', error);
      });
  };
  
  useEffect(() => {
    // Call the fetchTheatersData function when the component mounts
    fetchTheatersData();
  }, []);


  return (
    <>
    <div className="owner-theaters-container">
      <h2 className="page-title">Theater Details</h2>
      <Link to="/register" className="register-button"style={{ backgroundColor:  '#051334'}}>
        Register a Theater
      </Link>

      <div className="grid lg:grid-cols-3 md:grid-cols-2">
        {theaters.map((theater) => (
          <div key={theater.id}>
            <Card className="mt-6 w-64">
              <CardHeader color="blue-gray" className="relative h-40">
                <img
                  src={`${API_URL}${theater.photo}`}
                  alt=""
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {theater.name}
                </Typography>
                {/* <Typography className="h-32 md:h-40 lg:h-48 overflow-y-auto">
                  {theater.description}
                </Typography> */}
              </CardBody>
              <CardFooter className="pt-0">
              <div className="button-container flex gap-2 ml-10">
                  <TheaterUpdate theaterId={theater.id} fetchTheatersData={fetchTheatersData}/>
                  <OwnerMovieadding theaterId={theater.id} />
                </div>
              </CardFooter>
            </Card>
            <br />

          </div>
        ))}
      </div>
      <ToastContainer/>
      
    </div>
    <FooterWithLogo/>
    </>

  );
};

export default Ownertheaters;
