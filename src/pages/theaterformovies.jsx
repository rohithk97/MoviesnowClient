import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './theaterformovies.css'; // Import your CSS file
import { API_URL } from '../config/config';

function TheatersForMovies() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the present day date

  useEffect(() => {
    // Fetch movie details
    axios
      .get(`${API_URL}/filmapp/moviedetail/${movieId}/`)
      .then((response) => {
        setMovie(response.data.film);
        setTheaters(response.data.movietheaters);
        console.log(response.data, 'llllllllllllllllllllllllllllllllllllllllllllllllll');
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [movieId]);

  // Function to handle clicks on time slots
  const handleTimeSlotClick = (time,theater) => {
    console.log(`Selected time: ${time}`);
    console.log(`Selected date: ${selectedDate.toDateString()}`);
    // console.log(`Selected theater: ${theater}`);
  
    // Use navigate to go to the seat booking page with state
    navigate('/seats', {
      state: {
        selectedTimeSlot: time,
        selectedDate: selectedDate.toDateString(),
        selectedMovie: movie, // Pass the selected movie object
        selectedTheater: theater,
      },
    });
  };

  const handleTimeSlotToClick = (time,theater) => {
    const nextDay = selectedDate;
                      nextDay.setDate(selectedDate.getDate() + 1);
                      setSelectedDate(nextDay);
                      console.log(nextDay,'nnnnnnnnnnnnnnnnnnnnnn');
    console.log(`Selected time: ${time}`);
    console.log(`Selected date: ${selectedDate.toDateString()}`);
    console.log(`Selected theater: ${theater}`);
  
    // Use navigate to go to the seat booking page with state
    navigate('/seats', {
      state: {
        selectedTimeSlot: time,
        selectedDate: selectedDate.toDateString(),
        selectedMovie: movie, // Pass the selected movie object
        selectedTheater: theater,
      },
    });
  };

  return (
    <div className="theater-container">
      <div className="movie-image">
        {movie && (
          <img src={movie?.image} alt={movie?.title} />
        )}
        {movie && (
          <div className="movie-details">
            <h2>{movie?.title}</h2>
            <p>{movie?.description}</p>
            {/* Add more movie details as needed */}
          </div>
        )}
      </div>

      <div className="theater-list">
        <h2>Theaters for This Movie</h2>
        {theaters?.map((theater) => (
          <div key={theater.id} className="theater-item flex justify-between">
            <div>
              <img src={theater?.photo} alt='' />
              <h3>{theater.name}</h3>
              <p>Location: {theater.location}</p>
              {/* Add more theater details as needed */}
            </div>
            <div className="h4">Today
              {theater.time_slots?.map((time_slots) => ( 
                <div key={time_slots.id}>
                  <button
                    className="h6 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2"
                    onClick={() => handleTimeSlotClick(time_slots.slot_time,theater)}
                  >
                    {time_slots.slot_time}
                  </button>
                </div>
              ))}
            </div>
            <div className="h4">Tomorrow
              {theater.time_slots?.map((time_slots) => (
                <div key={time_slots.id}>
                  <button
                    className="h6 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2"
                    onClick={() => {
                      handleTimeSlotToClick(time_slots.slot_time,theater);
                    }}
                  >
                    {time_slots.slot_time}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheatersForMovies;
