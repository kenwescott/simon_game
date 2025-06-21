import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './Navbar.css';


function BrandExample() {
  return (
    <>
      
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
           Simon Says
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;