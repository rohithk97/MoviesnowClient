import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from "@material-tailwind/react";
import './table.css';
import { API_URL } from '../../config/config';
const TABLE_HEAD = ["No.", "Name", "Location", "Image", "Email", "Contact","Actions","Owner"];
const ITEMS_PER_PAGE = 5; 

const DefaultTable = () => {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    // Fetch the theater data from the backend using Axios
    fetchTheaters();
  }, []);

  async function fetchTheaters() {

    axios.get(`${API_URL}/theater/list/`)
      .then(response => {
        setTheaters(response.data);
      })
      .catch(error => {
        console.error('Error fetching theaters:', error);
      });

  }

  const handleBlockTheater = (theaterId) => {
    // Make an API request to block the theater
    axios.post(`${API_URL}/theater/theaters/${theaterId}/block/`, {
      is_active: false, // Set is_active to false to block the theater
    })
      .then(response => {
        // Update the UI with the updated theater data
        setTheaters(prevTheaters => {
          return prevTheaters.map(theater => {
            if (theater.id === response.data.id) {
              return response.data;
            }
            return theater;
          });
        });
        fetchTheaters();
      })
      .catch(error => {
        console.error('Error blocking theater:', error);
      });
  };

  const handleUnblockTheater = (theaterId) => {
    // Make an API request to unblock the theater
    axios.post(`${API_URL}/theater/theaters/${theaterId}/unblock/`, {
      is_active: true, // Set is_active to true to unblock the theater
    })
      .then(response => {
        // Update the UI with the updated theater data
        setTheaters(prevTheaters => {
          return prevTheaters.map(theater => {
            if (theater.id === response.data.id) {
              return response.data;
            }
            return theater;
          });
        });
        fetchTheaters();
      })
      .catch(error => {
        console.error('Error unblocking theater:', error);
      });
  };


  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the movieData array to display only the items for the current page
  const currentTheaters = theaters.slice(startIndex, endIndex);

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
          {currentTheaters.map((theater, index) => (
            <tr key={theater.id}>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {startIndex + index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {theater.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {theater.location}
                </Typography>
              </td>
              <td className="p-4">
                <img
                  src={theater.photo}
                  alt={theater.name}
                  className="max-w-full h-10"
                />
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal description-paragraph"
                >
                  {theater.owner}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {theater.contact_number}
                </Typography>
              </td>
              <td className="p-4">
                {theater.is_active ? (
                  <Button
                    color="red"  // Set the button color to red for blocking
                    onClick={() => handleBlockTheater(theater.id)}
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    color="green"  // Set the button color to green for unblocking
                    onClick={() => handleUnblockTheater(theater.id)}
                  >
                    Unblock
                  </Button>
                )}
              </td>
            </tr>
          ))}
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
          disabled={endIndex >= theaters.length}
          color="indigo"
          size="sm"
        >
          Next
        </Button>
      </div>
      </>
  );
}

export { DefaultTable };
