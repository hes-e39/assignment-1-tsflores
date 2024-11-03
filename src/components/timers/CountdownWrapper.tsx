import { useState } from 'react';
import { SettingsButton } from '../generic/Buttons.tsx';
import Countdown from './Countdown.tsx';
import { Settings } from '../generic/Settings.tsx';
import { SettingsContext } from '../generic/SettingsContext.tsx';

/*
    component description
        - Serves as a wrapper for the countdown and settings components to allow passing state varianbles between them
        - user sets the countdown clock settings within the Settings component
        - these are then made available to the Countdown component via useContex
        - chose to use a wrapper so that I could reuse the TimerDisplay component
*/

const CountdownWrapper = () => {
    const [showSettings, setShowSettings] = useState(false);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleSettings = () => {
        if (showSettings) {
            setShowSettings(false);
        } else {
            setShowSettings(true);
        }
    };

    return (
        <div className="timer-container">
            <h2>Use the settings button to set countdown timer.</h2>
            <SettingsButton showSettings={showSettings} handleSettings={handleSettings} />
            <SettingsContext.Provider value={{
                hours,
                minutes,
                seconds,
                setHours,
                setMinutes,
                setSeconds,
            }}>{showSettings ? <Settings /> : <Countdown />}</SettingsContext.Provider>
        </div>
    );
};

export default CountdownWrapper;
