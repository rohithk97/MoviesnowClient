import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { AddMovie } from "./movieadding";
import { API_URL } from "../../config/config";

const TABLE_HEAD = ["No.", "Image", "Name", "Language", "Release Date", "Action"];
const ITEMS_PER_PAGE = 5;

export function MovieTable() {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addMovieDialogOpen, setAddMovieDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch user data using Axios
    fetchMovies();
  }, []);

  async function fetchMovies() {
    axios
      .get(`${API_URL}/filmapp/moviesadmin/`) // Replace with your API endpoint
      .then((response) => {
        console.log("API Response:", response.data);
        setMovieData(response.data); // Set the fetched user data
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }

  const handleBlockMovie = (movieId) => {
    console.log("this is the movie id i got", movieId);
    // Send a POST request to block the movie with the given movieId
    axios
      .post(`${API_URL}/filmapp/moviesadmin/${movieId}/block/`)
      .then((response) => {
        console.log("Movie blocked successfully:", response.data);
        // Toggle the isBlocked property for the blocked movie
        fetchMovies();
      })
      .catch((error) => {
        console.error("Error blocking movie:", error);
      });
  };

  const handleUnblockMovie = (movieId) => {
    // Send a POST request to unblock the movie with the given userId
    axios
      .post(`${API_URL}/filmapp/moviesadmin/${movieId}/unblock/`)
      .then((response) => {
        console.log("Movie unblocked successfully:", response.data);
        // Toggle the isBlocked property for the unblocked movie
        fetchMovies();
      })
      .catch((error) => {
        console.error("Error unblocking movie:", error);
      });
  };

  const handleOpenAddMovieDialog = () => {
    setAddMovieDialogOpen(true);
  };

  const handleCloseAddMovieDialog = () => {
    setAddMovieDialogOpen(false);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the movieData array to display only the items for the current page
  const currentMovies = movieData.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie, index) => {
              return (
                <tr key={movie.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {startIndex + index + 1}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <img
                      src={movie.image}
                      alt=""
                      className="max-w-full h-10"
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {movie.title}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {movie.language}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {movie.release_date}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {movie.is_active ? (
                      <button
                        onClick={() => handleBlockMovie(movie.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockMovie(movie.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </Card>
      
      <div className="flex justify-end mt-4 ">
      <div className="mr-4"> 
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            color="indigo"
            size="sm"
          >
            Previous
          </Button>
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= movieData.length}
            color="indigo"
            size="sm"
          >
            Next
          </Button>
        </div>
        <AddMovie />
    </>
  );
}
