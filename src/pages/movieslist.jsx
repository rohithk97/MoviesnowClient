import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';

const ITEMS_PER_PAGE = 4; // Number of movies per page

export function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/filmapp/movies/`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  const navigateToTheaters = (movieId) => {
    navigate(`/theaterlist/${movieId}`);
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the movies array to display only the items for the current page
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

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
        <h2 className="text-3xl font-bold text-teal-600">MOVIES NOW</h2>
      </div>
      <br />
      <div className="flex justify-center mt-4">
  <div className="relative text-gray-600">
    <input
      type="search"
      placeholder="Search movies"
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
</div>
<br />
      <div className="flex flex-wrap justify-center">
        {currentMovies.map((movie) => (
          <Card key={movie.id} className="mt-6 w-64 mr-4">
            <CardHeader color="blue-gray" className="relative h-40">
              <img src={movie.image} alt={movie.title} />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {movie.title}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button  onClick={() => navigateToTheaters(movie.id)} style={{ backgroundColor:  '#051334', color: 'white' }}>Book Now</Button>
            </CardFooter>
          </Card>
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
          disabled={endIndex >= filteredMovies.length}
          color="teal"
          size="sm"
        >
          Next
        </Button>
      </div>
    </>
  );
}
