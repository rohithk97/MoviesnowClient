import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import axios from "axios"; // Import Axios
import { API_URL } from "../config/config";

export function OwnerRegistration({ open, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        business_name: "",
        business_address: "",
        business_license_number: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Check if the passwords match
        if (formData.password !== formData.confirmPassword) {
            // Passwords do not match, show an error message or handle it as needed
            console.error("Passwords do not match");
            return;
        }
        const formDataToSend = new FormData(e.target);
        const inputObject = Object.fromEntries(formDataToSend);
        try {
            const response = await axios.post(`${API_URL}/userapp/register-theater-owner/`, inputObject);

            if (response.status === 201) {
                // Registration successful
                // Handle any success actions, e.g., show a success message and redirect
                console.log("Theater owner registered successfully");
                // Close the dialog
                onClose();
            } else {
                // Registration failed
                // Handle any error actions, e.g., show an error message
                console.error("Theater owner registration failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            // Log the specific error response from the backend
            if (error.response) {
                console.error("Error response from the backend:", error.response.data);
            }
        }
    };
    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={onClose}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign up for Business
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>

                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Email"
                                name="email"

                                size="lg"
                            />
                            <Input
                                label="Phone"

                                type='number'
                                name="phone"
                                size="lg"
                            />
                            <Input
                                label="Business Name"
                                name="business_name"

                                size="lg"
                            />
                            <Input
                                label="Business Address"
                                name="business_address"
                                size="lg"
                            />
                            <Input
                                label="Business License Number"
                                type='number'
                                name="business_license_number"
                                size="lg"
                            />
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                size="lg"
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                size="lg"
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" type="submit" fullWidth>
                                Sign Up
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}
