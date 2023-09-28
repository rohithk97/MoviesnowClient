import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../../config/config";

const TABLE_HEAD = ["No.", "Name", "Company Name", "Address", "Email", "License No.", "Contact", "Action"];
const ITEMS_PER_PAGE = 3;

export function OwnersTable() {
  const [ownerData, setOwnerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch owner data using Axios
    fetchOwners();
  }, []);

  async function fetchOwners() {
    axios
      .get(`${API_URL}/userapp/theater-owners-list/`) // Replace with your API endpoint
      .then((response) => {
        console.log("API Response:", response.data);
        setOwnerData(response.data); // Set the fetched owner data
      })
      .catch((error) => {
        console.error("Error fetching owner data:", error);
      });
  }

  const handleBlockOwner = (ownerId) => {
    console.log("this is the owner id I got", ownerId);
    // Send a POST request to block the owner with the given ownerId
    axios
      .post(`${API_URL}/userapp/theater-owners-list/${ownerId}/block/`)
      .then((response) => {
        console.log("Owner blocked successfully:", response.data);
        // Toggle the isBlocked property for the blocked owner
        fetchOwners();
      })
      .catch((error) => {
        console.error("Error blocking owner:", error);
      });
  };

  const handleUnblockOwner = (ownerId) => {
    // Send a POST request to unblock the owner with the given ownerId
    axios
      .post(`${API_URL}/userapp/theater-owners-list/${ownerId}/unblock/`)
      .then((response) => {
        console.log("Owner unblocked successfully:", response.data);
        // Toggle the isBlocked property for the unblocked owner
        fetchOwners();
      })
      .catch((error) => {
        console.error("Error unblocking owner:", error);
      });
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the ownerData array to display only the items for the current page
  const currentOwners = ownerData.slice(startIndex, endIndex);

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
            {currentOwners.map((owner, index) => {
              return (
                <tr key={owner.id}>
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
                      {owner.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {owner.business_name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {owner.business_address}
                    </Typography>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {owner.email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {owner.business_license_number}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {owner.phone}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {owner.is_active ? (
                      <button
                        onClick={() => handleBlockOwner(owner.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockOwner(owner.id)}
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
            disabled={endIndex >= ownerData.length}
            color="indigo"
            size="sm"
          >
            Next
          </Button>
        </div>
    </>
  );
}
