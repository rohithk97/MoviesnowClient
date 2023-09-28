import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../config/config";

export function TheaterUpdate({ theaterId, fetchTheatersData }) {
  const [open, setOpen] = useState(false);
  const [photo,setPhoto]= useState(null)
  const [theaterData, setTheaterData] = useState({
    name: "",
    // licence: null,
    contact_number: "",
    location: "",
    description: "",
    photo: null,
  });

  useEffect(() => {
    // Fetch theater details when component mounts
    fetchTheaterDetails();
  }, [theaterId]);

  const fetchTheaterDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/theater/theaterupdate/${theaterId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // Update state with fetched theater details, including image and license
      setTheaterData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching theater details:", error);
    }
  };
  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ( name === 'photo') {
      // Handle file inputs by storing the file object
      setTheaterData({
        ...theaterData,
        [name]: files[0], // Store the file object directly
      });
    } else {
      // Handle other inputs
      setTheaterData({
        ...theaterData,
        [name]: value,
      });
    }
  };

  const handleUpdateTheater = async () => {
    try {
      const formData = new FormData();
      formData.append("name", theaterData.name);
      formData.append("description", theaterData.description);
      formData.append("contact_number", theaterData.contact_number);
    //   formData.append("licence", theaterData.licence);
      formData.append("location", theaterData.location);
    //   formData.append("photo", theaterData.photo);
      if (photo){
        formData.append("photo",photo);
      }

      const response = await axios.patch(
        `${API_URL}/theater/theaterupdate/${theaterId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        handleOpen();
        // Optionally, you can update state or show a success message
        toast.success("Theater upated successfully")
        fetchTheatersData();
        

      } else {
        console.error("Failed to update theater");
      }
    } catch (error) {
      console.error("Error updating theater:", error);
      console.log("Response data:", error.response.data);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} style={{ backgroundColor:  '#051334'}} className="text-sm px-0 py-2">Update Theater</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="text-sm">Update Theater</DialogHeader>
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
                label="Theater name"
                name="name"
                value={theaterData.name}
                onChange={handleChange}
              />
              <Input
                label="Location"
                name="location"
                value={theaterData.location}
                onChange={handleChange}
              />
              <Input
                label="Contact Number"
                name="contact_number"
                value={theaterData.contact_number}
                onChange={handleChange}
              />
              <Textarea
                label="Description"
                name="description"
                value={theaterData.description}
                onChange={handleChange}
              />
              {/* <Input
                type="file"
                label="Licence"
                name="licence"
                accept="." 
                
                onChange={handleChange}
              /> */}
              <Input
                type="file"
                label="photo"
                name="photo"
                accept="image/*" 
                // value=''
               onChange={(e)=> setPhoto(e.target.files[0])}
                // onChange={handleChange}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="space-x-1">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpdateTheater}>
            Update Theater
          </Button>
        </DialogFooter>
        <ToastContainer/>
      </Dialog>
    </>
  );
}
