import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './simonsays.css';

function getRandomColor(colors){
        return colors[Math.floor(Math.random() * colors.length)];
    }

function Simonsays() {
    const [sequence, setSequence] = useState([]); //Stores the correct color sequence for a round
    const [userSequence, setUserSequence] = useState([]); //Stores the color sequence the user clicked in a round
    const [isUserTurn, setIsUserTurn] = useState(false); //Flag to check if the user is allowed to click the simon says buttons
    const [score, setScore] = useState(0); //int that tracks score
    const [level, setLevel] = useState('slow'); // Current game level
    const [colorTheme, setColorTheme] = useState(['red', 'blue', 'green', 'yellow']); //color theme
    const [availableColors, setAvailableColors] = useState(['orange', 'purple', 'pink', 'brown', 'cyan', 'magenta']);
    const [colorToAdd, setColorToAdd] = useState('orange'); //color to add when user click "add color"
    const [message, setMessage] = useState('Select level and theme, then click Start'); // Message to display to the user
    const [highlight, setHighlight] = useState(null); // Color currently highlighted in the sequence
    const [gameStatus, setGameStatus] = useState(false);
    const [clicked, setClicked] = useState(null); //stores the color the user clicked

    const timeoutsRef = useRef([]); //Timeout for animating the sequence

    const levelToSpeed = {
        'slow': 800,
        'medium': 600,
        'fast': 400
    };

    const startGame = () => {
        clearPlayTimeouts();
        setGameStatus(true);
        const colors = colorTheme;
        const initialSequence = Array.from({ length: 1 }, () => getRandomColor(colors));
        setSequence(initialSequence);
        setScore(0);
        setUserSequence([]);
        setIsUserTurn(false);
        setMessage('Watch the sequence...'); 
        playSequence(initialSequence, levelToSpeed[level]);
    }

    const resetGame = () => {
        clearPlayTimeouts(); // Clear any existing timeouts
        setGameStatus(false);
        setSequence([]); // Reset the sequence
        setUserSequence([]); // Reset the user's input sequence
        setScore(0); // Reset the score
        setIsUserTurn(false); // Reset the user turn flag
        setHighlight(null); // Reset the highlight color
        setMessage('Select level and theme, then click Start'); // Reset the message
    }
     const clearPlayTimeouts = () => {
        timeoutsRef.current.forEach((t) => clearTimeout(t)); 
        timeoutsRef.current = []; 
     };

    const playSequence = (seq, speed) => {
        clearPlayTimeouts();
        setIsUserTurn(false); 
        seq.forEach((color, i) => { // Iterate through the sequence and set timeouts for highlighting colors
            const onTime = i * (speed + 200); // Calculate the time when the color should be highlighted
            const offTime = onTime + speed; // Calculate the time when the color should be unhighlighted
           timeoutsRef.current.push( // Store the timeouts for highlighting and unhighlighting colors
            setTimeout(() => setHighlight(color), onTime), 
            setTimeout(() => setHighlight(null), offTime));
        });
        const userTurnTime = seq.length * (speed + 200); // Calculate the time after which the user can start inputting their sequence
        timeoutsRef.current.push( // Store the timeout for allowing user input
          setTimeout(() => {
              setIsUserTurn(true);
              setMessage('Now press the buttons in sequence');
          }, userTurnTime)
        );
    }

    const handleButtonClick = (color) => {
         if (!isUserTurn) return; // If it's not the user's turn, do nothing
         //setMessage(`color: ${color}`);
        setUserSequence((prev) => [...prev, color]); // Add the clicked color to the user's input sequence
        setClicked(color);
        setTimeout(() => {
            setClicked(null);
        }, 200);
    }

    useEffect(() => {
        if (!isUserTurn || userSequence.length === 0) return; // If it's not the user's turn or if userSequence was emptied, do nothing

        const currentIndex = userSequence.length - 1;

        if (userSequence[currentIndex] !== sequence[currentIndex]) { // Check if the user's last move matches the sequence
            setMessage(`Wrong move! Game Over. Final Score: ${score}`);
            setGameStatus(false);
          setIsUserTurn(false); // Set user turn to false
          return;
        }

         if (userSequence.length === sequence.length) { // If the user has completed the sequence
          setIsUserTurn(false); // Set user turn to false
             setMessage('Correct! Get ready for next sequence...');
             setScore((prev) => prev + 1); // Increment the score
          const colors = colorTheme; // Get the colors for the current theme and level
          const nextColor = getRandomColor(colors); // Get a random color for the next sequence
          const newSequence = [...sequence, nextColor]; // Create a new sequence by adding the new color
          const speed = levelToSpeed[level]; // Get the speed based on the current level
          setTimeout(() => { // Set a timeout to allow the user to see the new sequence
            setSequence(newSequence); // Update the sequence with the new color
            setUserSequence([]); // Reset the user's input sequence
            setMessage('Watch the sequence...'); 
            playSequence(newSequence, speed); // Play the new sequence
          }, 1000); 
        }
    }, [userSequence]);

    // const currentColors = colorTheme; // Get the current colors based on the selected theme and level

    const addColor = () => {
        if (colorToAdd != null) {
            const index = availableColors.indexOf(colorToAdd);
            if (index > -1) {
                const colors = availableColors;
                colors.splice(index, 1); // 2nd parameter means remove one item only
                setColorTheme([...colorTheme, colorToAdd]);
                setColorToAdd(availableColors[0]);
            }
        }
        
    }

    const resetColor = () => {
        setColorTheme(['red', 'blue', 'green', 'yellow']);
        setAvailableColors(['orange', 'purple', 'pink', 'brown', 'cyan', 'magenta']);
        setColorToAdd('orange');
    }

    return (
        <Container style={{ backgroundColor: '#7482E5', padding: '2rem' }} >
            <h1> Repeater</h1>
            <div>
                <p>
                    {message}
                </p>
            </div>
             <div>
                <p>
                   Score: <strong>{score}</strong>
                </p>
              </div>
            <div style={{textAlign: 'center'} }>
                {colorTheme.map((color)=> (
                    <svg width="200" height="200" key={color}>
                        <circle r="70" cx="100" cy="100" fill={color} stroke={highlight === color || clicked === color ? "#F9DEC9" : "black"} stroke-width="5"
                            onClick={() => handleButtonClick(color) } disabled={!isUserTurn}
                            style={{
                                opacity: highlight === color? 1 : 0.8,
                                cursor: isUserTurn ? 'pointer' : 'default',
                            }}
                  ></circle>
                    </svg>
                )
                )}
            </div>
             <Row className="justify-content-center">
                {!gameStatus && <Col className="text-center"><Button onClick={startGame} variant="success">
                    Start
                </Button></Col>}
                <Col className="text-center"><Button onClick={resetGame} variant="danger">
                    Reset
                </Button></Col>

            </Row>
            {!gameStatus && <Row className="justify-content-center my-3">
                 <Col xs={12} md={4}>
                    <Form.Group controlId="levelSelect">
                        <Form.Label>Select level:</Form.Label>
                        <Form.Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            {['slow', 'medium', 'fast'].map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group controlId="colorSelect">
                        <Form.Label>Select color to add:</Form.Label>
                        <Form.Select
                            value={colorToAdd}
                            onChange={(e) => setColorToAdd(e.target.value)}
                        >
                            {availableColors.map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="text-center" >
                    <Button onClick={addColor} variant="warning">
                        Add Color
                    </Button>
                </Col>
                <Col xs={12} md={2} className="text-center">
                    <Button onClick={resetColor} variant="warning">
                        Reset Colors
                    </Button>
                </Col>
            </Row>
            }
            

        </Container>
    
    )
}
export default Simonsays;