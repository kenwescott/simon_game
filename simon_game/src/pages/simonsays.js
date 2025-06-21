import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function simonsays() {

    const [sequence, setSequence] = useState([]); //Stores the correct color sequence for a round
    const [userSequence, setUserSequence] = useState([]); //Stores the color sequence the user clicked in a round
    const [isUserTurn, setisUserTurn] = useState(false); //Flag to check if the user is allowed to click the simon says buttons
    const [score, setScore] = useState(0); //int that tracks score
    const [theme, setTheme] = useState('Classic'); //color theme

    const colorThemes = { // Define color themes with arrays of colors
        Classic: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'cyan', 'magenta'],
    }

    const timeoutsRef = useRef(0); //Timeout for animating the sequence
    const startGame = () => {
        const colors = colorThemes[theme].slice(0, 3);
        setSequence([getRandomColor(colors)]);
        setUserSequence([]);
        setisUserTurn(false);
        playSequence();
    }

    const getRandomColor = (colors) => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const playSequence = () => {

    }

    return (
        <Container>
            <h1> Simon says</h1>
            <Row>
                <Button onClick={startGame} variant="primary">
                    Start
                </Button>
            </Row>
            <Row>
                <Col>
                    <Button onClick={ } variant="primary">
                    red
                    </Button>
                </Col>
                <Col>
                    <Button onClick={ } variant="primary">
                        blue
                    </Button>
                </Col>
                <Col>
                    <Button onClick={ } variant="primary">
                        yellow
                    </Button>
                </Col>
                <Col>
                    <Button onClick={ } variant="primary">
                        green
                    </Button>
                </Col>
            </Row>
        </Container>
    
    )
}
export default simonsays;