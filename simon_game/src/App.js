
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
      <BootstrapNavbar expand="lg">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">Simon Says</BootstrapNavbar.Brand>
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

 