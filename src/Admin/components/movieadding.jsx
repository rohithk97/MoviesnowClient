// components/AddMovie.js
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { API_URL } from "../../config/config";

export function AddMovie() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null); // Initialize with null
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    release_date: "",
    genre: "",
    director: "",
    cast: "",
    language: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected image file
  };

  const handleAddMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("title", movieData.title);
      formData.append("description", movieData.description);
      formData.append("release_date", movieData.release_date);
      formData.append("genre", movieData.genre);
      formData.append("director", movieData.director);
      formData.append("cast", movieData.cast);
      formData.append("language", movieData.language);
      formData.append("image", image); // Append the actual image file

      const response = await axios.post(
        `${API_URL}/filmapp/addmovies/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        handleOpen();
        // You can add additional logic here, like updating the movie list
      } else {
        console.error("Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Movie</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="text-sm">Add new Movie</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            {/* Add your close button SVG here */}
          </svg>
        </div>
        <DialogBody divider>
          <form encType="multipart/form-data">
            <div className="grid gap-2">
              <Input
                label="Movie name"
                name="title"
                value={movieData.title}
                onChange={handleChange}
              />
              <Textarea
                label="Description"
                name="description"
                value={movieData.description}
                onChange={handleChange}
              />
              <Input
                label="Release Date"
                name="release_date"
                type="date"
                value={movieData.release_date}
                onChange={handleChange}
              />
              <Input
                label="Genre"
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
              />
              <Input
                label="Director"
                name="director"
                value={movieData.director}
                onChange={handleChange}
              />
              <Textarea
                label="Cast"
                name="cast"
                value={movieData.cast}
                onChange={handleChange}
              />
              <Input
                label="Language"
                name="language"
                value={movieData.language}
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange} // Handle file input change
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="space-x-1">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddMovie}>
            Add Movie
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
