import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
};

const Timer = ({ onStart, onPause, isRunning }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <Button onClick={onStart} disabled={isRunning}>
                Start
            </Button>
            <Button onClick={onPause} disabled={!isRunning}>
                Pause
            </Button>
        </div>
    );
};

export default Timer;
