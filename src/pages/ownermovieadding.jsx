import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
} from "@material-tailwind/react";
import { API_URL } from "../config/config";

export function OwnerMovieadding({ theaterId }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    selectedMovie: null,
    timeSlots: [], // Track the entered time slots as an array
    newTimeSlot: "", // Track the currently entered time slot
  });
  const [movies, setMovies] = useState([]); // List of movies

  const handleOpen = () => setOpen(!open);
  const [selectedMovie, setSelectedMovie] = useState('');

  const handleMovieChange = (e) => {
    // Update the selected movie based on user selection
    setSelectedMovie(e.target.value);
    setFormData({ ...formData, selectedMovie: e.target.value });
  };

  const handleTimeSlotsChange = (e) => {
    // Update the currently entered time slot
    setFormData({ ...formData, newTimeSlot: e.target.value });
  };

  const addTimeSlot = () => {
    // Add the currently entered time slot to the array
    if (formData.newTimeSlot.trim() !== "") {
      setFormData({
        ...formData,
        timeSlots: [...formData.timeSlots, formData.newTimeSlot],
        newTimeSlot: "", // Clear the input field after adding
      });
    }
  };

  const handleAddMovie = async () => {
    try {
      if (formData.selectedMovie) {
        // Send a request to associate the selected movie with the theater
        await axios.post(
          `${API_URL}/filmapp/assign_movie/${theaterId}/`,
          { movieTitle: formData.selectedMovie }
        );
        console.log("Movie added to theater successfully");
        
        if (formData.timeSlots.length > 0) {
          // Send a request to create time slots for the selected movie
          await axios.post(
            `${API_URL}/filmapp/create_time_slots/`,
            {
              movieTitle: formData.selectedMovie,
              timeSlots: formData.timeSlots,
              theater:theaterId
            }
          );
          console.log("Time slots created successfully");
        }
      }
      handleOpen();
    } catch (error) {
      console.error("Error adding movie to theater:", error);
    }
  };

  useEffect(() => {
    // Fetch the list of movies when the dialog is opened
    if (open) {
      axios.get(`${API_URL}/filmapp/movies/`)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [open]);

  return (
    <>
      <Button onClick={handleOpen} style={{ backgroundColor: '#051334' }} className="text-sm px-3 py-2">Add Movie</Button>

      <Dialog open={open} handler={handleOpen} className="w-72">
        <div className="flex items-center justify-between">
          <DialogHeader className="text-sm p-2">Add a Movie to Theater</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-1 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
          >
            {/* Close button icon */}
          </svg>
        </div>
        <DialogBody divider className="p-2">
          <div>
            <label htmlFor="movieDropdown">Select a Movie:</label>
            <select id="movieDropdown" onChange={handleMovieChange} value={selectedMovie}>
              <option value="">Select a movie</option>
              {movies.map((movie, index) => (
                <option key={index} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
            {selectedMovie && <p>You selected: {selectedMovie}</p>}
          </div>
          <div>
            <label htmlFor="timeSlots">Enter Time Slots (comma-separated):</label>
            <input
              id="timeSlots"
              type="text"
              value={formData.newTimeSlot}
              onChange={handleTimeSlotsChange}
            />
            <button onClick={addTimeSlot}>Add Time Slot</button>
            <ul>
              {formData.timeSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2 p-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddMovie}>
            Add Movie to Theater
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
