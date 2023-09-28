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
import { API_URL } from "../config/config";

export function ProfileUpdate({ userProfile, onUpdateProfile }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        // Add more fields as needed
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            // Check if a new password is provided
            if (formData.newPassword) {
                // Ensure that current and new passwords match
                if (formData.newPassword !== formData.confirmPassword) {
                    console.error("New passwords do not match.");
                    return;
                }

                // Send a request to update the password
                const passwordUpdateResponse = await axios.patch(
                    `${API_URL}/userapp/user/profile/`,
                    {
                        current_password: formData.password,
                        new_password: formData.newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

                // Check if the password update was successful
                if (passwordUpdateResponse.status === 200) {
                    console.log("Password updated successfully.");
                } else {
                    console.error("Password update failed.");
                }
            }

            // Send a PUT or PATCH request to update other user profile fields
            const profileUpdateResponse = await axios.patch(
                `${API_URL}/userapp/user/profile/`,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    // Add more fields as needed
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            // Call the onUpdateProfile function to update the user profile in the parent component
            onUpdateProfile(profileUpdateResponse.data);

            // Close the dialog after updating
            handleOpen();
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} style={{ backgroundColor:  '#051334'}}>Update Profile</Button>
            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Update Profile</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        {/* Close button icon */}
                    </svg>
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="Current Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="New Password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {/* Add more fields as needed */}
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpen}>
                        Close
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleUpdateProfile}>
                        Update Profile
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
