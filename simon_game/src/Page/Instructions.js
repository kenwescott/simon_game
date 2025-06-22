import React, { useState, useEffect } from 'react';
import './Instructions.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Game Instructions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>How to Play</h4>
        <p>
          Follow the pattern of lights and sounds. Click the buttons in the correct sequence to advance.
        </p>
        <p>
          Each round gets more difficult. Good luck!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function Leveldropdown() {
  return (
    <Dropdown className='Level'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Level
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Level 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Level 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Level 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

  );
}
function difficultdropdown() {
  return (
    <Dropdown className='Difficulty'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Difficulty
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Level 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Level 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Level 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

  );
}


function Instruction() {
  const [modalShow, setModalShow] = useState(true); // <-- show modal on page load

  return (
    <div className="instruction-page">
      {/* Optionally, put some background or empty container here */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {!modalShow && (
        <div className="after-modal-content">
          {/* Optional: content to show after modal is closed */}
          <h2>Ready to play?</h2>
          <p>Close this message and start the game!</p>
        </div>
      )}
    </div>
  );
}

export default Instruction;
