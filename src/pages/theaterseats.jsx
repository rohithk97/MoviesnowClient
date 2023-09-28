import React, { useState, useEffect } from 'react';
import './theaterseats.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Paymentconfirmation } from './paymentconfirmation';
import { API_URL } from '../config/config';

const SeatBookingApp = () => {
  const location = useLocation();
  const { selectedTimeSlot, selectedDate, selectedMovie ,selectedTheater} = location.state;
  let user = localStorage.getItem('user');

  const [selectedSeats, setSelectedSeats] = useState([]);
  // const [ticketPrice, setTicketPrice] = useState(10);
  let ticketPrice =150
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [occupiedList, setOccupiedList] = useState([]);
  
  const [authToken, setAuthToken] = useState(null);
  
  useEffect(() => {
    // setTicketPrice(150)
    
    console.log(ticketPrice,'ppppppppppppppppppppppppppppppppppppppppp');

    console.log(selectedTheater.name,'ppppppppselectedTheaterppppppselectedTheaterppppp');



    // Fetch theaters using Axios
    axios.get(`${API_URL}/theater/list/`)
      .then((response) => {
        setTheaters(response.data);
        if (response.data.length > 0) {
          setSelectedTheaterId(response.data[0].name);
          const theaterid=response.data[0].id

          axios.get(`${API_URL}/filmapp/movies/`)
      .then((response) => {
        setMovies(response.data);
        if (response.data.length > 0) {
          setSelectedMovieId(response.data[0].id);
          // setTicketPrice(response.data[0].ticket_price);

          const seatdata ={
            theater_id:selectedTheater.id,
            movie_id:selectedMovie.id,
            time:selectedTimeSlot,
            date:formattedDate
           }
           console.log(seatdata);
        
           if (
            seatdata.theater_id !== null &&
            seatdata.movie_id !== null &&
            seatdata.time !== null &&
            seatdata.date !== null
          ) {
            // All required data is available, so make the API request
            axios
              .get(`${API_URL}/theater/occupiedseats/`, {
                params: seatdata,
              })
              .then((response) => {
                console.log('Success:', response.data);
                setOccupiedList(response.data)
                // Handle the response data here
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                // Handle the error here
              });
          } else {
            // Wait for all required data to be available
            console.log('Waiting for data...');
          }
          

          
        }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });


        }
      })
      .catch((error) => {
        console.error('Error fetching theaters:', error);
      });

    // Fetch movies using Axios
    

      
    // Fetch user ID and auth token (you can replace this with your authentication logic)
 
  }, []);

  const toggleSeat = (index) => {
    const updatedSeats = [...selectedSeats];
    if (updatedSeats.includes(index)) {
      updatedSeats.splice(updatedSeats.indexOf(index), 1);
    } else {
      updatedSeats.push(index);
    }
    setSelectedSeats(updatedSeats);
  };

  const handleMovieChange = (event) => {
    const newSelectedMovieId = event.target.value;
    setSelectedMovieId(newSelectedMovieId);
    setTicketPrice(movies.find(movie => movie.id === newSelectedMovieId)?.ticket_price);
  };

 

  const clearSelection = () => {
    if (window.confirm('Are you sure you want to clear your selection?')) {
      setSelectedSeats([]);
      localStorage.clear();
    }
  };

  const renderSeats = () => {
    const rows = [];
    for (let row = 1; row <= 6; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= 10; seat++) {
        const seatIndex = (row - 1) * 10 + seat;
        const isOccupied = occupiedList.includes(seatIndex);
        const isSelected = selectedSeats.includes(seatIndex); // Check if seat is selected
  
        let seatClass = 'seat';
        if (isOccupied) {
          seatClass += ' occupied';
        } else if (isSelected) {
          seatClass += ' selected';
        }
  
        const clickHandler = isOccupied
          ? null
          : () => toggleSeat(seatIndex);
  
        rowSeats.push(
          <div
            key={seatIndex}
            className={seatClass}
            onClick={clickHandler}
          ></div>
        );
      }
      rows.push(
        <div key={row} className="row">
          {rowSeats}
        </div>
      );
    }
    return rows;
  };

  const inputDate = new Date(selectedDate);
  const formattedDate = inputDate.toISOString().slice(0, 10);

  const ticketdetail = {
    
    user: user,
    movie: selectedMovie.title,
    theater: selectedTheater,
    seats_booked: selectedSeats,
    time:selectedTimeSlot,
    date:formattedDate,
    total:selectedSeats.length * ticketPrice
  };

 

  return (
    <div className='test'>
      <div className="movie-container">
        <span>Movie: {selectedMovie.title}</span>
        <span>Time: {selectedTimeSlot}</span>
        <span>Date: {selectedDate}</span>
        
      </div>

      <div className="showcase">
        <div className="seat"></div>
        <small>Available</small>

        <div className="seat selected"></div>
        <small>Selected</small>

        <div className="seat occupied"></div>
        <small>Occupied</small>
      </div>

      <div className="container">
        <div className="screen"></div>
        {renderSeats()}
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats
        for a price of ₹<span id="total">{selectedSeats.length * ticketPrice}</span>
      </p>

      <button id="clear" onClick={clearSelection}>
        Clear Selection
      </button>

      <Paymentconfirmation bookingdetails={ticketdetail} selectedTheaterId={selectedTheaterId} selectedMovieId={selectedMovie.id} selectedTimeSlot={selectedTimeSlot} selectedSeats={selectedSeats} selectedDate={selectedDate} />

    </div>
  );
};

export default SeatBookingApp;
