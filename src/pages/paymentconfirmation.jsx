import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import "./css/paymentconfirmation.css"
import { FooterWithLogo } from "../components/footer";
// import { razorpay_key } from "./env";
import { API_URL } from "../config/config";
 
export function Paymentconfirmation({bookingdetails,selectedTheaterId,selectedMovieId,selectedTimeSlot,selectedSeats,selectedDate}) {
  let user = localStorage.getItem('user'); 
  const handleBooking = () => {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    
  };
  const [open, setOpen] = React.useState(false);
  const [Razorpay] = useRazorpay(); 
  // last change
  const Razorpay_key = 'rzp_test_xzvmvRpaucG2iz'
 
  const bookingDetails =bookingdetails;
  const handlebooking =()=> handleBooking;
  const handleOpen = () => setOpen(!open);
  const handlePayment = async (params) => {
  
    const options = {
      key: Razorpay_key, // Enter the Key ID generated from the Dashboard
      amount: bookingDetails.total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Movies Now",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        // handlebooking();
        if (!selectedTheaterId || !selectedMovieId) {
          alert('Please select a theater and a movie before booking.');
          return;
        
        }
        const inputDate = new Date(selectedDate);
    
    // Format the date as 'YYYY-MM-DD'
        const formattedDate = inputDate.toISOString().slice(0, 10);
    
        const data = {
          
          user: user,
          movie: selectedMovieId,
          theater: bookingDetails.theater.name,
          seats_booked: selectedSeats,
          time:selectedTimeSlot,
          date:formattedDate,
          payment_id:response.razorpay_payment_id,
          total_price:bookingDetails.total
        };
    
        axios.post(`${API_URL}/theater/reservation/`, data, {
         
        })
          .then((response) => {
            console.log('Booking successful:', response.data);
            // Handle success, e.g., display a success message to the user
          })
          .catch((error) => {
            console.error('Booking failed:', error);
            // Handle errors, e.g., display an error message to the user
          });

      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  
    rzp1.open();
  };
 
  return (
    <>
      <Button onClick={() => setOpen(!open)} variant="gradient">
        Book Seats
      </Button>
      <Dialog open={open} size={"xl"} handler={handleOpen}>
        <DialogHeader className="invoice-header">
          Invoice: Booking Details
        </DialogHeader>
        <DialogBody className="invoice-body">
          <div className="invoice-section">
            <p>Movie:</p>
            <p className="invoice-info">{bookingDetails.movie}</p>
          </div>
          <div className="invoice-section">
            <p>Theater:</p>
            <p className="invoice-info">{bookingDetails.theater.name}</p>
          </div>
          <div className="invoice-section">
            <p>Seats:</p>
            <p className="invoice-info">{bookingDetails.seats_booked}</p>
          </div>
          <div className="invoice-section">
            <p>Time:</p>
            <p className="invoice-info">{bookingDetails.time}</p>
          </div>
          <div className="invoice-section">
            <p>Date:</p>
            <p className="invoice-info">{bookingDetails.date}</p>
          </div>
          <div className="invoice-section">
            <p>Total Price:</p>
            <p className="invoice-info">{bookingDetails.total}</p>
          </div>
        </DialogBody>
        <DialogFooter className="invoice-footer">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={handlePayment} className="invoice-confirm-button">
            Confirm Payment
          </Button>
        </DialogFooter>
        <FooterWithLogo/>
      </Dialog>
    </>
  );
}