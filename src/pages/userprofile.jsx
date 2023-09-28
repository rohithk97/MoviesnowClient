import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ProfileUpdate } from './profileupdate';
import { toast } from 'react-toastify';
import { API_URL } from '../config/config';

const ITEMS_PER_PAGE = 5; // Number of bookings per page

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/userapp/user/profile/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Fetch user's bookings when userProfile is available
    if (userProfile) {
      const fetchUserBookings = async () => {
        try {
          const response = await axios.get(`${API_URL}/theater/bookings/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching user bookings:', error);
        }
      };

      fetchUserBookings();
    }
  }, [userProfile]);

  const handleUpdateProfile = () => {
    setDialogOpen(true);
  };

  // Function to handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    // Ask for confirmation before canceling the booking
    const isConfirmed = window.confirm('Are you sure you want to cancel this booking?');
  
    if (!isConfirmed) {
      return; // Do nothing if the user cancels the confirmation
    }
  
    try {
      // Send a request to cancel the booking with the given bookingId
      const response = await axios.post(
        `${API_URL}/theater/cancel-booking/${bookingId}/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
  
      // Update the booking status to "Cancelled" in the UI
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status: 'Cancelled' };
        }
        return booking;
      });
  
      setBookings(updatedBookings);
      toast.success("Booking successfully cancelled. Refund will be processed in 2-3 working days.")
  
      
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };
  

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the bookings array to display only the items for the current page
  const currentBookings = bookings.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!userProfile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://plus.unsplash.com/premium_photo-1682125795272-4b81d19ea386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80)] bg-cover  bg-center">
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="small" color="blue-gray" className="mb-1">
                  <p><strong>Name:</strong> {userProfile.name}</p>
                  <p><strong>Email:</strong> {userProfile.email}</p>
                  <p><strong>Phone Number:</strong> {userProfile.phone}</p>
                </Typography>
              </div>
            </div>
            <ProfileUpdate userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
          </div>
        </CardBody>
      </Card>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booking ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Movie</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Theater</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.time}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.movie}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.theater}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {booking.status === 'Booked' && (
                    <Button
                      onClick={() => handleCancelBooking(booking.id)}
                      color="red"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  )}
                  {booking.status === 'Cancelled' && (
                    <span style={{ color: 'red' }}>Cancelled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <div className="mr-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              color="teal"
              size="sm"
            >
              Previous
            </Button>
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= bookings.length}
            color="teal"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
