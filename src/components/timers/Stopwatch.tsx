import { useState, useEffect } from 'react';
import { ButtonOptions } from '../generic/Buttons.tsx';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';

/*
    component description
        - The purpose of the component is to render a stopwatch showing centiseconds up through hours
        - The user initiates the stopwatch with the Start button and then can pause or reset it
        - The time is indexed by 10 milliseconds and a call to TimerDisplay makes the appropriate function calls and UI
        - The ButtonOptions component presents the user with the appropriate options and onClick handlers
*/


const Stopwatch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        let intervalID = 0;

        if (isActive && !isPaused) {
            intervalID = window.setInterval(() => {
                setTime(time => time + 10);
            }, 10);
        } else {
            clearInterval(intervalID);
        }
        return () => {
            clearInterval(intervalID);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return (
        <div className="timer-container">
            <h2>Click Start button to engage stopwatch.</h2>
            <TimerDisplay time={time} flag={true} hours={0} minutes={0} seconds={0} centiseconds={0} />
            <ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />
        </div>
    );
};

export default Stopwatch;
