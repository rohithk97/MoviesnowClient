import { Typography, Card } from "@material-tailwind/react";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import Register from './pages/signUp';
import Admin from "./Admin/Admin";
import { RegistrationForm } from "./Theater/Register";
import Ownertheaters from "./pages/ownertheaters";
import Theaters from "./components/theaters";
import TheaterSingleView from "./pages/theatersingleview";
import News from "./pages/news";
import { UserTable } from "./Admin/components/userstable";
import { MovieCard } from "./pages/movieslist";
import UserProfile from "./pages/userprofile";
import SeatBookingApp from "./pages/theaterseats";
import TheatersForMovie from "./pages/theaterformovies";
import { ToastContainer } from "react-toastify";




export default function App() {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/u" element={<UserTable />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/owner" element={<Ownertheaters />} />
        <Route path="/theaters" element={<Theaters/>} />
        <Route path="/theater/:id" element={<TheaterSingleView/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/movies" element={<MovieCard/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/seats" element={<SeatBookingApp/>} />
        <Route path="/theaterlist/:movieId" element={<TheatersForMovie/>} />

      </Routes>
      <ToastContainer style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    </>
  );
}
