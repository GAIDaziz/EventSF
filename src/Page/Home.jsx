// Home.jsx
import React from 'react';
import Hero from '../Components/Hero/Hero';
import About from '../Components/about';
import Tutorial from '../Components/Tutorial';
import './Home.css';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <About />
      <Tutorial />
    </main>
  );
};

export default Home;
