import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './theatersingleview.css';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FooterWithLogo } from '../components/footer';
import { API_URL } from '../config/config';

function TheaterSingleView() {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`${API_URL}/theater/theaterdetail/`, { params: { id: id } });
        const theaterData = response.data;

        // Fetch movie details for associated movies
        const moviePromises = theaterData.movies.map(async (movieId) => {
          const movieResponse = await axios.get(`${API_URL}/filmapp/movies/${movieId}/`);
          return movieResponse.data;
        });

        // Wait for all movie details promises to resolve
        const movies = await Promise.all(moviePromises);

        // Update the theater object with movie details
        theaterData.movies = movies;

        setTheater(theaterData);
      } catch (error) {
        console.error('Error fetching theater data:', error);
      }
    };

    fetchTheater();
  }, [id]);

  if (!theater) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="theater-container">
        <div className="theater-details">
          <h2>{theater.name}</h2>
          <div className="theater-image">
            <img src={`${API_URL}${theater.photo}`} alt={theater.name} />
            <h3>Description</h3>
            <p className="theater-description">{theater.description}</p>
            <h3>Location</h3>
            <p>{theater.location}</p>
          </div>
        </div>
        <div className="movie-list">
          <h2>Movies</h2>
          <div className="movies-container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {theater.movies.map((movie) => (
              <Card key={movie.id} className="mt-6 w-64">
                <CardHeader color="blue-gray" className="relative h-40">
                  <img src={movie.image} alt={movie.title} />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {movie.title}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link to={`/theaterlist/${movie.id}`}>
                    <Button style={{ backgroundColor:  '#051334', color: 'white' }}>BOOK Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <FooterWithLogo />
    </>
  );
}

export default TheaterSingleView;
