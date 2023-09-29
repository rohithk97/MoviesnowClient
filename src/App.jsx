import { Typography, Card } from "@material-tailwind/react";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login';
import Home from '../src/pages/home';
import Register from '../src/pages/signUp';
import Admin from "./Admin/Admin";
import { RegistrationForm } from "./Theater/Register";
import Ownertheaters from "../src/pages/ownertheaters";
import Theaters from "./components/theaters";
import TheaterSingleView from "../src/pages/theatersingleview";
import News from "../src/pages/news";
import { UserTable } from "./Admin/components/userstable";
import { MovieCard } from "../src/pages/movieslist";
import UserProfile from "../src/pages/userprofile";
import SeatBookingApp from "../src/pages/theaterseats";
import TheatersForMovie from "../src/pages/theaterformovies";
import { ToastContainer } from "react-toastify";
import PrivateRoute, { AdminRoute } from "./pages/Routes/UserProtectedRoute";




export default function App() {
  return (
    <>
    <Routes>
      
        <Route path="/login" element={<Login/>} />
      
        <Route index path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/user" element={<UserTable />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/owner" element={<Ownertheaters />} />
        <Route path="/theaters" element={<Theaters/>} />
        <Route path="/theater/:id" element={<TheaterSingleView/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/movies" element={<MovieCard/>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        <Route path="/seats" element={<SeatBookingApp/>} />
        <Route path="/theaterlist/:movieId" element={<TheatersForMovie/>} />
        

      </Routes>
      <ToastContainer style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      
    </>
  );
}
