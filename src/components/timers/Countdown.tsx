import { useState, useEffect, useContext, useRef } from 'react';
import { ButtonOptions } from '../generic/Buttons.tsx';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';
import { SettingsContext } from '../generic/SettingsContext.tsx';

/*
    component description
        - Renders a countdown timer in hours, minutes and seconds
        - The user sets the desired countdown time by selecting the Settings button in the CountdownWrapper component
        - The component makes use of useContext to initiate calculate the total milliseconds required and converts to proper hrs, mins, secs in the TimerDisplay component
        - make use of useRef for the time remaining in the event that the user pauses the timer but wishes to resume.
*/


const Countdown = () => {

    const setInfo = useContext(SettingsContext);

    const hoursInMilli: number = setInfo.hours * 3600 * 1000;
    const minInMilli: number = setInfo.minutes * 60 * 1000;
    const secInMilli: number = setInfo.seconds * 1000;
    const nextSeconds: number = hoursInMilli + minInMilli + secInMilli; 
    

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [secondsLeft, setSecondsLeft] = useState<number>(nextSeconds);
    const secondsLeftRef = useRef(secondsLeft);

    useEffect(() => {

        let intervalID = 0;

        // let intervalID: null | number = null;  initial attempt here produced TS errors so added window to setInterval

        if (isActive && !isPaused) {
            
            intervalID = window.setInterval(() => {
                if (isPaused) return;
                if (secondsLeftRef.current !== 0) {
                    secondsLeftRef.current = secondsLeftRef.current - 10;
                    setSecondsLeft(secondsLeftRef.current);
                } else {
                    setIsActive(false);
                }
            }, 10);
        }else{
            clearInterval(intervalID);  
        }

        return () => {
            clearInterval(intervalID);
        };

    }, [isPaused, isActive]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        secondsLeftRef.current = nextSeconds;
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setSecondsLeft(nextSeconds);
    };

    return (
        <div className="timer-container">
            <TimerDisplay time={secondsLeft} flag={true} />
            {secondsLeftRef.current === 0 ? <div /> : <ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />}
        </div>
    );
};

export default Countdown;
