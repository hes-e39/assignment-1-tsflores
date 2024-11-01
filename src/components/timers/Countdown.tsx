import { useState, useEffect, useContext, useRef } from 'react';
import { ButtonOptions } from '../generic/Buttons.tsx';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';
import { SettingsContext } from '../generic/SettingsContext.tsx';
//import { Settings } from '../generic/Settings.tsx';

const Countdown = () => {

   
    const setInfo = useContext(SettingsContext);

    const hoursInMilli = setInfo.hours * 3600 * 1000;
    const minInMilli = setInfo.minutes * 60 * 1000;
    const secInMilli = setInfo.seconds * 1000;
    const nextSeconds = hoursInMilli + minInMilli + secInMilli; 
    

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [secondsLeft, setSecondsLeft] = useState<number>(nextSeconds);
    //const isPausedRef = useRef(isPaused);
    // const isActiveRef = useRef(isActive);
    const secondsLeftRef = useRef(secondsLeft);

    function tick() {
        secondsLeftRef.current = secondsLeftRef.current - 10;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        //setSecondsLeft(secondsLeftRef.current);

        function switchMode() {
            //const nextSeconds = hoursInMilli + minInMilli + secInMilli;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        let intervalID: null | number | undefined = null;

        if (isActive && isPaused === false) {
            switchMode();
            intervalID = setInterval(() => {
                if (isPaused) {
                    return;
                }
                if (secondsLeftRef.current !== 0) {
                    tick();
                } else {
                }
            }, 10);
        }else{
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        };

        // if (isActive === true) {
        //     intervalID = setInterval(() => {
        //         if (time > 0) {
        //             setTime(time => time - 10);
        //         }
        //     }, 10);
        // } else {
        //     clearInterval(intervalID);
        // }
        // return () => {
        //     clearInterval(intervalID);
        // };
    }, [setInfo, isPaused, isActive]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
    };

    return (
        <div className="timer-container">
            <TimerDisplay time={secondsLeft} flag={true} />
            <ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />
        </div>
    );
};

export default Countdown;
