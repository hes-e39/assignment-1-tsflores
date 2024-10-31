import { useState, useEffect } from 'react';
import { CalculateTime } from '../../utils/helpers.ts';
import { ButtonOptions, SettingsButton } from '../generic/Buttons.tsx';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';
import { Settings } from '../generic/Settings.tsx';

const Countdown = () => {
    //let msgMessage: string = 'Countdown reached.';

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(1000*60);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        let intervalID: null | number | undefined = null;

        if (isActive && isPaused === false) {
            intervalID = setInterval(() => {
                if (time > 0) {
                    setTime(time => time - 10);
                }
            }, 10);
        } else {
            clearInterval(intervalID);
        }
        return () => {
            clearInterval(intervalID);
        };
    }, [isActive, isPaused, time]);

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
            <h3>Use the settings button to set countdown timer.</h3>
            <SettingsButton />
            {showSettings ? <Settings /> : <TimerDisplay time = {time} flag = { true }/>}
            {showSettings ? <div /> : <ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />}
        </div>
    );
};

export default Countdown;
