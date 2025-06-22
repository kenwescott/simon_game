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
      className="custom-modal"
    >
      <Modal.Header>
  <Modal.Title id="contained-modal-title-vcenter">
    Game Instructions
  </Modal.Title>
  <button className="custom-close-btn" onClick={props.onHide}>&times;</button>
</Modal.Header>

      
      <Modal.Body>
        <h4>How to Play</h4>
        <p>
          Follow the pattern of lights and sounds. 
        </p>
        <p>Click the buttons in the correct sequence to advance.  </p> 
        <p>
          Each round gets more difficult. Good luck!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-footer-close" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
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
