import React, { useState } from 'react';
import NavbarWithMegaMenu from '../components/navbar';
import { DefaultImg } from '../components/homeimg';
import ProfileCard from '../components/card';
import { FooterWithLogo } from '../components/footer';
import Theaters from '../components/theaters';
import { MovieCard } from './movieslist';
import "./css/home.css"


const Home = () => {
  
  return (
    <div>
      <br />
      <NavbarWithMegaMenu />
      <DefaultImg />
      <br />
      <ProfileCard />
      <br />

      
      <br />
      <MovieCard/>
      <br />
      <Theaters />
      <br />
      <FooterWithLogo />
    </div>
  );
};

export default Home;
