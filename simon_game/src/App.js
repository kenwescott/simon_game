import React from 'react';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Instructions from './Page/Instructions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return(
    <>
      <Router>
         <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Instructions" element={<Instructions />} />
      </Routes>
      </Router>
    </>
  );
     
}

export default App;
