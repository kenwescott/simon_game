import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function getRandomColor(colors){
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const colorThemes = { // Define color themes with arrays of colors
        Classic: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'cyan', 'magenta'],
    }

function Simonsays() {
    const [sequence, setSequence] = useState([]); //Stores the correct color sequence for a round
    const [userSequence, setUserSequence] = useState([]); //Stores the color sequence the user clicked in a round
    const [isUserTurn, setIsUserTurn] = useState(false); //Flag to check if the user is allowed to click the simon says buttons
    const [score, setScore] = useState(0); //int that tracks score
    const [theme, setTheme] = useState('Classic'); //color theme
    const [message, setMessage] = useState('Select level and theme, then click Start'); // Message to display to the user
    const [highlight, setHighlight] = useState(null); // Color currently highlighted in the sequence

    const timeoutsRef = useRef([]); //Timeout for animating the sequence

     

    const startGame = () => {
        clearPlayTimeouts();
        const colors = colorThemes[theme].slice(0, 4);
        const initialSequence = Array.from({ length: 1 }, () => getRandomColor(colors));
        setSequence(initialSequence);
        setScore(0);
        setUserSequence([]);
        setIsUserTurn(false);
        playSequence(initialSequence, 400);
    }

    const resetGame = () => {
         clearPlayTimeouts(); // Clear any existing timeouts
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
          }, userTurnTime)
        );
    }

    const handleButtonClick = (color) => {
         if (!isUserTurn) return; // If it's not the user's turn, do nothing
         //setMessage(`color: ${color}`);
        setUserSequence((prev) => [...prev, color]); // Add the clicked color to the user's input sequence
    }

    useEffect(() => {
        if (!isUserTurn || userSequence.length === 0) return; // If it's not the user's turn or if userSequence was emptied, do nothing

        const currentIndex = userSequence.length - 1;

        if (userSequence[currentIndex] !== sequence[currentIndex]) { // Check if the user's last move matches the sequence
          setMessage(`Wrong move! Game Over. Final Score: ${score}`);
          setIsUserTurn(false); // Set user turn to false
          return;
        }

         if (userSequence.length === sequence.length) { // If the user has completed the sequence
          setIsUserTurn(false); // Set user turn to false
          setMessage('Correct! Get ready for next sequence...');
          const colors = colorThemes[theme].slice(0, 4); // Get the colors for the current theme and level
          const nextColor = getRandomColor(colors); // Get a random color for the next sequence
          const newSequence = [...sequence, nextColor]; // Create a new sequence by adding the new color
          const speed = 400; // Get the speed based on the current level
          setTimeout(() => { // Set a timeout to allow the user to see the new sequence
            setSequence(newSequence); // Update the sequence with the new color
            setUserSequence([]); // Reset the user's input sequence
            setScore((prev) => prev + 1); // Increment the score
            setMessage('Watch the sequence...'); 
            playSequence(newSequence, speed); // Play the new sequence
          }, 1000); 
        }
    }, [userSequence]);

    const currentColors = colorThemes[theme].slice(0, 4); // Get the current colors based on the selected theme and level
    const r = 70
    const circleSize = 2* 3.14 *r;

    return (
        <Container>
            <h1> Simon says</h1>
            <Row>
                <Button onClick={startGame} variant="primary">
                    Start
                </Button>
            </Row>
            <Row>
                <Button onClick={resetGame} variant="primary">
                    Reset
                </Button>
            </Row>
             <div>
                <p>
                  <strong>Score:</strong> {score}
                </p>
              </div>
              
                {currentColors.map((color, index)=> (
                    <svg width="200" height="200">
                  <circle r={r} cx="100" cy="100" fill={highlight === color ? "gray": color} stroke="black" stroke-width="5" 
                  onClick={() => handleButtonClick(color)} disabled={!isUserTurn}
                  ></circle>
                  </svg>
                )
                )}
           
            <div>
                <p>
                  <strong>Score:</strong> {message}
                </p>
              </div>



        </Container>
    
    )
}
export default Simonsays;