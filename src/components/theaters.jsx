import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { API_URL } from '../config/config';

const ITEMS_PER_PAGE = 4; // Number of theaters per page

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the theater data from the backend using Axios
    axios.get(`${API_URL}/theater/list/`)
      .then(response => {
        setTheaters(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching theaters:', error);
      });
  }, []);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Filter theaters based on the search query
  const filteredTheaters = theaters.filter(theater =>
    theater.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice the filtered theaters array to display only the items for the current page
  const currentTheaters = filteredTheaters.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <>
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold text-teal-600">OUR THEATERS</h2>
      </div>
      <br />

      <div className="flex justify-center mt-4">
  <div className="relative text-gray-600">
    <input
      type="search"
      placeholder="Search theaters"
      value={searchQuery}
      onChange={handleSearchChange}
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-64"
    />
    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
      <svg
        className="h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          className="heroicon-ui"
          d="M16.293 17.293a1 1 0 0 1-1.414 1.414l-3.793-3.793a6 6 0 1 1 1.414-1.414l3.793 3.793zM10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        />
      </svg>
    </button>
  </div>
</div><br />

      <div className='flex flex-wrap justify-center'>
        {currentTheaters.map(theater => (
          <div key={theater.id}>
            <Card className="mt-6 w-64 mx-2">
              <CardHeader color="blue-gray" className="relative h-40">
                <img
                  src={theater.photo}
                  alt=""
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {theater.name}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/theater/${theater.id}`}>
                  <Button style={{ backgroundColor:  '#051334', color: 'white' }}>Book Your Tickets</Button>
                </Link>
              </CardFooter>
            </Card>
            <br />
          </div>
        ))}
      </div>

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
          disabled={endIndex >= filteredTheaters.length}
          color="teal"
          size="sm"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Theaters;
