import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { video_apiKey } from '../pages/env';

export default function VideoCard() {
  const [trailerKey, setTrailerKey] = useState('');
  const [error, setError] = useState(null);

  const video_apiKey = 'ab0878cfcdf66cc8bc9710ce54549c39'

  useEffect(() => {
    const apiKey =video_apiKey

    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`)
      .then(response => {
        const movies = response.data.results;
        console.log('Movies:', movies);
        if (movies && movies.length !== 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          const randomMovie = movies[randomIndex];
          console.log('Random Movie:', randomMovie);
          fetchMovieVideos(apiKey, randomMovie.id);
        }
      })
      .catch(error => {
        console.error('Error fetching trending movie:', error);
        setError(error.message); // Set the error state with the error message
      });
  }, []);

  const fetchMovieVideos = (apiKey, movieId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
      .then(response => {
        const videos = response.data.results;
        if (videos.length > 0) {
          const youtubeVideo = videos.find(video => video.site === 'YouTube');
          if (youtubeVideo) {
            setTrailerKey(youtubeVideo.key);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching movie videos:', error);
        setError(error.message); // Set the error state with the error message
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trailerKey) {
    return <div>Loading...</div>;
  }

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`;


  return (
    <div className=''>
      <h2>Trending Movie Trailer</h2>
      <div className="video-container" style={{ height: '400px' }}>
        <iframe
          title="Trending Movie Trailer"
          className="h-full w-full rounded-lg"
          src={youtubeEmbedUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
