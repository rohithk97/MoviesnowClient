import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../../config/config";

const TABLE_HEAD = ["No.", "Name", "Email", "Contact", "Action"];
const ITEMS_PER_PAGE = 5;

export function UserTable() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch user data using Axios
    fetchUsers();
  }, []);

  async function fetchUsers() {
    axios
      .get(`${API_URL}/userapp/user/`) // Replace with your API endpoint
      .then((response) => {
        console.log("API Response:", response.data);
        setUserData(response.data); // Set the fetched user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const handleBlockUser = (userId) => {
    console.log("this is the user id I got", userId);
    // Send a POST request to block the user with the given userId
    axios
      .post(`${API_URL}/userapp/user/${userId}/block/`)
      .then((response) => {
        console.log("User blocked successfully:", response.data);
        // Toggle the isBlocked property for the blocked user
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };

  const handleUnblockUser = (userId) => {
    // Send a POST request to unblock the user with the given userId
    axios
      .post(`${API_URL}/userapp/user/${userId}/unblock/`)
      .then((response) => {
        console.log("User unblocked successfully:", response.data);
        // Toggle the isBlocked property for the unblocked user
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error unblocking user:", error);
      });
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the userData array to display only the items for the current page
  const currentUsers = userData.slice(startIndex, endIndex);

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
            {currentUsers.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {startIndex + index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.phone}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {user.is_active ? (
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockUser(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
       
      </Card>
      <div className="flex justify-end mt-4">
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
            disabled={endIndex >= userData.length}
            color="indigo"
            size="sm"
          >
            Next
          </Button>
        </div>
    </>
  );
}
