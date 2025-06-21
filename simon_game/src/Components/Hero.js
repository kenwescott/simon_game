import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title"> Simon Says</h1>
          
          <a href="#start" className="hero-btn">Start Playing</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
