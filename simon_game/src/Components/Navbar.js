import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './Navbar.css';


function BrandExample() {
  return (
    <>
      
      <Navbar className="custom-navbar">
        <Container>
          <Navbar.Brand className="navbar-brand-text">
           REPEATER
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;