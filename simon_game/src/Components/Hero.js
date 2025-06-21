import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title"> Simon Says</h1>
          
          <Link to="/Instructions" className="hero-btn">Start Playing</Link>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
