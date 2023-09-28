import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from "@material-tailwind/react";
import { API_URL } from '../../config/config';

const TABLE_HEAD = ["No.", "Name", "Booking ID", "Date", "Time", "Movie", "Theater"];
const ITEMS_PER_PAGE = 6;

export function BookingsTable() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch booking data from the backend API
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${API_URL}/theater/admin/bookings/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Slice the bookings array to display only the items for the current page
    const currentBookings = bookings.slice(startIndex, endIndex);

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
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                        {currentBookings.map((booking, index) => (
                            <tr key={booking.id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {startIndex + index + 1}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.user}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.id}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.date}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.time}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.movie}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {booking.theater}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
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
                disabled={endIndex >= bookings.length}
                color="indigo"
                size="sm"
            >
                Next
            </Button>
        </div>
    </>
    );
}
