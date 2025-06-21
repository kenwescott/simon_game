import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Simonsays from "./pages/simonsays";
//import Home from "./pages/Home";
//import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
      <Router>
          <Navbar style={{ backgroundColor: 'rgb(131, 155, 193)' }} expand="lg" >
              <Container>
                  <Navbar.Brand href="/">Simon Says</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link as={Link} to="/game">Play</Nav.Link>\
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <Container className="mt-4">
              <Routes>
                  <Route path="/game" element={<Simonsays />} />
              </Routes>
          </Container>
      </Router>
  );
}

export default App;
