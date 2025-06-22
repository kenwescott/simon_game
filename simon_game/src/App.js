
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

import './App.css';

// Pages & Components
import Hero from './Components/Hero';
import Instructions from './Page/Instructions';
import Simonsays from './pages/simonsays';

function App() {
  return (
    <Router>
      <BootstrapNavbar style={{ backgroundColor: '#4724a5', fontSize:'1.3rem' }} expand="lg" >
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/"   style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
        fontFamily: 'NeonSpark, sans-serif'
      }}>
        REPEATER</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/instructions">Instructions</Nav.Link>
              <Nav.Link as={Link} to="/game">Play</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<Simonsays />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

 